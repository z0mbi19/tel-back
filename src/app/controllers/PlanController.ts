import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Plan from "../models/Plan";

class PlanController {
  async indexAll(req: Request, res: Response) {
    const repository = await getRepository(Plan).find();
    return res.status(200).json(repository);
  }

  async index(req: Request, res: Response) {
    const repository = await getRepository(Plan).find({
      where: { id: req.params.id },
    });

    return res.status(200).json(repository[0]);
  }
  async store(req: Request, res: Response) {
    const repository = getRepository(Plan);
    const { name, min } = req.body;
    if (!name) {
      return res.status(400).send("O campo nome de origem e obrigatorio");
    }
    if (!min) {
      return res.status(400).send("O campo quantos minutos e obrigatorio");
    }
    const planExists = await repository.findOne({ where: { name } });

    if (planExists) {
      return res.status(409).send("Esse plano já foi cadastrado");
    }

    const plan = repository.create({ name, min });
    await repository.save(plan);
    return res.status(200).send("ok");
  }

  async update(req: Request, res: Response) {
    const repository = getRepository(Plan);
    const { name, min } = req.body;
    const planExists = await repository.findOne({
      where: { id: req.params.id },
    });

    if (!planExists) {
      return res.status(409).send("Esse plano não existe");
    }
    await repository.save({ id: planExists.id, name, min });
    res.status(200).send("ok");
  }
  async delete(req: Request, res: Response) {
    const repository = getRepository(Plan);
    const code = await repository.findOne({ where: { id: req.params.id } });
    if (!repository) {
      return res.status(409).send("Esse plano nâo foi cadastrado");
    }
    await repository.delete({ id: code?.id });
    return res.status(200).send("ok");
  }
}

export default new PlanController();
