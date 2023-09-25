app.get('/social/posts/:id', async (req, res) => {
  const postId = req.params.id;
  // Fetch the post from the database using the postId
  const post = // ...
  res.json(post);
});
