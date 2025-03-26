import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { VehicleTypeEnum } from '../constant/traffic-data.enum';

@Entity('traffic_data')
export class TrafficData {
  @ApiProperty({
    description: 'Unique identifier for the traffic data entry',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Date and time when the traffic data was recorded',
    example: '2023-07-15T14:30:00Z',
  })
  @Column({ type: 'timestamp' })
  date: Date;

  @ApiProperty({
    description: 'Country where the traffic data was recorded',
    example: 'United States',
  })
  @Column({ type: 'varchar', length: 100 })
  country: string;

  @ApiProperty({
    description: 'Type of vehicle recorded',
    enum: VehicleTypeEnum,
    example: VehicleTypeEnum.CAR,
  })
  @Column({
    type: 'enum',
    enum: VehicleTypeEnum,
  })
  vehicle_type: VehicleTypeEnum;

  @ApiProperty({
    description: 'Number of vehicles of the specified type recorded',
    example: 150,
  })
  @Column({ type: 'int' })
  count: number;

  @ApiProperty({
    description: 'Timestamp when the record was created',
    example: '2023-07-15T14:35:00Z',
  })
  @CreateDateColumn()
  created_at: Date;

  @ApiProperty({
    description: 'Timestamp when the record was last updated',
    example: '2023-07-15T14:35:00Z',
  })
  @UpdateDateColumn()
  updated_at: Date;
}
