import { readFileSync } from 'fs';
import { join } from 'path';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDatabase1743004759968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const path = join(process.cwd(), 'src/database/traffic_data.sql');
    const seedSQL = readFileSync(path, 'utf-8');
    const statements = seedSQL
      .split(';')
      .filter((statement) => statement.trim() !== '');

    for (const statement of statements) {
      await queryRunner.query(statement);
    }
  }

  public async down(): Promise<void> {}
}
