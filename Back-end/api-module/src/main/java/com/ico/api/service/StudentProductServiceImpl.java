package com.ico.api.service;

import com.ico.core.entity.Nation;
import com.ico.core.entity.Student;
import com.ico.core.entity.StudentProduct;
import com.ico.core.repository.NationRepository;
import com.ico.core.repository.StudentProductRepository;
import com.ico.core.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class StudentProductServiceImpl implements StudentProductService{
    private final StudentRepository studentRepo;
    private final NationRepository nationRepo;
    private final StudentProductRepository studentProductRepo;

    @Override
    public void createProduct(String identity, Long nationId, String title, int amount, String image, String detail, byte count) {
        Optional<Student> student = studentRepo.findStudentByIdentity(identity);
        Optional<Nation> nation = nationRepo.findById(nationId);
        StudentProduct product = new StudentProduct();
        product.setStudent(student.get());
        product.setNation(nation.get());
        product.setTitle(title);
        product.setAmount(amount);
        product.setImage(image);
        product.setDetail(detail);
        product.setCount(count);
        product.set_assigned(false);

        studentProductRepo.save(product);
    }

}
