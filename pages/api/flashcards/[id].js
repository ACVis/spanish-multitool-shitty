import mongoose from "mongoose";
import Flashcard from "@/models/flashcard";
import connect from "@/lib/dbConnect";
let connection;
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

export default async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "GET":
      return handleGetFlashcard(req, res, id);
    case "PUT":
      return handleUpdateFlashcard(req, res, id);
    case "DELETE":
      return handleDeleteFlashcard(req, res, id);
    default:
      res.status(405).json({ message: "Method Not Allowed" });
  }
}

const handleGetFlashcard = async (req, res, id) => {
  try {
    const flashcard = await Flashcard.findById(id);
    if (!flashcard) {
      return res.status(404).json({ message: "Flashcard not found" });
    }
    res.status(200).json(flashcard);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving flashcard" });
  }
};

const handleUpdateFlashcard = async (req, res, id) => {
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
};

const handleDeleteFlashcard = async (req, res, id) => {
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
};
