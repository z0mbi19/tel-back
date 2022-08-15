import {MigrationInterface, QueryRunner} from "typeorm";

export class addMinTablePlan1660161604578 implements MigrationInterface {
    name = 'addMinTablePlan1660161604578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plans\` ADD \`min\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`plans\` DROP COLUMN \`min\``);
    }

}
