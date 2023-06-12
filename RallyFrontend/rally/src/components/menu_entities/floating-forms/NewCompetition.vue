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
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear una nueva competición ?'" @cancel="closeConfirmation" />

    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { competitionStore } from '@/stores/competitionStore';

import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";

import { ref, onMounted } from 'vue';

const date = ref();

onMounted(() => {
    const startDate = new Date();
    const endDate = new Date();
    date.value = [startDate, endDate];
})

export default {

    name: 'NewCompetition',
    components: { VueDatePicker, Actions, ConfirmationDialog },

    data() {
        return {
            showConfirmationDialog: false,
            name: '',
            province: '',
            description: '',
            date: date,
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
            await competitionStore().addCompetition(data);

            this.$emit('close');
        },

        cancelForm() {
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
