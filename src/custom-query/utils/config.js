import dotenv from "dotenv";
dotenv.config();

const CUSTOM_QUERY_COLLECTION =
  process.env.CUSTOM_QUERY_COLLECTION || "cqp_queries";

const DIRECTUS_FIELDS_OBJ = {
  collection: CUSTOM_QUERY_COLLECTION,
  field: "query",
  interface: "input-code",
  options: { language: "sql" },
  readonly: 0,
  hidden: 0,
  sort: 2,
  width: "full",
  required: 0,
};

// Setting the length of the custom query field, default is 5000
const CUSTOM_QUERY_FIELD_LENGTH = parseInt(process.env.CUSTOM_QUERY_FIELD_LENGTH) || 5000;

export { CUSTOM_QUERY_COLLECTION, CUSTOM_QUERY_FIELD_LENGTH, DIRECTUS_FIELDS_OBJ };
