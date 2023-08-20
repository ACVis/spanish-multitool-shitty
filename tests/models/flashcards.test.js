import mongoose from "mongoose";
import Flashcard from "../src/models/Flashcard"; // Assuming the model is exported in this file

const flashcardData = {
  frontContent: "What is TDD?",
  backContent: "Test Driven Development",
  tags: ["testing", "development"],
  deck: "Software Development",
  answerTime: 10,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe("Flashcard Model Test", () => {
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

  it("should create & save flashcard successfully", async () => {
    const validFlashcard = new Flashcard(flashcardData);
    const savedFlashcard = await validFlashcard.save();

    expect(savedFlashcard._id).toBeDefined();
    expect(savedFlashcard.frontContent).toBe(flashcardData.frontContent);
    expect(savedFlashcard.backContent).toBe(flashcardData.backContent);
    expect(savedFlashcard.tags).toEqual(
      expect.arrayContaining(flashcardData.tags)
    );
    expect(savedFlashcard.deck).toBe(flashcardData.deck);
    expect(savedFlashcard.answerTime).toBe(flashcardData.answerTime);
    expect(savedFlashcard.createdAt).toEqual(flashcardData.createdAt);
    expect(savedFlashcard.updatedAt).toEqual(flashcardData.updatedAt);
  });

  it("should get a flashcard", async () => {
    const foundFlashcard = await Flashcard.findOne({
      frontContent: flashcardData.frontContent,
    });
    expect(foundFlashcard.frontContent).toBe(flashcardData.frontContent);
  });

  it("should update a flashcard", async () => {
    const updatedFlashcard = await Flashcard.findOneAndUpdate(
      { frontContent: flashcardData.frontContent },
      { answerTime: 15 },
      { new: true }
    );
    expect(updatedFlashcard.answerTime).toBe(15);
  });

  it("should delete a flashcard", async () => {
    await Flashcard.findOneAndDelete({
      frontContent: flashcardData.frontContent,
    });
    const deletedFlashcard = await Flashcard.findOne({
      frontContent: flashcardData.frontContent,
    });
    expect(deletedFlashcard).toBeNull();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
