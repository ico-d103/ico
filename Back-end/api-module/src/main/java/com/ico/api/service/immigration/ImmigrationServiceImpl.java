package com.ico.api.service.immigration;

import com.ico.api.dto.immigration.ImmigrationReqDto;
import com.ico.api.dto.student.StudentSseDto;
import com.ico.api.sse.SseEmitters;
import com.ico.api.user.JwtTokenProvider;
import com.ico.core.code.Role;
import com.ico.core.entity.Immigration;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.ImmigrationRepository;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * 입국심사 관련 Service 로직
 *
 * @author 강교철
 * @author 서재건
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ImmigrationServiceImpl implements ImmigrationService {

    private final NationRepository nationRepository;
    private final StudentRepository studentRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ImmigrationRepository immigrationRepository;

    private final SseEmitters sseEmitters;

    @Override
    @Transactional
    public void createImmigration(ImmigrationReqDto reqDto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        String identity = jwtTokenProvider.getIdentity(token);
        Nation nation = nationRepository.findByCode(reqDto.getCode()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));
        Student student = studentRepository.findByIdentity(identity).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (nation.getCode().equals(reqDto.getCode())) {
            if (immigrationRepository.findByStudentId(student.getId()) == null) {
                // Create Immigration
                Immigration immigration = Immigration.builder()
                        .nation(nation)
                        .student(student)
                        .build();
                immigrationRepository.save(immigration);

                // 학생의 번호 저장
                student.setNumber(reqDto.getNumber().byteValue());
                studentRepository.save(student);
            } else {
                throw new CustomException(ErrorCode.WRONG_IMMIGRATION);
            }
        } else {
            throw new CustomException(ErrorCode.WRONG_CODE);
        }

        // 입국심사 요청 시 SSE로 요청 목록 전송
        sseEmitters.send(findStudentSseList(nation.getId()));
    }

    @Transactional(readOnly = true)
    @Override
    public Immigration getImmigration(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long id = jwtTokenProvider.getId(token);
        Immigration immigration = immigrationRepository.findByStudentId(id);
        if (immigration != null) {
            return immigration;
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_IMMIGRATION_NATION);
        }
    }

    @Transactional
    @Override
    public void deleteImmigration(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long id = jwtTokenProvider.getId(token);
        Immigration immigration = immigrationRepository.findByStudentId(id);

        Long nationId;  // 해당 나라 id로 SSE 요청 시 변수 전달
        if (immigration != null) {

            nationId = immigration.getNation().getId();

            immigrationRepository.delete(immigration);
        } else {
            throw new CustomException(ErrorCode.NOT_FOUND_IMMIGRATION_NATION);
        }

        // 입국심사 요청 삭제 시 SSE로 요청 목록 전송
        sseEmitters.send(findStudentSseList(nationId));
    }

    @Override
    @Transactional
    public void approveImmigration(Long immigrationId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        if (role.equals(Role.TEACHER)) {
            Immigration immigration = immigrationRepository.findById(immigrationId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_IMMIGRATION_USER));

            Student student = immigration.getStudent();

            student.setNation(immigration.getNation());
            studentRepository.save(student);

            immigrationRepository.delete(immigration);

        }
        // 입국심사 요청 승인 시 SSE로 요청 목록 전송
        sseEmitters.send(findStudentSseList(jwtTokenProvider.getNation(token)));
    }

    @Override
    @Transactional
    public void companionImmigration(Long immigrationId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        if (role.equals(Role.TEACHER)) {
            Immigration immigration = immigrationRepository.findById(immigrationId)
                    .orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_IMMIGRATION_USER));
            immigrationRepository.delete(immigration);

            // 학생의 number 초기화
            Student student = immigration.getStudent();
            student.setNumber((byte) 0);
            studentRepository.save(student);
        }

        // 입국심사 요청 삭제 시 SSE로 요청 목록 전송
        sseEmitters.send(findStudentSseList(jwtTokenProvider.getNation(token)));
    }

    @Transactional(readOnly = true)
    @Override
    public List<StudentSseDto> findAllImmigrationStudent(HttpServletRequest request) {
        Long nationId = jwtTokenProvider.getNation(jwtTokenProvider.parseJwt(request));

        return findStudentSseList(nationId);
    }

    /**
     * 나라의 입국 요청 목록 반환
     *
     * @param nationId
     * @return 입국 요청 목록
     */
    List<StudentSseDto> findStudentSseList(Long nationId) {
        List<Immigration> immigrationList = immigrationRepository.findAllByNationId(nationId);
        List<StudentSseDto> dtoList = new ArrayList<>();
        for (Immigration immigration : immigrationList) {
            dtoList.add(new StudentSseDto().of(immigration.getStudent(), immigration.getId()));
        }
        return dtoList;
    }
}
