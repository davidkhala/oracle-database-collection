# System Global Area (SGA)

https://docs.oracle.com/en/database/oracle/oracle-database/23/dbiad/db_sga.html

SGA is the shared memory area 
- it contains data and control information for one OracleDB instance. (parsed SQL, PL/SQL code, system parameters, data dictionary information)
- All server and background processes share the SGA.
- Almost every operation that occurs in the database involves the shared pool.
  - If a user runs a SQL statement, then Oracle Database accesses the shared pool.
- fixed SGA: reserved by system
  - an internal housekeeping area that contains general information about the state of the database

## Use cases
Pinning objects in the shared pool can provide a tremendous increase in database performance
- It can be applied to table level



## Integration
With True Cache
- You can keep frequently accessed tables persistent in the database buffer cache for True Cache and/or the primary database  
