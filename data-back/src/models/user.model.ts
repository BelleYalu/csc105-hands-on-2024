import { db } from "../index.ts";

const isDuplicate = async( firstName: string, lastName: string ) => {
    const user = await db.user.findFirst({
        where: {
            firstName: firstName,
            lastName: lastName,
        },
    });
    return user;
}

const createUser = async( firstName: string, lastName: string ) => {
    const user = await db.user.create({
        data: {
            firstName: firstName,
            lastName: lastName,
        },
    });
    return user;
}

const getUser = async() => {
    const user = await db.user.findMany({})
    return user;
}

const updateUser = async (userId: number, firstName: string, lastName: string) => {
  const updatedUser = await db.user.update({
    where: { id: userId },
    data: {
      firstName,
      lastName,
    },
  });
  return updatedUser;
};




export { isDuplicate, createUser, getUser, updateUser };
