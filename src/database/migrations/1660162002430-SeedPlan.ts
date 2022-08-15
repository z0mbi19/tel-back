import { getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { PlanSeed } from "../seed/plan.seed";
import bcrypt from "bcryptjs";

export class SeedPlan1660162002430 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const cryptPass = bcrypt.hashSync("123456", 8);
    await getRepository("plans").save(PlanSeed);
    await getRepository("users").save({
      email: "adm@adm.com",
      password: cryptPass,
      adm: true,
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
