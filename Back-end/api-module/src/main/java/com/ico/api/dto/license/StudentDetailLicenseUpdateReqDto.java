package com.ico.api.dto.license;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

/**
 * @author 강교철
 */
@Getter
@Setter
@NoArgsConstructor
public class StudentDetailLicenseUpdateReqDto {

    Map<Long, Integer> map;
}
