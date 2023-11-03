import { MongooseModuleOptions } from '@nestjs/mongoose';
import 'dotenv/config';

console.log(process.env.DB_URI);
const mongooseConfig: MongooseModuleOptions = {
  uri: 'your-mongodb-uri',
  connectionName: 'cars',
};
export const DatabaseConfig = {
  uri: process.env.DB_URI,
};
export { mongooseConfig };
