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
                }},
                new HashMap<String, Object>() {{
                    put("title", "교실 청소부");
                    put("detail", "교실을 깨끗히 하는 교실 청소부");
                    put("image", "cleaner.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#FF4A4A");
                }},
                new HashMap<String, Object>() {{
                    put("title", "디자이너");
                    put("detail", "선생님을 도와 학급을 꾸미는 디자이너");
                    put("image", "designer.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#A6D953");
                }},
                new HashMap<String, Object>() {{
                    put("title", "쓰레기 분리업체");
                    put("detail", "매주 금요일 아침 분리수거 및 평소 분리수거함 정리");
                    put("image", "garbage_collector.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#4AB6A9");
                }},
                new HashMap<String, Object>() {{
                    put("title", "신문기자");
                    put("detail", "각종 게시물 게시 및 시간표 관리");
                    put("image", "reporter.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#FF165C");
                }},
                new HashMap<String, Object>() {{
                    put("title", "우체부");
                    put("detail", "가정 통신문 나눠주기 및 반 친구들 숙제 걷어서 제출하기");
                    put("image", "postman.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#634AFF");
                }},
                new HashMap<String, Object>() {{
                    put("title", "수리공");
                    put("detail", "학급에 고장난 물건이 있으면 선생님께 알리기");
                    put("image", "repairman.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#FFA234");
                }},
                new HashMap<String, Object>() {{
                    put("title", "경찰");
                    put("detail", "벌금 기록하기 및 싸움 발생시 선생님께 알리기");
                    put("image", "police.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#4A87FF");
                }},
                new HashMap<String, Object>() {{
                    put("title", "급식 배식원");
                    put("detail", "점심시간에 친구들에게 급식을 나눠주는 역할");
                    put("image", "chef.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#FAC91D");
                }},
                new HashMap<String, Object>() {{
                    put("title", "의사");
                    put("detail", "반에 상비약 관리 및 보건실 함께 가주기");
                    put("image", "doctor.png");
                    put("wage", 2000);
                    put("credit_rating", 6);
                    put("count", 0);
                    put("total", 0);
                    put("color", "#7BD979");
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
