import { dollar as phrase } from "paraphrase";

export default {
  id: "query",
  handler: (router, { services, logger, database }) => {
    const { ItemsService } = services;
    const tableName = "cqp_queries";
    router.get("/execute", async (req, res) => {
      try {
        const customQuery = new ItemsService(tableName, { schema: req.schema });
        const { query_id } = req.query;
        // Retrieving the query for the collection based on the ID.
        const customQueryData = await customQuery.readOne(query_id);

        const queryVariables = req.query.variables
        const expectedData = {}
        // To validate the request conditional fields for the query.
        queryVariables.forEach((item) => {
          const { key, value } = item;
          // Use typeof to check the type of the value
          console.log('typeof value', value, typeof value)
          if (isInteger(value)) {
            // If it's a integer, convert it to a integer type
            expectedData[key] = `${key}=${parseInt(value)}`;
          } else if(isFloat(value)){
             // If it's a float, convert it to a float type
            expectedData[key] = `${key}=${parseFloat(value)}`;
          } else if (typeof value === "string") {
            // If it's a string, keep it as a string
            expectedData[key] = `${key}='${value}'`;
          } else {
            console.log(`Unsupported data type for key ${key}`)
          }
        });
        const query = phrase(`${customQueryData.query}`, expectedData);
        console.log('Custom Query details for testing----', query)
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
    }),
    // This endpoint will create a default structure for storing the query details
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

function isInteger(value) {
  // Use a regex pattern to check for an integer
  const integerPattern = /^\d+$/;
  return integerPattern.test(value);
}
function isFloat(value) {
  // Use a regex pattern to check for an float number
  const floatPattern = /^-?\d*\.?\d+$/;
  return floatPattern.test(value);
}