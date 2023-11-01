import { MongooseModuleOptions } from '@nestjs/mongoose';

const mongooseConfig: MongooseModuleOptions = {
  uri: 'your-mongodb-uri',
  connectionName: 'cars',
};

export { mongooseConfig };
