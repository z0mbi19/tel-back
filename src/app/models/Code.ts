import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("codes")
class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  origin: string;

  @Column()
  destiny: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  min: number;
}

export default Code;
