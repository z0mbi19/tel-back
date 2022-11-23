import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import User from "../models/User";

class UserController {
  async index(req: Request, res: Response) {
    const repository = getRepository(User);

    const user = await repository.find({ where: { id: req.params.id } });

    return res.json(user);
  }
  async indexAll(req: Request, res: Response) {
    const repository = getRepository(User);

    const user = await repository.find();

    return res.json(user);
  }
  async store(req: Request, res: Response) {
    const repository = getRepository(User);
    const { userName, password, name } = req.body;
    const userExists = await repository.findOne({ where: { userName } });
    if (userExists) {
      return res.status(409).send("Esse userName já foi cadastrado");
    }
    const cryptPass = bcrypt.hashSync(password, 8);
    const user = repository.create({ userName, password: cryptPass, name });
    try {
      await repository.save(user);
      return res.json("ok");
    } catch (e) {
      return res.send(e);
    }
  }
  async update(req: Request, res: Response) {
    const repository = getRepository(User);
    const { userName, password, name } = req.body;
    if (!userName || !password) {
      return res.status(401).send("Campo senha e usersão obrigatorios");
    }
    const user = await repository.findOne({ where: { id: req.userId } });
    if (!user) {
      return res.status(401).send("Usuario invalido");
    }

    const userExists = await repository.findOne({ where: { userName } });
    if (userExists) {
      return res.status(409).send("Esse user já foi cadastrado");
    }

    const cryptPass = bcrypt.hashSync(password, 8);

    await repository.update(req.userId, {
      userName,
      password: cryptPass,
      name,
    });

    return res.json("ok");
  }

  async delete(req: Request, res: Response) {
    const repository = getRepository(User);
    const user = await repository.findOne({ where: { id: req.params.id } });
    if (!user) {
      return res.status(401).send("Usuario invalido");
    }
    await repository.delete(user);
    return res.json("ok");
  }
}
export default new UserController();
