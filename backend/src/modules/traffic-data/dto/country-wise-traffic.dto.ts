import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';

export class CountryWiseTrafficQueryDto {
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

export class CountryWiseTrafficResponseDto {
  @ApiProperty({
    description: 'Country name',
    example: 'United States',
  })
  country: string;

  @ApiProperty({
    description: 'Total count of vehicles for the country',
    example: 1500,
  })
  count: number;
}
