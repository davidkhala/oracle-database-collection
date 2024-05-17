-- removes any rows that are beyond the retention period. They can't be removed using a normal DELETE statement.
declare
  l_rows  number;
begin
  dbms_blockchain_table.delete_expired_rows(
    schema_name            => ${user},
    table_name             => ${table},
    before_timestamp       => null,
    number_of_rows_deleted => l_rows);

  dbms_output.put_line('Rows Deleted=' || l_rows);
end;

begin
DBMS_BLOCKCHAIN_TABLE.ADD_INTERVAL_PARTITIONING(
    schema_name              => ${user},
    table_name               => ${table},
    interval_number          => 6,
    interval_frequency       => 'DAY',-- Supported values are YEAR, MONTH, DAY, HOUR, and MINUTE.
    first_high_timestamp     => SYSDATE);
end;