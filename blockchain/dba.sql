
SELECT row_retention,
       row_retention_locked, 
       table_inactivity_retention,
       hash_algorithm  
FROM   all_blockchain_tables; -- A view over the SYS.BLOCKCHAIN_TABLE$ table.