import { Router } from "express";
import AuthController from "./app/controllers/AuthController";
import ProjectController from "./app/controllers/ProjectController";
import UserController from "./app/controllers/UserController";
import authMiddleware from "./app/middlewares/authMiddlewares";

const router = Router();

router.post("/auth", AuthController.authenticate);

router.get("/user", UserController.indexAll);
router.get("/user/:id", UserController.index);
router.post("/user", UserController.store);
router.put("/user/:id", UserController.update);
router.delete("/user/:id", UserController.delete);

router.get("/project", ProjectController.indexAll);
router.get("/project/:id", ProjectController.index);
router.post("/project", ProjectController.store);
router.put("/project/:id", ProjectController.update);
router.patch("/project/:id/done", ProjectController.done);
router.delete("/project/:id", ProjectController.delete);

export default router;
