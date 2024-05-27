# Datafiles
Oracle stores data physically in **datafiles**.
- files with .DBF extension.
- DB keeps the database tables, views, indexes, and other schema objects in them.
- Up to 1022 of datafiles in one tablespace

Oracle stores data **logically in tablespaces** and **physically in datafiles** associated with the corresponding tablespace
# tablespace: an intermediary between the physical and logical Oracle components
- An Oracle database consists of 1+ tablespaces, which collectively store all of the database's data.
- Each tablespace consists of 1+ files called datafiles, which conforms to the OS.
- The simplest Oracle database would have one tablespace and one datafile.
- When you add another datafile to an existing tablespace, you increase the amount of disk space allocated for the corresponding tablespace

## default tablespaces
`SYSTEM`
- contains data dictionary: tables’ definitions, views, and stored procedures
- users should not add/store any objects here.

`SYSAUX`: auxiliary tablespace to offload SYSTEM tablespace
- Become mandatory since Oracle 10g.
- It contains some indexes and non-sys-related tables that earlier belonged to the `SYSTEM` tablespace.
- users should not add/store any objects here.

`USERS`
- a permanent tablespace containing the application data.
- This space is filled with data created and entered by the users.
- in DataGrip, it is shown separately

`UNDOTBS`
- contains the undo data

`TEMP`
- contains temporary data and indexes.
- Used for work with large tables and clauses like `DISTINCT`, `GROUP BY`, and `ORDER BY`.

## offline tablespaces
Offline tablespaces don’t allow users to access the data
- Usually, DBAs turn the tablespaces offline for maintenance and updating operations.
- OracleDB itself turns the tablespaces offline in case of errors.
- Exception: You can’t turn the default `SYSTEM` tablespace, any UNDO or any Temporary tablespaces offline.

## Read-only tablespaces

- Exception: It is possible to remove some objects from read-only tablespaces, but you can’t create or alter existing objects there.
- The tablespace must be online and not having any undo information to be applied to switch to read-only mode
- offline datafiles become readable if you switch the tablespace to the read-only status

# segments, extents
Tablespaces are divided into logical units of storage called **segments**, which are further divided into **extents**.
- Extents are a collection of contiguous blocks.


# Ref
https://blog.devart.com/oracle-tablespace.html