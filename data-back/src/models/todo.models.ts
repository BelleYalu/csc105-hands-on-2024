import { title } from "process";
import { db } from "../index.ts";

const createTodo = async (title: string, userId: number) => {
  const todo = await db.todo.create({
    data: {
      title: title,
      userId: userId,
    },
  });
  return todo;
};
const getTodo = async (id: number) => {
  const todo = await db.todo.findUnique({
    where: {
      id: id,
    },
    include: {
      user: true,
    },
  });
  return todo;
};

const UpdateTodo = async (id: number) => {
  const todo = await db.todo.update({
    where: {
      id: id,
    },
    data: {
      completed: true,
    },
  });
  return todo;
};

const ChangTitle = async (id: number, title: string) => {
  const uptodo = await db.todo.update({
    where: {
      id: id,
    },
    data: {
      title: title,
    },
  });
  return uptodo;
};

const GetAllTodo = async (id: number) => {
  const getalltodo = await db.todo.findMany({
    where: {
      userId: id,
    },
  });
  return getalltodo;
};

export { createTodo, getTodo, UpdateTodo, ChangTitle, GetAllTodo };
