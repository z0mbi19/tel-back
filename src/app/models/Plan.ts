import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("plans")
class Plan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  min: number;
}

export default Plan;
