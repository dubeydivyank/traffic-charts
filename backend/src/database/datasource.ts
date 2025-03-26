import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql_db',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'abc123',
  database: process.env.DB_NAME || 'traffic_db',
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
