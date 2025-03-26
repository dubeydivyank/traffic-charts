import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateTrafficDataTable1742743331407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'traffic_data',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'date',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'vehicle_type',
            type: 'enum',
            enum: ['Car', 'Truck', 'Bus', 'Two Wheeler', 'Three Wheeler'],
            isNullable: false,
          },
          {
            name: 'count',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndices('traffic_data', [
      new TableIndex({ name: 'idx_date', columnNames: ['date'] }),
      new TableIndex({ name: 'idx_country', columnNames: ['country'] }),
      new TableIndex({
        name: 'idx_vehicle_type',
        columnNames: ['vehicle_type'],
      }),
      new TableIndex({
        name: 'idx_date_country',
        columnNames: ['date', 'country'],
      }),
      new TableIndex({
        name: 'idx_date_vehicle_type',
        columnNames: ['date', 'vehicle_type'],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('traffic_data');
  }
}
