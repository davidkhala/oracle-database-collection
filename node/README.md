

## Notes
- SODA for Node.js is a Node.js API that implements Simple Oracle Document Access (SODA). It is part of the Oracle Node.js driver, `node-oracledb` — no additional installation is needed.

## Feats
ConnectionString parser can help you translate oracle connectionString to a standard json format 
```javascript

import {ConnectStringParser} from './connectString.js'
const jsonResult =ConnectStringParser.parse('(name=connectionString)')
```
 