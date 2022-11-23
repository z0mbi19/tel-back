import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Project from "./Project";

@Entity("users")
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  userName: string;

  @OneToMany(() => Project, (project) => project)
  project: Project[];
}

export default User;
