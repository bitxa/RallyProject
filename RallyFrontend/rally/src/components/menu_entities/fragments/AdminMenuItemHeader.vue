<style scoped src="@/assets/styles/admin_panel/fragments/menu_item_header.css"></style>

<template>
    <div class="header">
        <h2>{{ header_title }}</h2>

        <v-autocomplete v-model="selectedItem" :items="listing_data" :label="placeholder" solo-inverted outlined
            class="custom-select" :filter="customFilter" autofocus>
        </v-autocomplete>


    </div>
</template>

<script lang="ts">

export default {
    name: 'AdminMenuItemHeader',
    components: {

    },
    props: {
        header_title: {
            type: String,
            required: true
        },
        listing_data: {
            type: Array,
            required: true,
        },

        placeholder: {
            type: String,
            required: true
        },
    },

    data() {
        return {
            selectedItem: null,
        };
    },

    computed: {
        selectedItem: {
            get(): any {
                return this.selectedItem;
            },
            set(value: any): any {
                console.log(value);
                this.$emit("update:modelValue", value);
            }
        }
    },

    methods: {
        customFilter(item: string, queryText: string, itemText: string) {

            const normalizedItem = itemText.toLowerCase();
            const normalizedQuery = queryText.toLowerCase();

            return normalizedItem.startsWith(normalizedQuery);
        },
    },

    mounted() {
        this.$nextTick(() => {
            const firstItem = this.listing_data[0];
            if (firstItem) {
                this.selectedItem = firstItem;
            }
        });
    },
};
</script>

