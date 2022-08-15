import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { CodeSeed } from "../seed/code.seed";

export class SeedCode1660160335089 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await getRepository("codes").save(CodeSeed);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
