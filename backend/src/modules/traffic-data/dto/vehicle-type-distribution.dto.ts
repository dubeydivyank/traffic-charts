import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { VehicleTypeEnum } from '../constant/traffic-data.enum';

export class VehicleTypeDistributionQueryDto {
  @ApiProperty({
    description: 'Start date to filter traffic data',
    example: '2025-01-01T20:31:31.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiProperty({
    description: 'End date to filter traffic data',
    example: '2025-03-20T20:31:31.000Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class VehicleTypeDistributionResponseDto {
  @ApiProperty({
    description: 'Type of vehicle',
    example: VehicleTypeEnum.CAR,
    enum: VehicleTypeEnum,
  })
  vehicleType: string;

  @ApiProperty({
    description: 'Total count of vehicles for the vehicle type',
    example: 1500,
  })
  count: number;
}
