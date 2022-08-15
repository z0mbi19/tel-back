import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import CodeController from "./app/controllers/CodeController";
import FormController from "./app/controllers/FormController";
import PlanController from "./app/controllers/PlanController";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddlewares";

const router = Router();

router.post("/auth", AuthController.authenticate);

router.get("/code", authMiddleware, CodeController.indexAll);
router.get("/code/:id", authMiddleware, CodeController.index);
router.post("/code", authMiddleware, CodeController.store);
router.put("/code/:id", authMiddleware, CodeController.update);
router.delete("/code/:id", authMiddleware, CodeController.delete);

router.get("/plan", PlanController.indexAll);
router.get("/plan/:id", PlanController.index);
router.post("/plan", PlanController.store);
router.put("/plan/:id", PlanController.update);
router.delete("/plan/:id", PlanController.delete);

router.get("/user", UserController.indexAll);
router.get("/user/:id", UserController.index);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

router.get("/form", FormController.sendData);
router.post("/form", FormController.sendValue);

router.post("/users", UserController.store);

export default router;
