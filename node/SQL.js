export const User = {
    listAllUsers: 'SELECT * FROM dba_users',
}
export const blockchain = {
    createTable: (tableName, schema, isDev, rowRetention) => `
    CREATE BLOCKCHAIN TABLE ${tableName} (${schema})
    NO DROP${isDev ? ' UNTIL 0 DAYS IDLE' : ''}
    ${isDev ? 'NO DELETE UNTIL 16 DAYS AFTER INSERT' : rowRetention >= 16 ? `NO DELETE UNTIL ${rowRetention} DAYS AFTER INSERT` : 'NO DELETE'}
    HASHING USING "SHA2_512" VERSION "v1"`,
}

