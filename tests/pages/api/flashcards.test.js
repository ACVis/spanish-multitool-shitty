import supertest from "supertest";
import { createMocks } from "node-mocks-http";
import {
  handleCreateFlashcard,
  handleGetFlashcards,
} from "../../../pages/api/flashcards";

import handlerHello from "../../../pages/api/hello";
// import { Flashcard } from "../src/models/Flashcard"; // Assuming the model is exported in this file
import mongoose from "mongoose";

import {
  connect,
  clearDatabase,
  closeDatabase,
} from "../../../utils/connectToDb";

const { MongoClient } = require("mongodb");

const flashcardData = {
  frontContent: "What is TDD?",
  backContent: "Test Driven Development",
  tags: ["testing", "development"],
  deck: "Software Development",
  answerTime: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};
/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => await connect());

/**
 * Clear all test data after every test.
 */
afterEach(async () => await clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => await closeDatabase());

describe("insert", () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db();
  });

  // it("should insert a doc into collection", async () => {
  //   const users = db.collection("users");

  //   const mockUser = { _id: "some-user-id", name: "John" };
  //   await users.insertOne(mockUser);

  //   const insertedUser = await users.findOne({ _id: "some-user-id" });
  //   expect(insertedUser).toEqual(mockUser);
  // });

  describe("/api/hello", () => {
    test("returns a message with the specified animal", async () => {
      const { req, res } = createMocks({
        method: "GET",
        query: {
          hello: "dog",
        },
      });

      await handlerHello(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          name: "Hello",
        })
      );
    });
  });

  test("should create a new flashcard", async () => {
    // const request = supertest(handleCreateFlashcard);
    // const response = await request.post("/api/flashcards").send(flashcardData);
    const { req, res } = createMocks({
      method: "POST",
      query: {
        flashcards: flashcardData,
      },
    });
    await handleCreateFlashcard(req, res);
    expect(res.statusCode).toBe(201);
    expect(res.body.frontContent).toBe(flashcardData.frontContent);
  });

  afterAll(async () => {
    await connection.close();
  });
});

describe("/api/hello", () => {
  test("returns a message with the specified animal", async () => {
    const { req, res } = createMocks({
      method: "GET",
      query: {
        hello: "dog",
      },
    });

    await handlerHello(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        name: "Hello",
      })
    );
  });
});

describe("Flashcards API", () => {
  // beforeAll(async () => {
  //   try {
  //     await mongoose.connect("mongodb://localhost:27017/test", {
  //       useNewUrlParser: true,
  //     });
  //   } catch (err) {
  //     if (err) {
  //       console.error(err.message);
  //       process.exit(1);
  //     }
  //   }
  // });
  // test("should create a new flashcard", async () => {
  //   // const request = supertest(handleCreateFlashcard);
  //   // const response = await request.post("/api/flashcards").send(flashcardData);
  //   const { req, res } = createMocks({
  //     method: "POST",
  //     query: {
  //       flashcards: flashcardData,
  //     },
  //   });
  //   await handleCreateFlashcard(req, res);
  //   expect(res.statusCode).toBe(201);
  //   expect(res.body.frontContent).toBe(flashcardData.frontContent);
  // });
  // it("should get all flashcards", async () => {
  //   const request = supertest(handleGetFlashcards);
  //   const response = await request.get("/api/flashcards");
  //   expect(response.statusCode).toBe(200);
  //   expect(Array.isArray(response.body)).toBe(true);
  // });
  // it("should get a specific flashcard", async () => {
  //   const newFlashcard = new Flashcard(flashcardData);
  //   const savedFlashcard = await newFlashcard.save();
  //   const response = await request.get(`/api/flashcards/${savedFlashcard._id}`);
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.frontContent).toBe(flashcardData.frontContent);
  // });
  // it("should update a flashcard", async () => {
  //   const newFlashcard = new Flashcard(flashcardData);
  //   const savedFlashcard = await newFlashcard.save();
  //   const response = await request
  //     .put(`/api/flashcards/${savedFlashcard._id}`)
  //     .send({ answerTime: 15 });
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.answerTime).toBe(15);
  // });
  // it("should delete a flashcard", async () => {
  //   const newFlashcard = new Flashcard(flashcardData);
  //   const savedFlashcard = await newFlashcard.save();
  //   const response = await request.delete(
  //     `/api/flashcards/${savedFlashcard._id}`
  //   );
  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.message).toBe("Flashcard deleted successfully");
  // });
  // afterAll(async () => {
  //   await mongoose.disconnect();
  //   await mongoose.connection.close();
  // });
});
