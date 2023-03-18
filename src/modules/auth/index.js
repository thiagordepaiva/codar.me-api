import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { prisma } from "~/data";

export const login = async ctx => {
  try {
    const [type, credencials] = ctx.request.headers.authorization.split(" ");

    if (type !== "Basic") {
      ctx.staus = 400;
      return;
    }

    const [email, password] = Buffer.from(credencials, "base64")
      .toString()
      .split(":");

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const passwordEqual = await bcrypt.compare(password, user.password);

    if (!user || !passwordEqual) {
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
