import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Code from "../models/Code";

class CodeController {
  async indexAll(req: Request, res: Response) {
    const repository = await getRepository(Code).find();
    return res.status(200).json(repository);
  }

  async index(req: Request, res: Response) {
    const repository = await getRepository(Code).find({
      where: { id: req.params.id },
    });

    return res.status(200).json(repository[0]);
  }
  async store(req: Request, res: Response) {
    const repository = getRepository(Code);
    const { origin, destiny, min } = req.body;
    if (!origin) {
      return res.status(400).send("O campo Código de origem e obrigatorio");
    }

    if (!destiny) {
      return res.status(400).send("O campo Código de destino e obrigatorio");
    }
    if (!min) {
      return res.status(400).send("O campo quantos minutos e obrigatorio");
    }
    const codeExists = await repository.findOne({ where: { origin, destiny } });

    if (codeExists) {
      return res.status(409).send("Esse codido já foi cadastrado");
    }

    const code = repository.create({ origin, destiny, min });
    await repository.save(code);
    return res.status(200).send("ok");
  }

  async update(req: Request, res: Response) {
    const repository = getRepository(Code);
    const { origin, destiny, min } = req.body;
    const codeExists = await repository.findOne({
      where: { id: req.params.id },
    });

    if (!codeExists) {
      return res.status(409).send("Esse codido não existe");
    }
    await repository.save({ id: codeExists.id, origin, destiny, min });
    res.status(200).send("ok");
  }
  async delete(req: Request, res: Response) {
    const repository = getRepository(Code);
    const code = await repository.findOne({ where: { id: req.params.id } });
    if (!repository) {
      return res.status(409).send("Esse código nâo foi cadastrado");
    }
    await repository.delete({ id: code?.id });
    return res.status(200).send("ok");
  }
}

export default new CodeController();
