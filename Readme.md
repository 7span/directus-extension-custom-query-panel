## Directus Extension Custom Query Panel

# How To use This Extension

-   Once you install the extension into your directus project by `npm install`
-   Hit the below curl request to create a default table to store the queries.

NOTE: Replace `localhost:8055` with your domain

```bash
curl --location --request POST 'localhost:8055/query/create-table'
```

-   Table named `cqp_queries` will be available in your project.
-   Create the queries in the table.
-   Provide the query id where the vue component is available.

### Global Variables Support

-   This extension provides support of global variables added in insights like department or week.
-   Use `variables` field give in panel settings below `fields`.
-   Use `double mustache` syntax for entering `value` field to get value from variables.

### Table Fields

-   We have repeater interface with multiple columns support
