package com.ico.api.dto.certification;

import com.ico.core.entity.Certification;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * 어드민 계정이 교사 인증서를 조회할 때 사용되는 Dto
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class CertificationResDto {

    Long id;
    String name;
    String image;

    public CertificationResDto(Certification certification) {
        this.id = certification.getId();
        this.name = certification.getTeacher().getName();
        this.image = certification.getImage();
    }

    public void setImage(String image) {
        this.image = image;
    }
}
