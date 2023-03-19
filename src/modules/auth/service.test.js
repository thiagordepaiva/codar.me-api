import { decodedBasicToken, TokenTypeError } from "./services";

const email = "thiagordepaiva@gmail.com";
const password = "123456";

describe("Service Auth Module", () => {
  it("deveria retornar as credencias passando um authentication token", () => {
    //prepare
    const token = Buffer.from(`${email}:${password}`, "utf-8").toString(
      "base64"
    );
    const basicToken = `Basic ${token}`;

    //execution
    const result = decodedBasicToken(basicToken);

    //expectation
    expect(result).toEqual([email, password]);
  });

  it("deveria retornar um 'throw new TokenTypeError()' quando token não for do tipo BasicType", () => {
    //prepare
    const token = Buffer.from(`${email}:${password}`, "utf-8").toString(
      "base64"
    );
    const basicToken = `Bearer ${token}`;

    //execution
    const result = () => decodedBasicToken(basicToken);

    //expectation
    expect(result).toThrowError("Wrong token type");
  });

  it("deveria retornar um 'throw new TokenTypeError()' quando token não estiver no formato certo", () => {
    //prepare
    const token = Buffer.from(`${email}${password}`, "utf-8").toString(
      "base64"
    );
    const basicToken = `Basic ${token}`;

    //execution
    const result = () => decodedBasicToken(basicToken);

    //expectation
    expect(result).toThrowError("Wrong credentials format");
  });

  it("deveria retornar um 'throw new TokenTypeError()' quando token não for base64", () => {
    //prepare
    const token = `${email}:${password}`;
    const basicToken = `Basic ${token}`;

    //execution
    const result = () => decodedBasicToken(basicToken);

    //expectation
    expect(result).toThrowError("Wrong credentials is not correct encoded");
  });
});
