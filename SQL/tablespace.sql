SELECT TABLESPACE_NAME
from dba_tablespaces;


ALTER TABLESPACE ${tablespace_name} OFFLINE;

ALTER TABLESPACE ${tablespace_name} ONLINE;

ALTER TABLESPACE ${tablespace_name} READ ONLY;


CREATE TABLESPACE ${tablespace_name}
    DATAFILE ${datafile} -- file extension .dbf
    SIZE 50m;


