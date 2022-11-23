import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import Project from "../models/Project";

class ProjectController {
  async index(req: Request, res: Response) {
    const repository = getRepository(Project);

    const project = await repository.find({ where: { id: req.params.id } });

    return res.json(project);
  }
  async indexAll(req: Request, res: Response) {
    const repository = getRepository(Project);

    const project = await repository.find();

    return res.json(project);
  }
  async store(req: Request, res: Response) {
    const repository = getRepository(Project);
    const { title, zip_code, cost, done, deadline, userName } = req.body;
    const projectExists = await repository.findOne({ where: { title } });
    if (projectExists) {
      return res.status(409).send("Esse userName já foi cadastrado");
    }
    const user = repository.create({
      title,
      zip_code,
      cost,
      done,
      user: userName,
      deadline,
      created_at: new Date(),
    });
    try {
      await repository.save(user);
      return res.json("ok");
    } catch (e) {
      return res.send(e);
    }
  }

  async done(req: Request, res: Response) {
    const repository = getRepository(Project);

    await repository.update(req.userId, {
      done: true,
    });

    return res.json("ok");
  }

  async update(req: Request, res: Response) {
    const repository = getRepository(Project);
    const { title, zip_code, cost, done, deadline, userName } = req.body;

    const user = await repository.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(401).send("Usuario invalido");
    }

    const userExists = await repository.findOne({ where: { userName } });
    if (userExists) {
      return res.status(409).send("Esse userName já foi cadastrado");
    }

    await repository.update(req.userId, {
      title,
      zip_code,
      cost,
      done,
      deadline,
      user: userName,
    });

    return res.json("ok");
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(Project);
    const user = await repository.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(401).send("Usuario invalido");
    }
    await repository.delete(user);
    return res.json("ok");
  }
}
export default new ProjectController();
