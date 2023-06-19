<template>
    <div class="header">
        <h2>{{ header_title }}</h2>
        <input type="text" v-model="selectedItemName" :list="listID" class="custom-select" @input="handleSelection"
            @change="handleSelection" :placeholder="placeholder">
        <datalist :id="listID">
            <option v-for="item in filteredData" :key="item._id">{{ item.name }}</option>
        </datalist>
    </div>
</template>

<script lang="ts">
import { ref, computed, type PropType, watch } from 'vue';
import {createUUID } from '@/helpers/uniqueIdGenerator.js';

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

    emits: ['input_name'],

    setup(props, { emit }) {
        const selectedItemName = ref<string | null>(null);

        const handleSelection = () => {

            if (selectedItemName.value === null || selectedItemName.value === '' || selectedItemName.value === ' ') {
                emit('input_name', undefined);
                return;
            }

            emit('input_name', selectedItemName.value);

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

        const listID = computed(() => createUUID());
        
        return {
            selectedItemName,
            handleSelection,
            filteredData,
            listID,
        };
    },
};
</script>

<style scoped src="@/assets/styles/admin_panel/fragments/menu_item_header.css"></style>
