import mongoose from "mongoose";

const flashcardSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

let Flashcard;

try {
  // Try accessing the existing model
  Flashcard = mongoose.model("Flashcard");
} catch (error) {
  // If the model doesn't exist, define it
  const flashcardSchema = new mongoose.Schema({
    // Flashcard schema definition
  });

  Flashcard = mongoose.model("Flashcard", flashcardSchema);
}
export default Flashcard;
