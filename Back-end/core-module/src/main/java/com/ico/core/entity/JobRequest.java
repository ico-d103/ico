package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
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

    private String color;
}
