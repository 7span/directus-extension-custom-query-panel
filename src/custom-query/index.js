import { dollar as phrase } from "paraphrase";

export default {
  id: "query",
  handler: (router, { services, logger, database }) => {
    const { ItemsService } = services;
    const tableName = "cqp_queries";

    // Endpoint to execute a custom query
    router.get("/execute", async (req, res) => {
      try {
        // Initialize the custom query service
        const customQueryService = new ItemsService(tableName, { schema: req.schema });
        const { query_id } = req.query;

        // Retrieve the custom query based on the provided ID
        const customQueryData = await customQueryService.readOne(query_id);

        // Prepare the variables for the custom query
        const queryVariables = req.query.variables;
        const preparedVariables = prepareVariables(queryVariables);

        // Execute the custom query
        const query = phrase(`${customQueryData.query}`, preparedVariables);
        if (query) {
          const executedQueryData = await database.raw(query);
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
    });

    // Endpoint to create a table for storing custom queries
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

// Function to prepare the variables for the custom query 
function prepareVariables(variables) {
  const preparedVariables = {};
  variables.forEach((item) => {
    const { key, value } = item;
    if (Number.isInteger(value)) {
      preparedVariables[key] = `${parseInt(value)}`;
    } else if (!isNaN(parseFloat(value))) {
      preparedVariables[key] = `${parseFloat(value)}`;
    } else if (typeof value === "string") {
      preparedVariables[key] = `'${value}'`;
    } else {
      console.log(`Unsupported data type for key ${key}`)
    }
  });
  return preparedVariables;
}