export default {
  id: "query",
  handler: (router, { services, logger, database }) => {
    const { ItemsService } = services;
    const tableName = "cqp_queries";
    router.get("/execute", async (req, res) => {
      try {
        const customQuery = new ItemsService(tableName, { schema: req.schema });
        const { query_id } = req.query;
        const customQueryData = await customQuery.readOne(query_id);
        if (customQueryData) {
          const executedQueryData = await database.raw(customQueryData.query);
          const fetchedQueryData = executedQueryData[0];
          logger.info("Custom Query Executed");
          return res.status(200).json({ data: fetchedQueryData });
        } else {
          return res.status(400).json({ data: "No query found" });
        }
      } catch (error) {
        logger.error(`error: ${error}`);
        return res.status(500).json({ error: `${error.message}` });
      }
    }),
      router.post("/create-table", async (req, res) => {
        try {
          await database.schema.createTable(tableName, (table) => {
            table.increments(), table.string("name"), table.string("query");
          });
          return res
            .status(200)
            .json({
              message: `Table Created for Custom Query Extension ${tableName}`,
            });
        } catch (error) {
          logger.error(`error: ${error}`);
          return res.status(500).json({ error: `${error.message}` });
        }
      });
  },
};
