import type { Context } from "hono";
import * as userModel from "../models/user.model.ts";

type createUserBody = {
  firstName: string;
  lastName: string;
};

const createUser = async (c: Context) => {
  try {
    const body = await c.req.json<createUserBody>();
    if (!body.firstName || !body.lastName)
      return c.json(
        {
          success: false,
          data: null,
          msg: "Missing required fields",
        },
        400
      );
    if (await userModel.isDuplicate(body.firstName, body.lastName)) {
      return c.json({
        success: false,
        data: null,
        msg: "firstName or lastName is duplicated",
      });
    }
    const newUser = await userModel.createUser(body.firstName, body.lastName);
    return c.json({
      success: true,
      data: newUser,
      msg: "Created new User!",
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

const getUser = async (c: Context) => {
  try {
    const users = await userModel.getUser()
    return c.json({
      success: true,
      data: users,
      msg: "Get All User ",
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

const updateUser = async (c: Context) => {
  try {
    const userId = Number(c.req.param("id"));
    const body = await c.req.json<createUserBody>();

    if (!userId || !body.firstName || !body.lastName) {
      return c.json(
        { success: false, data: null, msg: "Missing required fields" },
        400
      );
    }

    const updated = await userModel.updateUser(
      userId,
      body.firstName,
      body.lastName
    );

    return c.json({
      success: true,
      data: updated,
      msg: "User updated successfully",
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


export { createUser,getUser,updateUser };
