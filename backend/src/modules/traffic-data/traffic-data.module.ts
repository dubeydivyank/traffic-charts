import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrafficData } from './entities/traffic-data.entity';
import { TrafficDataController } from './traffic-data.controller';
import { TrafficDataService } from './traffic-data.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrafficData])],
  controllers: [TrafficDataController],
  providers: [TrafficDataService],
  exports: [TypeOrmModule],
})
export class TrafficDataModule {}
