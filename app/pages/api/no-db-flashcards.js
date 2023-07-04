const flashcards = [];

export default function handler(req, res) {
  const { method, body } = req;

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

function handleGetFlashcards(req, res) {
  res.status(200).json(flashcards);
}

function handleCreateFlashcard(req, res) {
  const { question, answer } = req.body;

  if (!question || !answer) {
    return res
      .status(400)
      .json({ message: "Both question and answer are required" });
  }

  const newFlashcard = {
    id: Date.now().toString(),
    question,
    answer,
  };

  flashcards.push(newFlashcard);
  res.status(201).json(newFlashcard);
}

function handleUpdateFlashcard(req, res) {
  const { id } = req.query;
  const { question, answer } = req.body;

  if (!id) {
    return res.status(400).json({ message: "Flashcard ID is required" });
  }

  const flashcardIndex = flashcards.findIndex(
    (flashcard) => flashcard.id === id
  );

  if (flashcardIndex === -1) {
    return res.status(404).json({ message: "Flashcard not found" });
  }

  const updatedFlashcard = {
    ...flashcards[flashcardIndex],
    question: question || flashcards[flashcardIndex].question,
    answer: answer || flashcards[flashcardIndex].answer,
  };

  flashcards[flashcardIndex] = updatedFlashcard;
  res.status(200).json(updatedFlashcard);
}

function handleDeleteFlashcard(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Flashcard ID is required" });
  }

  const flashcardIndex = flashcards.findIndex(
    (flashcard) => flashcard.id === id
  );

  if (flashcardIndex === -1) {
    return res.status(404).json({ message: "Flashcard not found" });
  }

  flashcards.splice(flashcardIndex, 1);
  res.status(204).end();
}
