package com.ico.core.data;

import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

/**
 * 나라 관련 기본 데이터 MongoDB에 저장
 * application 처음 실행 시 동작
 *
 * @author 서재건
 */
@Component
public class MongoDefaultNationLoader implements CommandLineRunner {

    private final MongoTemplate mongoTemplate;

    public MongoDefaultNationLoader(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public void run(String... args) throws Exception {

        // _id 값이 "1"인 문서를 찾아 삭제
        mongoTemplate.remove(new Query(Criteria.where("_id").is("1")), "default_nation");

        Map<String, Object> document = new HashMap<>();

        // _id 값은 "1"로 고정
        document.put("_id", "1");

        // 기본 세금
        document.put("default_taxes", Arrays.asList(
                new HashMap<String, Object>() {{
                    put("title", "자리세");
                    put("detail", "자리세 설명");
                    put("amount", 10);
                    put("type", "PERCENT");
                }},
                new HashMap<String, Object>() {{
                    put("title", "소득세");
                    put("detail", "소득세 설명");
                    put("amount", 10);
                    put("type", "PERCENT");
                }},
                new HashMap<String, Object>() {{
                    put("title", "전기세");
                    put("detail", "전기세 설명");
                    put("amount", 10);
                    put("type", "PERCENT");
                }}
        ));

        // 기본 직업
        document.put("default_jobs", Arrays.asList(
                new HashMap<String, Object>() {{
                    put("title", "소방관");
                    put("detail", "불을 끄는 소방관");
                    put("image", "firefighter.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#FF165C");
                }},
                new HashMap<String, Object>() {{
                    put("title", "기상캐스터");
                    put("detail", "날씨요정");
                    put("image", "weather_caster.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#4AB6A9");
                }}
        ));

        // 기본 예금 이자율
        document.put("default_interests", Arrays.asList(
                new HashMap<String, Object>() {{
                    put("credit_rating", 1);
                    put("short_period", 15);
                    put("long_period", 40);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 2);
                    put("short_period", 12);
                    put("long_period", 35);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 3);
                    put("short_period", 10);
                    put("long_period", 30);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 4);
                    put("short_period", 8);
                    put("long_period", 26);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 5);
                    put("short_period", 6);
                    put("long_period", 22);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 6);
                    put("short_period", 5);
                    put("long_period", 19);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 7);
                    put("short_period", 4);
                    put("long_period", 16);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 8);
                    put("short_period", 3);
                    put("long_period", 13);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 9);
                    put("short_period", 0);
                    put("long_period", 10);
                }},
                new HashMap<String, Object>() {{
                    put("credit_rating", 10);
                    put("short_period", 0);
                    put("long_period", 10);
                }}
        ));

        // 기본 학급규칙
        document.put("default_rules", Arrays.asList(
                new HashMap<String, Object>() {{
                    put("title", "헌법 제 1조 1항");
                    put("detail", "대한민국은 민주공화국이다.");
                }},
                new HashMap<String, Object>() {{
                    put("title", "헌법 제 1조 2항");
                    put("detail", "대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.");
                }}
        ));

        mongoTemplate.insert(document, "default_nation");
    }
}
