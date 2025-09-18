import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import {join} from "path";

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.name'),
                autoLoadEntities: configService.get<boolean>('database.auto_load_entities'),
                synchronize: configService.get<boolean>('database.sync'),
                logging: configService.get<boolean>('database.logging'),
                migrationsRun: configService.get<boolean>('database.migrations_run'),
                entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
                migrations: [join(__dirname, '..', '..', 'migrations', '*.{ts,js}')],
                migrationsTableName: 'migrations',
            }),
        }),
    ],
})

export class DatabaseModule {}