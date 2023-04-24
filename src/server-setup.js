import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import swagger from "swagger-injector";

import { router } from "./routes";

const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.use(
  swagger.koa({
    path: `${__dirname}/../docs/swagger.json`,
  })
);

export { app };
