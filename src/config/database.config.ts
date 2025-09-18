import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('database', () => ({
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || '3306', 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    auto_load_entities: true,
    sync: false,
    logging: false,
    migrations_run: false,
}));