import { ConfigService } from '@/services';
import server from '@/server';
import '@/sequelize';
import '@/socket';

const port = ConfigService.get('PORT') || 8080;
server.listen(port, () => {
  console.info(`Server run on port ${port}`);
});
