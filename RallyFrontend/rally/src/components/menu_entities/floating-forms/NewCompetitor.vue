<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">
        <h2>Crear competidor</h2>
        <!-- Form fields and inputs here -->
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" required>
            </div>

            <div class="field">
                <label for="age">Edad:</label>
                <input type="text" id="age" v-model="age" required>
            </div>

            <div class="field">
                <label for="identification">Identificación (cédula)</label>
                <input type="text" id="identification" v-model="identification" required>
            </div>

            <div class="field">
                <label for="blood_type">Tipo sangre:</label>
                <input type="text" id="blood_type" v-model="blood_type" required>
            </div>

            <div class="field">
                <label for="emergency_contact">Contacto emergencia:</label>
                <input type="text" id="emergency_contact" v-model="emergency_contact" required>
            </div>

            <div class="field">
                <label for="province">Provincia:</label>
                <input type="text" id="province" v-model="province" required>
            </div>

            <div class="field">
                <label for="city">Ciudad:</label>
                <input type="text" id="city" v-model="city" required>
            </div>
        </form>

        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear un nuevo competidor ?'" @cancel="closeConfirmation" />

    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";

import { ref, onMounted } from 'vue';
import { apiService } from '@/services/apiService';


export default {

    components: { VueDatePicker, Actions, ConfirmationDialog },
    name: 'NewCompetitor',

    data() {
        return {
            showConfirmationDialog: false,
            name: '',
            age: '',
            identification: '',
            blood_type: '',
            emergency_contact: '',
            province: '',
            city: '',
        };
    },
    methods: {
        async submitForm() {
            const data = {
                name: this.name,
                age: this.age,
                identification: this.identification,
                blood_type: this.blood_type,
                emergency_contact: this.emergency_contact,
                province: this.province,
                city: this.city
            }

            console.log('Form submitted:');
            console.log(data);

            await apiService.postData(data, 'competitions')

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
