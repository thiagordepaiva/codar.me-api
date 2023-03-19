export class TokenTypeError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}

export const decodedBasicToken = basicToken => {
  const [type, credencials] = basicToken.split(" ");

  if (type !== "Basic") {
    throw new TokenTypeError("Wrong token type");
  }

  const decoded = Buffer.from(credencials, "base64").toString();
  const encoded = Buffer.from(decoded, "utf-8").toString("base64");

  if (encoded !== credencials) {
    throw new TokenTypeError("Wrong credentials is not correct encoded");
  }

  if (decoded.indexOf(":") === -1) {
    throw new TokenTypeError("Wrong credentials format");
  }

  return decoded.split(":");
};
