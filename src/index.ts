import app from '@/app';
import { ConfigService } from './services';

const port = ConfigService.get('PORT') || 8080;
app.listen(port, () => {
  console.info(`Server run on port ${port}`);
});
