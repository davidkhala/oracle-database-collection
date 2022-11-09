-- show history query
select *
from dba_hist_sqltext;
-- show recent query, here is a 60-days sample
SELECT *
FROM V$SQL V
where to_date(v.FIRST_LOAD_TIME, 'YYYY-MM-DD hh24:mi:ss') > sysdate - 60
