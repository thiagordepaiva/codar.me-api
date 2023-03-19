import bcrypt from "bcrypt";

import { prisma } from "~/data";

export const list = async ctx => {
  try {
    ctx.body = await prisma.user.findMany();
  } catch (error) {
    ctx.staus = 500;
    ctx.body = "Ops! Algo deu errado tente novamente.";
    console.log("Error: " + error);
  }
};

export const create = async ctx => {
  try {
    const hashedPassword = await encryptingPassword(ctx.request.body.password);

    ctx.body = await prisma.user.create({
      data: {
        name: ctx.request.body.name,
        email: ctx.request.body.email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    ctx.staus = 500;
    ctx.body = "Ops! Algo deu errado tente novamente.";
    console.log("Error: " + error);
  }
};

export const update = async ctx => {
  try {
    const data = {
      name: ctx.request.body.name,
      email: ctx.request.body.email,
      password: ctx.request.body.password,
    };

    ctx.body = await prisma.user.update({
      where: { id: ctx.params.id },
      data,
    });
  } catch (error) {
    ctx.staus = 500;
    ctx.body = "Ops! Algo deu errado tente novamente.";
    console.log("Error: " + error);
  }
};

export const remove = async ctx => {
  try {
    await prisma.user.delete({
      where: { id: ctx.params.id },
    });

    ctx.body = ctx.params.id;
  } catch (error) {
    ctx.staus = 500;
    ctx.body = "Ops! Algo deu errado tente novamente.";
    console.log("Error: " + error);
  }
};

export const encryptingPassword = async password => {
  const saltRounds = 10;

  return await bcrypt.hash(password, saltRounds);
};
