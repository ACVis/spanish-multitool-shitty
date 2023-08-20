// export const createFlashcard = async (data) => {
//   const flashcard = new Flashcard(data);
//   flashcard.createdAt = new Date();
//   await flashcard.save();
//   return flashcard;
// };

// // import { createFlashcard } from "./flashcards";

// test("create a flashcard", async () => {
//   const data = {
//     frontHtml: "<h1>Hola</h1>",
//     backHtml: "<h1>Hello</h1>",
//     tags: ["greeting"],
//     deck: "basic",
//   };
//   const flashcard = await createFlashcard(data);
//   expect(flashcard.frontHtml).toBe(data.frontHtml);
//   // ... other assertions ...
// });

// export const updateFlashcard = async (id, data) => {
//   const flashcard = await Flashcard.findByIdAndUpdate(id, data, { new: true });
//   flashcard.updatedAt = new Date();
//   await flashcard.save();
//   return flashcard;
// };
