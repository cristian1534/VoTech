import supertest from "supertest";
import app from "../app";
import { clientGenerator } from "../user/utils/pgPoolConector";
import { redisClient } from "../user/infrastructure/redis/redis";

const request = supertest(app);
interface INewUser {
  name: string;
  email: string;
  password: string;
}
interface ICredentials {
  email: string;
  password: string;
}

describe("Tests for Backend Service", () => {
  beforeEach(() => {
    console.log("Tests for User Routes");
  });
  
  it("Should register a new User", async () => {
    const newUser: INewUser = {
      name: "Luis",
      email: "luis@gmail.com",
      password: "12345678",
    };

    const response = await request.post("/users").send(newUser);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("name");
    expect(response.body.data).toHaveProperty("email");
    expect(response.body).toHaveProperty("message", "Success");
  });

  it("Should Login an User", async () => {
    const credentials: ICredentials = {
      email: "luis@gmail.com",
      password: "12345678",
    }

    const response = await request.post("/users/auth").send(credentials);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data).toHaveProperty("token");
  })

  it("Should get all Users", async () => {
    const response = await request.get("/users");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
    expect(response.body.data.length).toBeGreaterThan(0);
    expect(Array.isArray(response.body.data)).toBeTruthy();
    expect(response.body).toHaveProperty("message", "Success");
  });

  afterAll(async () => {
    const client = await clientGenerator();
    await client.query("DELETE FROM users");
    client.release();
    if (redisClient && redisClient.isOpen) {
      await redisClient.quit();
    }
  });
});
