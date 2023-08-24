import PanelComponent from "./panel.vue";

export default {
    id: "custom-query",
    name: "Custom Query Panel",
    icon: "dynamic_form",
    description: "This is my custom Query panel!",
    component: PanelComponent,
    options: [
        {
            field: "query_id",
            name: "Query ID",
            type: "string",
            meta: {
                note: "Enter your Query ID here to retrieve data",
                interface: "input",
                width: "full",
            },
        },
        {
            field: "fields",
            name: "Fields",
            type: "string",
            meta: {
                note: "Enter comma separated values here",
                interface: "input",
                options: {
                    placeholder: "name,label,etc...",
                },
                width: "full",
            },
        },
    ],
    minWidth: 12,
    minHeight: 8,
};
