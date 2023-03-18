import jwt from "jsonwebtoken";

import { prisma } from "~/data";

export const login = async ctx => {
  try {
    const { email, password } = ctx.request.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || password != user.password) {
      ctx.status = 404;
      return;
    }

    const token = jwt.sign(
      {
        sub: user.id,
        name: user.name,
        iat: Math.floor(Date.now() / 1000) - 30,
        exp: Math.floor(Date.now() / 1000) + 600,
      },
      process.env.JWT_SECRET
    );

    ctx.body = { user, token };
  } catch (error) {
    ctx.staus = 500;
    ctx.body = "Ops! Algo deu errado tente novamente.";
    console.log("Error: " + error);
  }
};
