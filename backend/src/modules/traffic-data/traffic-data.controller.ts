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
import {
  CreateTrafficDataDto,
  UpdateTrafficDataDto,
  TrafficDataResponseDto,
} from './dto/traffic-data.dto';
import {
  ApiQuery,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('traffic-data')
@Controller('traffic-data')
export class TrafficDataController {
  constructor(private readonly trafficDataService: TrafficDataService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Returns all traffic data entries',
    type: [TrafficDataResponseDto],
  })
  findAll(): Promise<TrafficData[]> {
    return this.trafficDataService.findAll();
  }

  @Post()
  @ApiBody({ type: CreateTrafficDataDto })
  @ApiResponse({
    status: 201,
    description: 'Creates a new traffic data entry',
    type: TrafficDataResponseDto,
  })
  create(
    @Body() createTrafficData: Partial<TrafficData>,
  ): Promise<TrafficData> {
    return this.trafficDataService.create(createTrafficData);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The ID of the traffic data entry',
  })
  @ApiBody({ type: UpdateTrafficDataDto })
  @ApiResponse({
    status: 200,
    description: 'Updates a traffic data entry',
    type: TrafficDataResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateTrafficData: Partial<TrafficData>,
  ): Promise<TrafficData> {
    return this.trafficDataService.update(+id, updateTrafficData);
  }

  @Get('country-wise-traffic')
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Start date for filtering data (ISO format)',
  })
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
  @ApiQuery({
    name: 'startDate',
    required: false,
    type: String,
    description: 'Start date for filtering data (ISO format)',
  })
  @ApiQuery({
    name: 'endDate',
    required: false,
    type: String,
    description: 'End date for filtering data (ISO format)',
  })
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
