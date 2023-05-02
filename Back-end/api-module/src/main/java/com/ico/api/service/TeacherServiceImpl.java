package com.ico.api.service;

import com.ico.api.dto.TeacherSignUpRequestDto;
import com.ico.core.entity.Certification;
import com.ico.core.code.Role;
import com.ico.core.entity.Teacher;
import com.ico.core.repository.CertificationRepository;
import com.ico.core.repository.TeacherRepository;
import lombok.RequiredArgsConstructor;
//import net.nurigo.sdk.message.model.Message;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class TeacherServiceImpl implements TeacherService {

    private final TeacherRepository teacherRepository;
    private final PasswordEncoder passwordEncoder;
    private final CertificationRepository certificationRepository;

    @Transactional
    @Override
    public Long signUp(TeacherSignUpRequestDto requestDto) throws Exception {
        Teacher teacher = Teacher.builder()
                .identity(requestDto.getIdentity())
                .password(requestDto.getPassword())
                .name(requestDto.getName())
                .is_assigned(false)
                .role(Role.TEACHER)
                .build();

        Certification certification = Certification.builder()
                .teacher(teacher)
                .image(requestDto.getImage())   // s3로 바꿔야함
                .build();

        if (teacherRepository.findTeacherByIdentity(requestDto.getIdentity()).isPresent()) {
            throw new Exception("이미 존재하는 아이디 입니다.");
        }

        if (!requestDto.getPassword().equals(requestDto.getCheckedPassword())) {
            throw new Exception("비밀번호가 일치하지 않습니다.");
        }

        teacher.encodeTeacherPassword(passwordEncoder);
        teacherRepository.save(teacher);
        certificationRepository.save(certification);

        return teacher.getId();
    }

    @Override
    public void certifiedPhoneNum(String phoneNum) {
//        String api_key = "NCSCQN2HADECWPGN";
//        String api_secret = "XWRCSV8OFGHBAUQ8NOGUTF2VXKYB8ZCV";
//        Message coolsms = new Message(api_key, api_secret);       // 여기 오류
//
//        Random rand  = new Random();
//        String numStr = "";
//        for(int i=0; i<4; i++) {
//            String ran = Integer.toString(rand.nextInt(10));
//            numStr += ran;
//        }
//
//        // 4 params(to, from, type, text) are mandatory. must be filled
//        HashMap<String, String> params = new HashMap<String, String>();
//        params.put("to", phoneNum);    // 수신전화번호
//        params.put("from", "01037822170");    // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
//        params.put("type", "SMS");
//        params.put("text", "아이코 휴대폰인증 테스트 메시지 : 인증번호는 [" + numStr + "] 입니다.");
//
//        try {
//            coolsms.send(params);         // 여기도 오류
//        } catch (Exception e) {
//            System.out.println(e.getMessage());
//        }
//        네이버로 다시 구현하기
    }
}
