import { Request, Response } from "express";
import { getRepository } from "typeorm";

import Code from "../models/Code";
import Plan from "../models/Plan";

class FormController {
  async sendData(req: Request, res: Response) {
    const repository = await getRepository(Code).find();
    const plans = await getRepository(Plan).find();
    const origin: string[] = [];
    const destiny: string[] = [];
    const plan: string[] = [];

    plans.forEach((x) => {
      plan.push(x.name);
    });

    repository.forEach((x) => {
      origin.push(x.origin);
      destiny.push(x.destiny);
    });

    return res.status(200).json({
      origin: origin.filter((item, i) => origin.indexOf(item) === i),
      destiny: destiny.filter((item, i) => destiny.indexOf(item) === i),
      plans: plan,
    });
  }

  async sendValue(req: Request, res: Response) {
    const { origin, destiny, plan, min } = req.body;
    const repository = await getRepository(Code).find({
      where: { origin: origin, destiny: destiny },
    });
    const plans = await getRepository(Plan).find({ where: { name: plan } });

    if (!origin) {
      return res.status(400).send("O campo Código de origem e obrigatorio");
    }

    if (!destiny) {
      return res.status(400).send("O campo Código de destino e obrigatorio");
    }

    if (!plan) {
      return res.status(400).send("O campo plano e obrigatorio");
    }
    if (!min) {
      return res.status(400).send("O campo quantos minutos e obrigatorio");
    }

    if (repository.length === 0) {
      return res.status(400).send("Não encontrei planos para essa area ");
    }

    const tax = repository[0].min * 0.1;

    const calPlan = (parseFloat(min) - plans[0].min) * repository[0].min;
    const cal = parseFloat(min) * repository[0].min;

    return res.status(200).json({
      withPlan: calPlan <= 0 ? 0 : (calPlan + tax).toFixed(2),
      withoutPlan: cal.toFixed(2),
    });
  }
}

export default new FormController();
