db.createUser({
  user: "flashcards_user",
  pwd: "flashcards_password",
  roles: [
    {
      role: "readWrite",
      db: "flashcards",
    },
  ],
});
