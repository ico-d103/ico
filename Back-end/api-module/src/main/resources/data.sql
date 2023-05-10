insert into nation(id, code, credit_down, credit_up, currency, grade, room, school, stock, title, trading_end, trading_start, treasury)
VALUES (99, 'code', 0, 0, '미소', 6, 1, '싸피 초등학교', '몸무게', '활명수국', '11:22:59', '11:22:59', 0);

insert into job(id, color, count, credit_rating, detail, image, title, total, wage, nation_id)
VALUES(1, '빨강', 5, 0, '이 분은 소방관', '일러스트...', '소방관', 5, 1000, 99);

insert into job(id, color, credit_rating, detail, image, title, total, wage, nation_id)
VALUES(2, '파랑', 5, '이 분은 경찰관', '일러스트...', '경찰관', 3, 1500, 99);

insert into tax (id, amount, title, type, nation_id)
values (1, 10, '자리세', 1, 1),
       (2, 10, '소득세', 1, 1),
       (3, 10, '전기세', 0, 1);

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

INSERT INTO ico.teacher (id, identity, is_assigned, name, password, role)
VALUES (999, 'ssafyd103', false, '관리자', 'ssafyd103', 'ADMIN');
