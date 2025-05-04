import { Hono } from "hono";
import * as todoController from "../controllers/todo.controller.ts";

const todoRouter = new Hono();
todoRouter.post("/", todoController.createTodo);
todoRouter.get("/", todoController.getTodo);
todoRouter.patch("/", todoController.UpdateTodo);
todoRouter.patch("/", todoController.ChangTitle);
todoRouter.get("/all", todoController.GetAllTodo);

export { todoRouter };
