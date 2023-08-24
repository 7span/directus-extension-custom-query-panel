<template>
    <div>
        <div style="padding: 20px">
            <component
                :enableCreate="false"
                :is="SelectDropdownM2o"
                template="{{label}}"
                :collection="collection"
                field="query"
                :value="selected"
                @input="getData"
            />
        </div>

        <v-table
            v-if="selected"
            class="text"
            :class="{ 'has-header': showHeader }"
            :items="items"
            :loading="loading"
            v-model:headers="tableHeaders"
        >
        </v-table>
        <div v-else>Please select Query to load data</div>
    </div>
</template>

<script>
import { useExtensions } from "@directus/extensions-sdk";

export default {
    setup() {
        const { interfaces } = useExtensions();
        console.log(
            "🚀 ~ file: panel.vue:14 ~ setup ~ interfaces:",
            interfaces
        );

        const { component: SelectDropdownM2o } = interfaces.value.find(
            (i) => i.id === "select-dropdown-m2o"
        );

        return {
            SelectDropdownM2o,
        };
    },
    inject: ["api"],
    props: {
        showHeader: {
            type: Boolean,
            default: false,
        },
        query: {
            type: String,
            required: true,
        },
        fields: {
            type: String,
            required: true,
        },
        collection: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            items: [],
            loading: false,
            selected: null,
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
    watch: {
        selected(newValue) {
            this.getData(newValue);
        },
    },
    methods: {
        getData(id) {
            console.log("inside get data call", id);
            if (!id) {
                return;
            }
            this.loading = true;
            this.selected = id;
            this.api
                .get(`custom-query?id=${id}`)
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
