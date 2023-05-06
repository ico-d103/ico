package com.ico.api.service.immigration;

import com.ico.api.dto.immigration.ImmigrationReqDto;
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

import javax.servlet.http.HttpServletRequest;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * @author 강교철
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class ImmigrationServiceImpl implements ImmigrationService{

    private final NationRepository nationRepository;
    private final StudentRepository studentRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final ImmigrationRepository immigrationRepository;

    @Override
    @Transactional
    public void createImmigration(ImmigrationReqDto reqDto, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        String identity = jwtTokenProvider.getIdentity(token);
        Nation nation = nationRepository.findById(reqDto.getNationId()).orElseThrow(() -> new CustomException(ErrorCode.NOT_FOUND_NATION));
        Student student = studentRepository.findByIdentity(identity).orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (nation.getCode().equals(reqDto.getCode())) {
            if (immigrationRepository.findByStudentId(student.getId()) == null) {
                // Create Immigration
                Immigration immigration = Immigration.builder()
                        .nation(nation)
                        .student(student)
                        .build();
                immigrationRepository.save(immigration);
            }
            else {
                throw new CustomException(ErrorCode.WRONG_IMMIGRATION);
            }
        }
        else {
            throw new CustomException(ErrorCode.WRONG_CODE);
        }
    }

    @Override
    public Immigration getImmigration(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long id = jwtTokenProvider.getId(token);
        Immigration immigration = immigrationRepository.findByStudentId(id);
        if (immigration != null){
            return immigration;
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_IMMIGRATION_NATION);
        }
    }

    @Override
    public void deleteImmigration(HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Long id = jwtTokenProvider.getId(token);
        Immigration immigration = immigrationRepository.findByStudentId(id);
        if (immigration != null){
            immigrationRepository.delete(immigration);
        }
        else {
            throw new CustomException(ErrorCode.NOT_FOUND_IMMIGRATION_NATION);
        }
    }

    @Override
    @Transactional
    public void approveImmigration(Long immigrationId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        if (role.equals(Role.TEACHER)) {
            Optional<Immigration> immigration = immigrationRepository.findById(immigrationId);
            if (immigration.isPresent()) {
                Student student = immigration.get().getStudent();
                if (student != null) {
                    student.setNation(immigration.get().getNation());
                    studentRepository.save(student);

                    immigrationRepository.delete(immigration.get());
                }
                else {
                    throw new CustomException(ErrorCode.USER_NOT_FOUND);
                }
            }
        }
    }

    @Override
    public void companionImmigration(Long immigrationId, HttpServletRequest request) {
        String token = jwtTokenProvider.parseJwt(request);
        Role role = jwtTokenProvider.getRole(token);
        if (role.equals(Role.TEACHER)) {
            Optional<Immigration> immigration = immigrationRepository.findById(immigrationId);
            if (immigration.isPresent()) {
                immigrationRepository.delete(immigration.get());
            }
            else {
                throw new CustomException(ErrorCode.NOT_FOUND_IMMIGRATION_USER);
            }
        }
    }
}
