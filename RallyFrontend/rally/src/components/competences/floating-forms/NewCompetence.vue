<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">
        <h2>Crear competencia</h2>
        <!-- Form fields and inputs here -->
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" required>
            </div>

            <div class="field">
                <label for="province">Provincia:</label>
                <input type="text" id="province" v-model="province" required>
            </div>

            <div class="field">
                <label for="description">Descripción:</label>
                <input type="text" id="description" v-model="description" required>
            </div>
            <div class="field">
                <label for="dates">Fecha Inicio y Fin:</label>
                <VueDatePicker class="date-picker" v-model="date" range />
            </div>


        </form>

        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false" />

    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import Actions from "@/components/competences/floating-forms/fragments/ActionsComponent.vue";
import ConfirmationDialog from "@/components/competences/floating-forms/fragments/ConfirmationDialog.vue";

import { ref, onMounted } from 'vue';
import { apiService } from '@/services/apiService';


const date = ref();

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date();
    date.value = [startDate, endDate];
})

export default {

    components: { VueDatePicker, Actions, ConfirmationDialog },
    name: 'NewCompetence',
    data() {
        return {
            name: '',
            province: '',
            description: '',
            date: date,
            showConfirmationDialog: false,
        };
    },
    methods: {
        async submitForm() {
            const data = {
                name: this.name,
                description: this.description,
                start_date: new Date(this.date[0]).toISOString(),
                end_date: new Date(this.date[1]).toISOString(),
                province: this.province,
            }

            console.log('Form submitted:');
            console.log(data);

            await apiService.postData(data, 'competitions')

            this.$emit('close');
        },

        cancelForm() {
            console.log('Form cancelled:');
            this.$emit('close');
        },

        showConfirmation() {
            this.showConfirmationDialog = true;
        },

        closeConfirmation() {
            this.showConfirmationDialog = false;
        },

    }
}
</script>
