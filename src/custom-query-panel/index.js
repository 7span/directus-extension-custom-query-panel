import PanelComponent from "./panel.vue";

export default {
  id: "custom-query",
  name: "Custom Query Panel",
  icon: "dynamic_form",
  description: "This is my custom Query panel!",
  component: PanelComponent,
  options: [
    {
      field: "query",
      name: "Query",
      type: "string",
      meta: {
        interface: "input-multiline",
        width: "full",
        required: true,
      },
    },

    {
      field: "fields",
      name: "Fields",
      type: "string",
      meta: {
        interface: "input",
        width: "full",
      },
    },
  ],
  minWidth: 12,
  minHeight: 8,
};
