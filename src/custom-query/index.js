export default (router, { database }) => {
  router.get("/", async (req, res) => {
    if (req.query && req.query.query) {
      try {
        const result = await database.raw(req.query.query);
        res.json(result);
      } catch (error) {
        res.status(500);
        res.send({ data: "Something went wrong." });
      }
    } else res.send({ data: "No query passed" });
  });
};
