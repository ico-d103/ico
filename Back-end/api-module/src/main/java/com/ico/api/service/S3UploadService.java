package com.ico.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ico.core.exception.CustomException;
import com.ico.core.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

/**
 * S3 파일 처리 서비스
 *
 * @author 서재건
 * @author 변윤경
 */
@Slf4j
@RequiredArgsConstructor
@Component
@Service
public class S3UploadService {

    private final AmazonS3 amazonS3;

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @Value("${cloud.aws.cloud-front.domain}")
    private String domain;

    /**
     * 파일 업로드
     *
     * @param file
     * @return S3에 올린 파일 이름
     */
    public String upload(MultipartFile file) {
        String fileName = file.getOriginalFilename();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());
        String newFileName = createFileName(fileName);

        try (InputStream inputStream = file.getInputStream()) {
            uploadFile(inputStream, objectMetadata, newFileName);
        } catch (IOException e) {
            throw new CustomException(ErrorCode.INVALID_FILE_EXTENSION);
        }

        return newFileName;
    }

    /**
     * 파일 URL 반환
     *
     * @param fileName
     * @return 파일 URL
     */
    public String getFileURL(String fileName) {
        return String.format("https://%s/%s", domain, fileName);
    }

    /**
     * S3 파일 삭제
     *
     * @param fileName
     */
    public void deleteFile(String fileName){
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    /**
     * S3 파일 업로드 함수화
     *
     * @param inputStream
     * @param objectMetadata
     * @param fileName
     */
    private void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, inputStream, objectMetadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));
    }

    /**
     *
     * @param originalFileName
     * @return UUID로 만든 파일 이름
     */
    private String createFileName(String originalFileName) {
        return UUID.randomUUID().toString().concat(getFileExtension(originalFileName));
    }

    /**
     *
     * @param fileName
     * @return 파일 확장자
     */
    private String getFileExtension(String fileName) {
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new CustomException(ErrorCode.INVALID_FILE_EXTENSION);
        }
    }

    /**
     * DB에 저장된 이미지 String url들을 list로 변환
     *
     * @param urls ,로 구분되는 url 모음
     * @return  url List
     */
    public List<String> getImageURLs(String urls){
        List<String> images = List.of(urls.split(","));
        List<String> imageRes = new ArrayList<>();
        for (String image : images){
            imageRes.add(getFileURL(image));
        }
        return imageRes;
    }

    /**
     * 상품 이미지 s3에 등록하고 파일이름 저장하기
     *
     * @param files MultipartFiles List
     */
    public String saveImageURLs(List<MultipartFile> files){
        StringBuilder images = new StringBuilder();
        for (MultipartFile file : files) {
            // 상품이미지를 등록하지 않았을 때
            if (file.isEmpty()) {
                throw new CustomException(ErrorCode.NO_PRODUCT_IMAGE);
            }
            images.append(upload(file)).append(",");
        }
        return String.valueOf(images);
    }
}
