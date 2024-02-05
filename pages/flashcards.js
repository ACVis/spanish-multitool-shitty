import react from "react";
import { useState, useEffect } from "react";
import fs from "fs";
import path from "path";

// const frontTemplate = fs.readFileSync("path/to/frontTemplate.html", "utf8");
// const backTemplate = fs.readFileSync("path/to/backTemplate.html", "utf8");

export const applyFrontTemplate = (content) =>
  frontTemplate.replace("{{content}}", content);
export const applyBackTemplate = (content) =>
  backTemplate.replace("{{content}}", content);

export default function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleCreateFlashcard = async () => {
    try {
      const response = await fetch("/api/flashcards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, answer }),
      });
      if (response.ok) {
        console.log("Flashcard created successfully");
        // Reset the input fields
        setQuestion("");
        setAnswer("");
      } else {
        console.error("Failed to create flashcard");
      }
    } catch (error) {
      console.error("Error creating flashcard", error);
    }
  };

  const handleDeleteFlashcard = async (flashcardId) => {
    try {
      const response = await fetch(`/api/flashcards/${flashcardId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("Flashcard deleted successfully");
      } else {
        console.error("Failed to delete flashcard");
      }
    } catch (error) {
      console.error("Error deleting flashcard", error);
    }
  };

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await fetch("/api/flashcards");
        if (response.ok) {
          const data = await response.json();
          setFlashcards(data);
        } else {
          console.error("Failed to fetch flashcards");
        }
      } catch (error) {
        console.error("Error fetching flashcards", error);
      }
    }

    fetchFlashcards();
  }, []);

  return (
    <div>
      <h1>Flashcards</h1>

      <form onSubmit={handleCreateFlashcard}>
        <label>
          Question:
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </label>
        <br />
        <label>
          Answer:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create Flashcard</button>
      </form>

      {/* Fetch and display existing flashcards */}
      {/* Replace this code with your own logic to fetch flashcards from the API */}
      <h2>Existing Flashcards:</h2>
      <ul>
        <li>Flashcard 1 </li>
        {flashcards.map((flashcard) => (
          <li key={flashcard._id}>
            {flashcard.question} - {flashcard.answer}
            <pre>{JSON.stringify(flashcard)}</pre>
            <div>
              <button
                onClick={() => {
                  console.log("Click");
                  handleDeleteFlashcard(flashcard._id);
                }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const frontTemplatePath = path.join(
    process.cwd(),
    "public/frontTemplate.html"
  );
  const backTemplatePath = path.join(process.cwd(), "public/backTemplate.html");

  const frontTemplate = fs.readFileSync(frontTemplatePath, "utf8");
  const backTemplate = fs.readFileSync(backTemplatePath, "utf8");

  return {
    props: { frontTemplate, backTemplate }, // will be passed to the page component as props
  };
}
