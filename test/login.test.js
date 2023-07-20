require("dotenv").config();

const app = require("../app");
const mongoose = require("mongoose");
const supertest = require("supertest");

mongoose.set("strictQuery", false);

const { DB_TEST_URI } = process.env;

let sut;

describe("login contoller", () => {
  console.log(DB_TEST_URI);

  beforeAll(async () => {
    await mongoose.connect(DB_TEST_URI);
  });

  afterAll(async () => {
    await mongoose.disconnect(DB_TEST_URI);
  });

  beforeEach(() => {
    sut = supertest(app);
  });

  describe("login method", () => {
    const url = "/api/auth/login";
    const correctCredentials = {
      email: "duda.andjei@gmail.com",
      password: "examplepassword",
    };

    test("should return successful status when user and password", async () => {
      const response = await sut.post(url).send(correctCredentials);

      expect(response.statusCode).toBe(200);
    });

    test("should return 401 error when paased wrong user email or password", async () => {
      const incorrectCredentials = {
        email: "dudashov.andjei@gmail.com",
        password: "examplepassword11",
      };
      const response = await sut.post(url).send(incorrectCredentials);

      expect(response.statusCode).toBe(401);
    });

    test("should return user token", async () => {
      const response = await sut.post(url).send(correctCredentials);

      expect(response.body.token).toBeTruthy();
      expect(typeof response.body.token).toBe("string");
    });

    test("should return user correct user object", async () => {
      const response = await sut.post(url).send(correctCredentials);

      expect(typeof response.body.user.email).toBe("string");
      expect(typeof response.body.user.subscription).toBe("string");
    });
  });
});
