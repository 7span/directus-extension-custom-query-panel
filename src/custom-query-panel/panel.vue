<template>
    <div>
        <v-table
            class="text"
            :class="{ 'has-header': showHeader }"
            :items="items"
            :loading="loading"
            v-model:headers="tableHeaders"
        >
        </v-table>
    </div>
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
            type: String,
            required: true,
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
            return this.localFields?.map((field) => {
                return {
                    text: field.toUpperCase(),
                    value: field,
                    align: "left",
                    sortable: false,
                };
            });
        },
        localFields() {
            return this.fields.split(",");
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
            this.api
                .get(`custom-query?id=${query_id}`)
                .then((res) => {
                    if (res.data && res.data.length) {
                        this.items = res.data[0];
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

<style scoped>
.text {
    padding: 12px;
}

.text.has-header {
    padding: 0 12px;
}
</style>
