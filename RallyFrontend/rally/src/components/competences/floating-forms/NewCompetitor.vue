<style scoped src="@/assets/styles/admin_panel/floating-forms/new.css"></style>

<template>
    <div class="popup">



        <Actions @submit="submitForm" @cancel="cancelForm" />
    </div>
</template>

<script lang="ts">

import Actions from "@/components/competences/floating-forms/ActionsComponent.vue";

import { apiService } from '@/services/apiService';


export default {

    components: { Actions },
    name: 'NewCompetitor',


}
</script>
