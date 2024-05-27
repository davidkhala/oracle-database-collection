# Data Pump
- released before Oracle 10g


## Components
Oracle Data Pump is made up of three distinct components
### Command-line clients
- Deals with directory objects pointing to physical directories on the database server.
- It does not write to the local file system on your client PC.

`expdp` 

`impdp`

Ref: https://oracle-base.com/articles/10g/oracle-data-pump-10g
### Data Pump API
the `DBMS_DATAPUMP` PL/SQL package
- released at 11g
- Data and metadata can be transferred between databases without using any intermediary files.

The DBMS_DATAPUMP package defines `OBJECT` types.
- The types are defined in the `SYS` schema for use by the DBMS_DATAPUMP.GET_STATUS function.

Ref: https://oracle-base.com/articles/misc/data-pump-api

### Metadata API
the `DBMS_METADATA` PL/SQL package