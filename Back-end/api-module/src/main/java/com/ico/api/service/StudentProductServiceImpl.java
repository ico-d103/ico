package com.ico.api.service;

import com.ico.api.dto.StudentProductProposalDto;
import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentProduct;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;


@Service
@RequiredArgsConstructor
@Transactional
public class StudentProductServiceImpl implements StudentProductService{
    private final StudentRepository studentRepo;
    private final NationRepository nationRepo;
    private final StudentProductRepository studentProductRepo;


    @Override
    public void createProduct(StudentProductProposalDto proposal) {
        Student student = studentRepo.findByIdentity(proposal.getIdentity())
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));
        Nation nation = nationRepo.findById(proposal.getNationId())
                .orElseThrow(() -> new CustomException(ErrorCode.NATION_NOT_FOUND));

        StudentProduct product = new StudentProduct();
        product.setStudent(student);
        product.setNation(nation);
        product.setTitle(proposal.getTitle());
        product.setAmount(proposal.getAmount());
        product.setImage(proposal.getImage());
        product.setDetail(proposal.getDetail());
        product.setCount(proposal.getCount());
        product.set_assigned(false);

//        Optional<Nation> nation = nationRepo.findById(proposal.getNationId());
//        product.setNation(nation.get());
//        Optional<Student> student = studentRepo.findByIdentity(proposal.getIdentity());
//        product.setStudent(student.get());

        studentProductRepo.save(product);
    }

}
