import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { dataSourceOptions } from './database/datasource';
import { TrafficDataModule } from './modules/traffic-data/traffic-data.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ...dataSourceOptions,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
      migrationsRun: true,
    }),
    TrafficDataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
