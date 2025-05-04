import type { Context } from "hono";
import * as todoModel from "../models/todo.models.ts";
import { title } from "process";

type createTodoBody = {
  title: string;
  userId: number;
};

const createTodo = async (c: Context) => {
  try {
    const body = await c.req.json<createTodoBody>();
    if (!body.title || !body.userId)
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    const newTodo = await todoModel.createTodo(body.title, body.userId);
    return c.json({
      success: true,
      data: newTodo,
      msg: "Created new Todo!",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};
const getTodo = async (c: Context) => {
  try {
    const param = c.req.query("id");
    if (param !== undefined && param !== null) {
      const data = await todoModel.getTodo(parseInt(param));
      return c.json(data, 200);
    }
    return c.json(
      {
        success: false,
        data: null,
        msg: "Missing required fields",
      },
      400
    );
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

const UpdateTodo = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (isNaN(parseInt(id as string)))
      return c.json(
        {
          success: false,
          data: null,
          msg: "It is not a number",
        },
        400
      );

    await todoModel.UpdateTodo(Number(id));

    return c.json({
      success: true,
      msg: "Update success",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

const ChangTitle = async (c: Context) => {
  try {
    const id = c.req.query("id");
    const body = await c.req.json<{ title: string }>();

    if (!id || isNaN(parseInt(id)) || !body.title) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    }

    await todoModel.ChangTitle(Number(id), String(title));
    return c.json({
      success: true,
      msg: "Update success",
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

const GetAllTodo = async (c: Context) => {
  try {
    const id = c.req.query("id");
    if (!id || isNaN(parseInt(id))) {
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    }

    const todos = await todoModel.GetAllTodo(Number(id));
    return c.json({
      success: true,
      msg: "Get All Success",
      data: todos,
    });
  } catch (e) {
    return c.json(
      {
        success: false,
        data: null,
        msg: `${e}`,
      },
      500
    );
  }
};

export { createTodo, getTodo, UpdateTodo, ChangTitle, GetAllTodo };
