import { createConnection } from 'typeorm';

export const testConnection = (drop: boolean = false) => {
  return createConnection({
    name: 'default',
    type: 'mysql',
    host: 'localhost',
    database: 'backendTest',
    username: 'root',
    password: 'mysqlGastro',
    synchronize: drop,
    dropSchema: drop,
    entities: [__dirname + './../../../../**/*.model.ts']
  });
};
