SELECT row_retention,
       row_retention_locked,
       table_inactivity_retention,
       hash_algorithm
FROM   all_blockchain_tables; -- A view over the SYS.BLOCKCHAIN_TABLE$ table.


-- View hidden blockchain table column
select internal_column_id,
       column_name,
       data_type,
       data_length,
       hidden_column,
       table_name
FROM   user_tab_cols
WHERE column_name like 'ORABCTAB_%'