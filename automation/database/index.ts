import { createConnection } from 'typeorm';
import path from 'path';

createConnection({
  name: 'mongo',
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'linkapi',
  useUnifiedTopology: true,
  entities: [
    path.resolve(
      __dirname,
      'modules',
      '**',
      'infra',
      'typeorm',
      'schemas',
      '*.ts',
    ),
  ],
});
