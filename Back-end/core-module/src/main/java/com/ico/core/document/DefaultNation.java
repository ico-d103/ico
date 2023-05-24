package com.ico.core.document;

import com.ico.core.data.Default_interest;
import com.ico.core.data.Default_job;
import com.ico.core.data.Default_rule;
import com.ico.core.data.Default_tax;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

/**
 * 나라의 기본 데이터 생성 관련 Document
 *
 * @author 서재건
 */
@Document(collection = "default_nation")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class DefaultNation {

    @Id
    private String id;

    private List<Default_tax> default_taxes;

    private List<Default_job> default_jobs;

    private List<Default_interest> default_interests;

    private List<Default_rule> default_rules;

}
