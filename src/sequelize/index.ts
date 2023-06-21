import { Sequelize } from 'sequelize-typescript';
import { ConfigService } from '@/services';

const sequelize = new Sequelize(ConfigService.get('DB_CONNECTION_URI'));

(async () => {
  await sequelize.authenticate();
  console.info('Connection to database has been established successfully.');

  // await sequelize.sync({ force: true });
  // console.info('Sync successfully');
})().catch(console.error);

export default sequelize;
