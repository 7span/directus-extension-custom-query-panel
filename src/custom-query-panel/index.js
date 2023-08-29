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
            type: "standard",
            meta: {
                interface: "list",
                width: "full",
                options: {
                    fields: [
                        {
                            field: "key",
                            name: "Key",
                            type: "string",
                            meta: {
                                field: "key",
                                width: "half",
                                type: "string",
                                interface: "input",
                            },
                        },

                        {
                            field: "label",
                            name: "Label",
                            type: "string",
                            meta: {
                                field: "label",
                                width: "half",
                                type: "string",
                                interface: "input",
                            },
                        },
                        {
                            field: "width",
                            name: "Width",
                            type: "string",
                            meta: {
                                field: "width",
                                width: "half",
                                type: "string",
                                interface: "input",
                            },
                        },
                    ],
                },
            },
        },

        // Variables
        {
            field: "variables",
            name: "Variables",
            type: "standard",
            meta: {
                interface: "list",
                width: "full",
                options: {
                    fields: [
                        {
                            field: "key",
                            name: "Key",
                            type: "string",
                            meta: {
                                field: "key",
                                width: "half",
                                options: {
                                    placeholder:
                                        "Enter Dynamic Variable key here",
                                },
                                type: "string",
                                interface: "input",
                            },
                        },
                        {
                            field: "value",
                            name: "Value",
                            type: "string",
                            meta: {
                                note: "Enter {{ variable_name }} to work properly",
                                field: "value",
                                width: "half",
                                options: {
                                    placeholder: "{{department}}",
                                },
                                type: "string",
                                interface: "input",
                            },
                        },
                    ],
                },
            },
        },
    ],
    minWidth: 12,
    minHeight: 8,
};
