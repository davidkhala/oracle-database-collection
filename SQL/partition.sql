-- view partitions
select TABLE_OWNER, TABLE_NAME, PARTITION_NAME, NUM_ROWS, HIGH_VALUE, TABLESPACE_NAME
FROM ALL_TAB_PARTITIONS;

select * from ${table} partition (${partition})