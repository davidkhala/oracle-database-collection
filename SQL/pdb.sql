select * from SYS.DBA_PDBS;
-- Switch to PDB session
ALTER SESSION SET CONTAINER = ${pdb_name};