<template>
    <div class="header">
        <h2>{{ header_title }}</h2>
        <input type="text" v-model="selectedItemName" list="item-list" class="custom-select" @input="handleSelection"
            @change="handleSelection" :placeholder="placeholder">
        <option v-for="item in filteredData" :key="item._id" :value="item.name">{{ item.name }}</option>
        <datalist id="item-list">
        </datalist>
    </div>
</template>

<script lang="ts">
import { ref, type PropType, watch } from 'vue';

export default {
    name: 'AdminMenuItemHeader',
    components: {},
    props: {
        header_title: {
            type: String,
            required: true,
        },
        data: {
            type: Array as PropType<any>,
            required: true,
        },
        placeholder: {
            type: String,
            required: true,
        },
    },

    emits: ['selected-name'],

    setup(props, { emit }) {
        const selectedItemName = ref<string | null>(null);

        const handleSelection = () => {

            if (selectedItemName.value === null || selectedItemName.value === '' || selectedItemName.value === ' ') {
                emit('selected-name', undefined);
                return;
            }

            emit('selected-name', selectedItemName.value);

        };

        const filteredData = ref<Array<any>>([]);

        watch(
            () => selectedItemName.value,
            () => {
                if (selectedItemName.value) {
                    filteredData.value = props.data.filter((item: any) =>
                        item.name.toLowerCase().includes(selectedItemName.value?.toLowerCase() || '')
                    );
                } else {
                    filteredData.value = props.data;
                }
            }
        );

        return {
            selectedItemName,
            handleSelection,
            filteredData,
        };
    },
};
</script>

<style scoped src="@/assets/styles/admin_panel/fragments/menu_item_header.css"></style>
