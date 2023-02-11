import server from '@/server';
import '@/database';
import '@/socket';
import { ConfigKeysEnum, getConfig } from './utils';

// TODO:
//  - Logging with Winston
//  - Validation of request body
//  - Update security
//  - Performance optimization
//  - Add health check

const port = getConfig(ConfigKeysEnum.PORT) || 8080;
server.listen(port, () => {
  console.info(`Server run on port ${port}`);
});
