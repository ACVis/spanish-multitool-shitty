import mongoose from "mongoose";
import Flashcard from "../../models/flashcard";

mongoose.connect("mongodb://localhost:27017", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default async function handler(req, res) {
  console.log("in handler");
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      return handleGetFlashcards(req, res);
    case "POST":
      return handleCreateFlashcard(req, res);
    case "PUT":
      return handleUpdateFlashcard(req, res);
    case "DELETE":
      return handleDeleteFlashcard(req, res);
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}

async function handleGetFlashcards(req, res) {
  try {
    const flashcards = await Flashcard.find({});
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving flashcards" });
  }
}

async function handleCreateFlashcard(req, res) {
  console.log("inside handleCreateFlashcard");
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Both question and answer are required" });
  }

  try {
    console.log("creating new flashcard");
    const newFlashcard = await Flashcard.create({ question, answer });
    console.log(" ", newFlashcard);
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ message: "Error creating flashcard" });
  }
}

async function handleUpdateFlashcard(req, res) {
  const { id } = query;
  const { question, answer } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Flashcard ID is required" });
  }

  try {
    const updatedFlashcard = await Flashcard.findByIdAndUpdate(
      id,
      { question, answer },
      { new: true }
    );

    if (!updatedFlashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.status(200).json(updatedFlashcard);
  } catch (error) {
    res.status(500).json({ message: "Error updating flashcard" });
  }
}

async function handleDeleteFlashcard(req, res) {
  const { id } = query;

  if (!id) {
    return res.status(400).json({ message: "Flashcard ID is required" });
  }

  try {
    const deletedFlashcard = await Flashcard.findByIdAndDelete(id);

    if (!deletedFlashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: "Error deleting flashcard" });
  }
}
