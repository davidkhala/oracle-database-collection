-- enable archivelog
archive log list; -- view status
select name,log_mode from v$database; -- view status


shutdown immediate;
startup mount;

alter database archivelog;
alter database open;



