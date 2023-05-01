package com.ico.api.service;

import com.ico.core.entity.Student;
import com.ico.core.entity.StudentProduct;
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

    @Override
    public void createProduct(String identity, Long nationId, String title, int amount, String image, String detail, int count) {
        Optional<Student> student = studentRepo.findStudentByIdentity(identity);
    }

}
