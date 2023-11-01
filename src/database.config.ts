import { MongooseModuleOptions } from '@nestjs/mongoose';

const mongooseConfig: MongooseModuleOptions = {
  uri: 'your-mongodb-uri',
  connectionName: 'cars',
};
export const DatabaseConfig = {
  uri: 'mongodb://127.0.0.1:27017/cars',
};
export { mongooseConfig };
