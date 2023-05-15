package com.ico.core.entity;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;

/**
 * @author 강교철
 */
@Document(collection = "interest_request")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class InterestRequest {

    @Id
    private String id;

    @Column(name = "credit_rating")
    private int creditRating;

    @Column(name = "short_period")
    private int shortPeriod;

    @Column(name = "long_period")
    private int longPeriod;

}
