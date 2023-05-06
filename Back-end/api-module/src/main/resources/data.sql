insert into nation(id, code, credit_down, credit_up, currency, grade, room, school, stock, title, trading_end, trading_start, treasury)
VALUES (99, 'code', 0, 0, '미소', 6, 1, '싸피 초등학교', '몸무게', '활명수국', '11:22:59', '11:22:59', 0);

insert into job(id, color, count, credit_rating, detail, image, title, total, wage, nation_id)
VALUES(1, '빨강', 5, 0, '이 분은 소방관', '일러스트...', '소방관', 5, 1000, 99);

insert into job(id, color, credit_rating, detail, image, title, total, wage, nation_id)
VALUES(2, '파랑', 5, '이 분은 경찰관', '일러스트...', '경찰관', 3, 1500, 99);

insert into student(account, credit_rating, credit_score, identity, is_frozen, name, number, password, role, salary, nation_id)
values (10000, 5, 500, 'testid', false, 'test', 31, 'efasdvcxzcvads', 'STUDENT', 10000, 99);

insert into rule(id, title, detail, nation_id) VALUES(97, '우리', '행복하자', 99);
insert into rule(id, detail, title, nation_id) VALUES(98, '다들', '성공하자', 99);
insert into rule(id, detail, title, nation_id) VALUES(99, '나는', '할 수 있다!', 99);
insert into rule(id, detail, title, nation_id) VALUES(100, 'I AM', 'GROUND', 99);

