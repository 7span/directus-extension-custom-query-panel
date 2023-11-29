import { dollar as phrase } from "paraphrase";
import { CUSTOM_QUERY_COLLECTION, CUSTOM_QUERY_FIELD_LENGTH, DIRECTUS_FIELDS_OBJ } from "./utils/config";

export default {
  id: "custom-query-panel",
  handler: (router, { services, logger, database }) => {
    const { ItemsService } = services;

    // Endpoint to execute a custom query
    router.get("/execute", async (req, res) => {
      try {
        // Check if query_id is provided
        if (!req.query.query_id) {
          return res.status(400).json({ error: "Query ID is required" });
        }

        // Initialize the custom query service
        const customQueryService = new ItemsService(CUSTOM_QUERY_COLLECTION, { schema: req.schema });

        // Retrieve the custom query based on the provided ID
        const customQueryData = await customQueryService.readOne(req.query.query_id);

        // Check if custom query data is retrieved
        if (!customQueryData) {
          return res.status(404).json({ error: "Custom query not found" });
        }

        // Prepare the variables for the custom query
        const queryVariables = req.query.variables || [];
        const preparedVariables = prepareVariables(queryVariables);

        // Execute the custom query
        const RAW_QUERY = phrase(`${customQueryData.query}`, preparedVariables);
        logger.debug(`Raw query: ${RAW_QUERY}`);
        const executedQueryData = await database.raw(RAW_QUERY);
        const fetchedQueryData = executedQueryData[0];

        logger.debug("Custom Query Executed");
        return res.status(200).json({ data: fetchedQueryData });
      } catch (error) {
        logger.error(`error: ${error}`);
        return res.status(500).json({ error: `${error.message}` });
      }
    });

    // Endpoint to create a table for storing custom queries
    router.post("/create-table", async (req, res) => {
      try {
        const customQueryService = new ItemsService('directus_fields', { schema: req.schema });

        // Create a table for custom queries
        await database.schema.createTable(CUSTOM_QUERY_COLLECTION, (table) => {
          table.increments(), table.string("name"), table.varchar("query", CUSTOM_QUERY_FIELD_LENGTH);
        });

        // Create a collection field of type code editor for MYSQL query
        await customQueryService.createOne(DIRECTUS_FIELDS_OBJ);
      
        return res
          .status(200)
          .json({
            message: `Table Created for Custom Query Extension ${CUSTOM_QUERY_COLLECTION}`,
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
    preparedVariables[key] = value
    // if (Number.isInteger(value)) {
    //   preparedVariables[key] = `${parseInt(value)}`;
    // } else if (!isNaN(parseFloat(value))) {
    //   preparedVariables[key] = `${parseFloat(value)}`;
    // } else if (typeof value === "string") {
    //   preparedVariables[key] = `'${value}'`;
    // } else {
    //   console.log(`Unsupported data type for key ${key}`)
    // }
  });
  return preparedVariables;
}