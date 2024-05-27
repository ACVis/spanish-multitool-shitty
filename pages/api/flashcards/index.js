import mongoose from "mongoose";
// import Flashcard from "../../models/flashcard";
// import { connect } from "@/lib/connectToDb";
import connect from "@/lib/dbConnect";

console.log("NODE_ENV: ", process.env.NODE_ENV);

const { MongoClient } = require("mongodb");

let connection;
// let db;

if (process.env.NODE_ENV === "test") {
  // connection = await MongoClient.connect(global.__MONGO_URI__, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  // db = await connection.db();
  // mongoose.connect(global.__MONGO_URI__, {
  //   useNewUrlParser: true,
  //   useUnifiedTopology: true,
  // });
  connection = connect;
} else {
  connection = mongoose.connect("mongodb://localhost:27017", {
    // useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

// const flashcardSchema = new mongoose.Schema({
//   question: {
//     type: String,
//     required: true,
//   },
//   answer: {
//     type: String,
//     required: true,
//   },
// });

const flashcardSchema = new mongoose.Schema({
  frontHtml: String,
  backHtml: String,
  tags: [String],
  deck: String,
  answerTime: Number,
  createdAt: Date,
  updatedAt: Date,
});

let Flashcard;

if (mongoose.models.Flashcard) {
  Flashcard = mongoose.model("Flashcard");
} else {
  Flashcard = mongoose.model("Flashcard", flashcardSchema);
}
export { Flashcard };

export default async function handler(req, res) {
  console.log("Request received:", req.method, req.url); // Add this line

  const { method, body, query } = req;
  console.log("body: ", body);
  console.log("query: ", query);

  switch (method) {
    case "GET":
      console.log("inside GET");
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

export async function handleGetFlashcards(req, res) {
  try {
    const flashcards = await Flashcard.find({});
    res.status(200).json(flashcards);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving flashcards" });
  }
}

export async function handleCreateFlashcard(req, res) {
  console.log("inside handleCreateFlashcard");
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Both question and answer are required" });
  }

  try {
    console.log("creating new flashcard");
    console.log(" ", question);
    console.log(" ", answer);
    const newFlashcard = await Flashcard.create({
      frontHtml: question,
      backHtml: answer,
    });
    console.log(" ", newFlashcard);
    res.status(201).json(newFlashcard);
  } catch (error) {
    res.status(500).json({ message: "Error creating flashcard" });
  }
}

export async function handleUpdateFlashcard(req, res) {
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

export async function handleDeleteFlashcard(req, res) {
  const { id } = query;

  console.log("query: ", query);

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
