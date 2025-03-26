import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { TrafficDataService } from './traffic-data.service';
import { TrafficData } from './entities/traffic-data.entity';
import {
  CountryWiseTrafficQueryDto,
  CountryWiseTrafficResponseDto,
} from './dto/country-wise-traffic.dto';
import {
  VehicleTypeDistributionQueryDto,
  VehicleTypeDistributionResponseDto,
} from './dto/vehicle-type-distribution.dto';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('traffic-data')
export class TrafficDataController {
  constructor(private readonly trafficDataService: TrafficDataService) {}

  @Get()
  findAll(): Promise<TrafficData[]> {
    return this.trafficDataService.findAll();
  }

  @Post()
  create(
    @Body() createTrafficData: Partial<TrafficData>,
  ): Promise<TrafficData> {
    return this.trafficDataService.create(createTrafficData);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTrafficData: Partial<TrafficData>,
  ): Promise<TrafficData> {
    return this.trafficDataService.update(+id, updateTrafficData);
  }

  @Get('country-wise-traffic')
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns country-wise traffic data',
    type: [CountryWiseTrafficResponseDto],
  })
  getCountryWiseTraffic(
    @Query() query: CountryWiseTrafficQueryDto,
  ): Promise<CountryWiseTrafficResponseDto[]> {
    return this.trafficDataService.getCountryWiseTraffic(query);
  }

  @Get('vehicle-type-distribution')
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Returns vehicle type distribution data',
    type: [VehicleTypeDistributionResponseDto],
  })
  getVehicleTypeDistribution(
    @Query() query: VehicleTypeDistributionQueryDto,
  ): Promise<VehicleTypeDistributionResponseDto[]> {
    return this.trafficDataService.getVehicleTypeDistribution(query);
  }
}
