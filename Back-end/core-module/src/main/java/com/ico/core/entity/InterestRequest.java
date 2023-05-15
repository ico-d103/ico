package com.ico.core.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

/**
 * @author 강교철
 */
@Document(collection = "interest")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterestRequest {

    @Id
    private String id;

    private int creditRating;

    private int shortPeriod;

    private int longPeriod;

}
