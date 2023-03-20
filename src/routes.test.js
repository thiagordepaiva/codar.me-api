import jwt from "jsonwebtoken";
import request from "supertest";

import { encryptingPassword } from "./modules/users";
import { app } from "./server-setup";
import * as model from "./modules/users/model";

const name = "Thiago Rodrigues de Paiva";
const email = "thiagordepaiva@gmail.com";
const emailErrado = "email_errado@email.com";
const password = "123456";
const passwordErrado = "654321";
var user;

describe("Auth routes", () => {
  beforeAll(async () => {
    await model.deleteMany({});

    const hashedPassword = await encryptingPassword(password);

    user = await model.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  });

  afterAll(async () => {
    await model.remove({
      where: { id: user.id },
    });
  });

  it("deveria realizar o login com sucesso quando passado as credenciais corretas", async () => {
    const result = await request(app.listen())
      .get("/login")
      .auth(email, password);

    const decodedToken = jwt.verify(result.body.token, process.env.JWT_SECRET);

    expect(result.status).toBe(200);
    expect(result.body.user).toBeTruthy();
    expect(result.body.user.id).toBe(user.id);
    expect(result.body.user.email).toBe(user.email);
    expect(result.body.user.name).toBe(user.name);
    expect(result.body.user.password).toBeFalsy();

    expect(result.body.token).toBeTruthy();

    expect(decodedToken.sub).toBe(user.id);
    expect(decodedToken.name).toBe(user.name);
  });

  it("deveria retornar um 'Status 404 not found' quando logar com email errado nas credenciais", async () => {
    const result = await request(app.listen())
      .get("/login")
      .auth(emailErrado, password);

    expect(result.status).toBe(404);
  });

  it("deveria retornar um 'Status 404 not found' quando logar com password errado nas credenciais", async () => {
    const result = await request(app.listen())
      .get("/login")
      .auth(email, passwordErrado);

    expect(result.status).toBe(404);
  });
});
