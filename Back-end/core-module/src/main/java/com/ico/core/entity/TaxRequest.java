package com.ico.core.entity;

import com.ico.core.code.TaxType;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Document(collection = "tax")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TaxRequest {

    @Id
    private String id;

    private String title;

    private String detail;

    private int amount;

    @Enumerated(EnumType.ORDINAL)
    private TaxType type;
}
