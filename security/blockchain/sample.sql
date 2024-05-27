
CREATE BLOCKCHAIN TABLE employee_audit
(
    name        VARCHAR2(100),
    salary      NUMBER,
    department  VARCHAR2(100),
    change_time TIMESTAMP,
    username    VARCHAR2(100)
)
    NO DROP UNTIL 0 DAYS IDLE -- Droppable is for dev only
    NO DELETE UNTIL 16 DAYS AFTER INSERT
    HASHING USING "SHA2_512" VERSION "v1";

insert into employee_audit
values ('John Doe', 75000, 'FINANCE', SYSDATE, USER);
insert into employee_audit
values ('Sam Mo', 85000, 'IT', SYSDATE, USER);
insert into employee_audit
values ('Jane Doe', 95000, 'IT', SYSDATE, USER);