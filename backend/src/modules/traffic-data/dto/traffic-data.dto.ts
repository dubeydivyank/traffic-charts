import { ApiProperty } from '@nestjs/swagger';
import { VehicleTypeEnum } from '../constant/traffic-data.enum';

export class CreateTrafficDataDto {
  @ApiProperty({
    description: 'Date and time when the traffic data was recorded',
    example: '2023-07-15T14:30:00Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Country where the traffic data was recorded',
    example: 'United States',
  })
  country: string;

  @ApiProperty({
    description: 'Type of vehicle recorded',
    enum: VehicleTypeEnum,
    example: VehicleTypeEnum.CAR,
  })
  vehicle_type: VehicleTypeEnum;

  @ApiProperty({
    description: 'Number of vehicles of the specified type recorded',
    example: 150,
  })
  count: number;
}

export class UpdateTrafficDataDto extends CreateTrafficDataDto {}

export class TrafficDataResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the traffic data entry',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Date and time when the traffic data was recorded',
    example: '2023-07-15T14:30:00Z',
  })
  date: Date;

  @ApiProperty({
    description: 'Country where the traffic data was recorded',
    example: 'United States',
  })
  country: string;

  @ApiProperty({
    description: 'Type of vehicle recorded',
    enum: VehicleTypeEnum,
    example: VehicleTypeEnum.CAR,
  })
  vehicle_type: VehicleTypeEnum;

  @ApiProperty({
    description: 'Number of vehicles of the specified type recorded',
    example: 150,
  })
  count: number;

  @ApiProperty({
    description: 'Timestamp when the record was created',
    example: '2023-07-15T14:35:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the record was last updated',
    example: '2023-07-15T14:35:00Z',
  })
  updated_at: Date;
}
