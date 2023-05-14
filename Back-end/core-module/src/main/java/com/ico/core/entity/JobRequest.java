package com.ico.core.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.ico.core.dto.JobReqDto;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

/**
 * @author 강교철
 */
@Document(collection = "job")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class JobRequest {

    @Id
    private String id;

    private String title;

    private String detail;

    private String image;

    private int wage;

    private byte creditRating;

    private byte count;

    private byte total;

    private String color;
}
