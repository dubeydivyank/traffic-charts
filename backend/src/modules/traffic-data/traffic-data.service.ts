import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TrafficData } from './entities/traffic-data.entity';
import {
  CountryWiseTrafficQueryDto,
  CountryWiseTrafficResponseDto,
} from './dto/country-wise-traffic.dto';
import {
  VehicleTypeDistributionQueryDto,
  VehicleTypeDistributionResponseDto,
} from './dto/vehicle-type-distribution.dto';

@Injectable()
export class TrafficDataService {
  constructor(
    @InjectRepository(TrafficData)
    private trafficDataRepository: Repository<TrafficData>,
  ) {}

  async findAll(): Promise<TrafficData[]> {
    return this.trafficDataRepository.find();
  }

  async findOne(id: number): Promise<TrafficData> {
    return this.trafficDataRepository.findOne({ where: { id } });
  }

  async create(trafficData: Partial<TrafficData>): Promise<TrafficData> {
    const newTrafficData = this.trafficDataRepository.create(trafficData);
    return this.trafficDataRepository.save(newTrafficData);
  }

  async update(
    id: number,
    trafficData: Partial<TrafficData>,
  ): Promise<TrafficData> {
    await this.trafficDataRepository.update(id, trafficData);
    return this.findOne(id);
  }

  async getCountryWiseTraffic(
    query: CountryWiseTrafficQueryDto,
  ): Promise<CountryWiseTrafficResponseDto[]> {
    const queryBuilder = this.trafficDataRepository
      .createQueryBuilder('traffic')
      .select('traffic.country', 'country')
      .addSelect('CONVERT(SUM(traffic.count), SIGNED)', 'count')
      .groupBy('traffic.country');

    if (query.startDate) {
      queryBuilder.andWhere('traffic.date >= :startDate', {
        startDate: new Date(query.startDate),
      });
    }

    return queryBuilder.getRawMany();
  }

  async getVehicleTypeDistribution(
    query: VehicleTypeDistributionQueryDto,
  ): Promise<VehicleTypeDistributionResponseDto[]> {
    const queryBuilder = this.trafficDataRepository
      .createQueryBuilder('traffic')
      .select('traffic.vehicle_type', 'vehicleType')
      .addSelect('CONVERT(SUM(traffic.count), SIGNED)', 'count')
      .groupBy('traffic.vehicle_type');

    if (query.startDate) {
      queryBuilder.andWhere('traffic.date >= :startDate', {
        startDate: new Date(query.startDate),
      });
    }

    if (query.endDate) {
      queryBuilder.andWhere('traffic.date <= :endDate', {
        endDate: new Date(query.endDate),
      });
    }

    return queryBuilder.getRawMany();
  }
}
