ALTER SESSION SET CONTAINER = FREEPDB1;
GRANT CONNECT, RESOURCE TO PDBADMIN;
GRANT create session to PDBADMIN;
GRANT UNLIMITED TABLESPACE TO PDBADMIN;