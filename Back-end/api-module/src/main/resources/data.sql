-- TODO : 기본 데이터 생성 및 추가 구현으로 추후에 삭제 필요
insert into nation(id, code, credit_down, credit_up, currency, grade, room, school, stock, title, trading_end, trading_start, treasury)
VALUES (99, 'code', 0, 0, '미소', 6, 1, '싸피 초등학교', '몸무게', '활명수국', '11:22:59', '11:22:59', 0);

INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (1, 1, 40, 15, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (2, 2, 35, 12, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (3, 3, 30, 10, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (4, 4, 26, 8, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (5, 5, 22, 6, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (6, 6, 19, 5, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (7, 7, 16, 4, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (8, 8, 13, 3, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (9, 9, 10, 0, 99);
INSERT INTO ico.interest (id, credit_rating, long_period, short_period, nation_id) VALUES (10, 10, 10, 0, 99);
