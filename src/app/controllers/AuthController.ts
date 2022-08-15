import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User";

class AuthController {
  async authenticate(req: Request, res: Response) {
    const repository = getRepository(User);
    const { email, password } = req.body;

    if (!email) {
      return res.status(401).send("O campo email e obrigatorio");
    }
    if (!password) {
      return res.status(401).send("O campo senha e obrigatorio");
    }

    const userExists = await repository.findOne({ where: { email } });
    if (!userExists) {
      return res.status(401).send("Usuario ou senha invalido");
    }

    const isValidPassword = await bcrypt.compare(password, userExists.password);

    if (!isValidPassword) {
      return res.status(401).send("Usuario ou senha invalido");
    }

    const token = jwt.sign(
      { id: userExists.id },
      "chave esta aqui porque e so um teste",
      { expiresIn: "1d" }
    );

    return res.json({
      id: userExists.id,
      email: userExists.email,
      adm: userExists.adm,
      jwt: token,
    });
  }
}

export default new AuthController();
