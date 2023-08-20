import supertest from "supertest";
import server from "../src/server"; // Your server configuration
import Flashcard from "../src/models/Flashcard"; // Assuming the model is exported in this file
import mongoose from "mongoose";

const request = supertest(server);

const flashcardData = {
  frontContent: "What is TDD?",
  backContent: "Test Driven Development",
  tags: ["testing", "development"],
  deck: "Software Development",
  answerTime: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Flashcards API", () => {
  beforeAll(async () => {
    await mongoose.connect(
      process.env.MONGODB_URI,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err);
          process.exit(1);
        }
      }
    );
  });

  it("should create a new flashcard", async () => {
    const response = await request.post("/api/flashcards").send(flashcardData);
    expect(response.statusCode).toBe(201);
    expect(response.body.frontContent).toBe(flashcardData.frontContent);
  });

  it("should get all flashcards", async () => {
    const response = await request.get("/api/flashcards");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a specific flashcard", async () => {
    const newFlashcard = new Flashcard(flashcardData);
    const savedFlashcard = await newFlashcard.save();
    const response = await request.get(`/api/flashcards/${savedFlashcard._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.frontContent).toBe(flashcardData.frontContent);
  });

  it("should update a flashcard", async () => {
    const newFlashcard = new Flashcard(flashcardData);
    const savedFlashcard = await newFlashcard.save();
    const response = await request
      .put(`/api/flashcards/${savedFlashcard._id}`)
      .send({ answerTime: 15 });
    expect(response.statusCode).toBe(200);
    expect(response.body.answerTime).toBe(15);
  });

  it("should delete a flashcard", async () => {
    const newFlashcard = new Flashcard(flashcardData);
    const savedFlashcard = await newFlashcard.save();
    const response = await request.delete(
      `/api/flashcards/${savedFlashcard._id}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Flashcard deleted successfully");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
