<style scoped src="@/assets/styles/admin_panel/menu_item_header.css"></style>

<template>
    <div class="header">
        <h2>{{ header_title }}</h2>

        <div class="query_elements">
            <input type="text">
            <button><span>
                    <GlSearchSm />
                </span></button>
        </div>
    </div>
</template>

<script lang="ts">
import { GlSearchSm } from "@kalimahapps/vue-icons";
export default {
    name: 'AdminMenuItemHeader',
    components: {
        GlSearchSm
    },
    props: {
        header_title: {
            type: String,
            required: true
        }
    }
};
</script>

