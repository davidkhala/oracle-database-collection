Oracle stores data **logically in tablespaces** and **physically in datafiles** associated with the corresponding tablespace

- An Oracle database consists of 1+ tablespaces, which collectively store all of the database's data.
- Each tablespace consists of 1+ files called datafiles, which conforms to the OS.
- The simplest Oracle database would have one tablespace and one datafile.
- When you add another datafile to an existing tablespace, you increase the amount of disk space allocated for the corresponding tablespace

default tablespace: Every Oracle database contains a `SYSTEM` tablespace 

# segments, extents
Tablespaces are divided into logical units of storage called **segments**, which are further divided into **extents**. 
- Extents are a collection of contiguous blocks.
