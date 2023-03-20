import jwt from "jsonwebtoken";

import { decodedBasicToken } from "./services";
import * as model from "../users/model";

export const login = async ctx => {
  let email, password;

  try {
    [email, password] = decodedBasicToken(ctx.request.headers.authorization);
  } catch (error) {
    ctx.staus = 400;
    console.log("Error: " + error);
    return;
  }

  try {
    const user = await model.findUnique({
      where: { email, password },
    });

    if (!user) {
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
