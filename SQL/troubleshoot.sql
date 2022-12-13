-- show history query
select *
from dba_hist_sqltext;
-- show recent query, here is a 60-days sample
SELECT SQL_TEXT, PARSING_SCHEMA_NAME, SERVICE, FIRST_LOAD_TIME, LAST_LOAD_TIME FROM V$SQL V
where to_date(v.FIRST_LOAD_TIME, 'YYYY-MM-DD hh24:mi:ss') > sysdate - 60 AND PARSING_SCHEMA_NAME!='SYS';
