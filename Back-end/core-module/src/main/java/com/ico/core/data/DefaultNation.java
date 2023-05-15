package com.ico.core.data;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "default_nation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DefaultNation {

    @Id
    private String id;

    private List<Default_tax> default_tax;

    private List<Default_job> default_job;

    private List<Default_interest> default_interest;

    private List<Default_rule> default_rule;

}
