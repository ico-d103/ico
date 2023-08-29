package com.ico.api.dto.teacher;

import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * 이미지 수정 시 받는 Dto
 * 이미 존재하는 이미지가 없을 수가 있기 때문에 유효성 검사는 Service에서 진행
 *
 * @author 강교철
 */
@Getter
@NoArgsConstructor
public class TeacherProductImgReqDto {
    private List<String> existingImages;
}
