# Directus Custom Query Panel

Behold the magic 🎩✨ of our simple panel! View your data without the hassle of writing custom endpoints or preparing views - it's like having your cake 🍰 and eating it too, but for data! 💾🎉


## Details

- Execute custom SQL queries directly from the panel.
- Use dynamic parameters to reuse queries with different values.
- Display query results in a simple tabular structure for easy readability.
- Enhance data visibility and understanding by enabling users to extract meaningful insights from their data which is crucial for CRM and data-driven applications.


## 👀Set Up Instructions

- Either install through NPM [npm install @7span/directus-extension-custom-query-panel](https://www.npmjs.com/) or [Installing Through the Extensions Folder](https://docs.directus.io/extensions/installing-extensions.html#installing-through-the-extensions-folder).
- Once Installed/configured extension you need hit the below curl request to create a default table(`cqp_queries`) to store the queries.

**NOTE**: Replace `localhost:8055` with your domain

```bash
curl --location --request POST 'http://localhost:8055/custom-query-panel/create-table'
```

-   Table named `cqp_queries` will be available in your project.

## How To use This Extension

1.  Create the queries in the table (`cqp_queries`) as explained in below example.

```bash
select first_name, last_name from employees where department = ${department} 
```
<!-- ![Add Query](/images/add-query.png) -->

2.  This extension provides support of *`global variables`* added in insights like department or week.
<!-- ![Department Example](/images/department-panel.png) -->

3.  Use `variables` field give in panel settings below `fields`.
<!-- ![dynamic-fields](/images/dynamic-fields.png)
![Adding File Label](/images/file-label.png) -->

4.  Use `double mustache` syntax for entering `value` field to get value from variables.
<!-- ![Alt text](/images/double-mustache.png) -->

## 👀 Environment Variables
- You can provide collection name in CUSTOM_QUERY_COLLECTION as per your needs.
- It Also provide support for custom query length using CUSTOM_QUERY_FIELD_LENGTH
```bash
# default value CUSTOM_QUERY_COLLECTION = "cqp_queries" 
CUSTOM_QUERY_COLLECTION="custom_query"
# default value CUSTOM_QUERY_FIELD_LENGTH = 5000 
CUSTOM_QUERY_FIELD_LENGTH=10000
```


## Problem

-   Getting data from database query and show it in a insights panel was missing.

-   The ability to extract and display data from a database query within an insights panel is crucial for CRM and data-driven applications.
-   Insights panels serve as a hub for users to access valuable information, gain actionable insights, and make informed decisions.
-   This feature bridges the gap between raw data stored in the database and its meaningful interpretation, making Directus an even more versatile platform for managing customer relationships and data-driven business operations.

## Extension Type

-   📦 Bundle ( Panel + Custom Endpoint )

## Screenshots

![Add Query](/images/add-query.png)
![Department Example](/images/department-panel.png)
![dynamic-fields](/images/dynamic-fields.png)
![Adding File Label](/images/file-label.png)
![Alt text](/images/double-mustache.png)
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

### Table Fields

-   We have repeater interface with multiple columns support

