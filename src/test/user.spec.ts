import supertest from "supertest";
import app from "../app";

const request = supertest(app);
interface INewUser {
  name: string;
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
});
