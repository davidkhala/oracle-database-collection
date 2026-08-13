

## Notes
- SODA for Node.js is a Node.js API that implements Simple Oracle Document Access (SODA). It is included in package `node-oracledb`

## Feats
ConnectionString parser can help you translate oracle connectionString to a standard json format 
```javascript

import {ConnectStringParser} from './connectString.js'
const jsonResult =ConnectStringParser.parse('(name=connectionString)')
```
 