import Router from "@koa/router";

import * as users from "./modules/users";
import * as auth from "./modules/auth";

export const router = new Router();

// Auth
/**
 * components:
 *   securitySchemes:
 *     basicAuth:
 *       type: http
 *       scheme: basic
 *
 * security:
 *   - basicAuth: []
 */

/**
 * @openapi
 *
 * /login:
 *  get:
 *    security:
 *      - basicAuth: []
 */
router.get("/login", auth.login);

// Users
router.get("/users", users.list);
router.post("/users", users.create);
router.put("/users/:id", users.update);
router.delete("/users/:id", users.remove);
