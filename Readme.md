# Custom Query Panel

An easy to use insight panel to see custom raw query data from database

# Details

## Problem

-   Getting data from database query and show it in a insights panel was missing.

## Extension Type

-   📦 Bundle ( Panel + Custom Endpoint )

## Set Up Instructions

{ Include any instructions required to set up this submission - including any registrations for third-party services. }

## Screenshots

{ Include at least one screenshot or video. }

## Collaborators

-   [Harsh Kansagara](https://github.com/theharshin)
-   [Jay Bharadia](https://github.com/jay-p-b-7span)
-   [Bhagyesh Radiya](https://github.com/bhagyesh-7span)

## Contact Details

-   [Linkedin](https://www.linkedin.com/company/7span)
-   [Gmail](mailto:yo@7span.com)

## 🚧 Please note

-   this extension uses raw query. Use with caution. It might do uninteded actions.
-   Roles and permission check for query

## How To use This Extension

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
