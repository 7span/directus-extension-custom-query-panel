<template>
    <v-table
        class="text"
        :class="{ 'has-header': showHeader }"
        :items="items"
        :loading="loading"
        v-model:headers="tableHeaders"
    >
    </v-table>
</template>

<script>
export default {
    setup() {
        return {};
    },
    inject: ["api"],
    props: {
        showHeader: {
            type: Boolean,
            default: false,
        },
        query_id: {
            type: String,
            required: true,
        },
        fields: {
            type: Array,
            required: () => [],
        },
        variables: {
            type: Array,
            required: () => [],
        },
    },
    watch: {
        variables() {
            this.getData();
        },
    },
    data() {
        return {
            items: [],
            loading: false,
        };
    },
    computed: {
        tableHeaders() {
            return this.fields?.map((field) => {
                return {
                    text: field.label.toUpperCase(),
                    value: field.key,
                    align: "left",
                    sortable: false,
                    width: field.width,
                };
            });
        },
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            if (!this.query_id) {
                alert("Please provide Query ID from panel configuration");
                return;
            }
            this.loading = true;

            this.api(`custom-query-panel/execute`, {
                params: {
                    query_id: this.query_id,
                    variables:
                        this.variables && this.variables.length
                            ? this.variables
                            : undefined,
                },
            })
                .then((res) => {
                    if (res.data && res.data.data.length) {
                        this.items = res.data.data;
                    }
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style>
.workspace .text {
    padding: 12px;
}

.workspace .panel-container {
    /* Fix for providing Scroll in table  */
    overflow-y: scroll;
}

.workspace .text.has-header {
    padding: 0 12px;
}
</style>
