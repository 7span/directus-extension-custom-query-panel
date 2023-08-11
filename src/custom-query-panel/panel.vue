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
  inject: ["api"],
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      if (!this.query) return;
      this.api
        .get(`custom-query?query=${this.query}`)
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
