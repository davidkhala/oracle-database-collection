# Information lifecycle management (ILM)
- Oracle ILM cannot be fully implemented with Amazon RDS
- Physical dump
- target can  different table in same/different DB
- Data will be migrated from a partitioned source table to a partitioned archive table.


## Heat map 
Heat map tracking data is viewed with V$*, ALL*, DBA*, and USER* heat map views.

## Automatic Data Optimization (ADO)

The `DBMS_ILM` package supports immediate evaluation or execution of ADO related tasks. 

ADO task states: `Inactive`, `Active`, `Completed`

Relation with Heat Map
- The HEAT_MAP initialization parameter also enables and disables Automatic Data Optimization (ADO).
- For ADO, Heat Map must be enabled at the system level.
