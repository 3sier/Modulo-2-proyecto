import { MongooseModuleOptions } from '@nestjs/mongoose';

const mongooseConfig: MongooseModuleOptions = {
  uri: 'your-mongodb-uri',
  connectionName: 'cars',
};
export const DatabaseConfig = {
  uri: 'mongodb://localhost:27017/your-database-name',
};
export { mongooseConfig };
