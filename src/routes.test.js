import request from "supertest";

import { app } from "./server-setup";

const email = "thiagordepaiva@gmail.com";
const emailErrado = "email_errado@email.com";
const password = "123456";
const passwordErrado = "654321";

describe("Auth routes", () => {
  it("deveria realizar o login com sucesso quando passado as credenciais corretas", async () => {
    const result = await request(app.listen())
      .get("/login")
      .auth(email, password);

    expect(result.status).toBe(200);
    expect(result.body.user.id).not.toBe(null);
    expect(result.body.token).not.toBe(null);
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
