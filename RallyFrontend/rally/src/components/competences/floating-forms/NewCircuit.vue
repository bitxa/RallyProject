<style scoped src="@/assets/styles/admin_panel/floating-forms/new.css"></style>

<template>
    <div class="popup">
        <h2>Crear circuito</h2>
        <!-- Form fields and inputs here -->
        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" required>
            </div>

            <div class="field">
                <label for="description">Descripción:</label>
                <input type="text" id="description" v-model="description" required>
            </div>

            <div class="field">
                <label for="track_length">Longitud:</label>
                <input type="text" id="track_length" placeholder="km" @input="restrictToNumeric" v-model="track_length"
                    required>
            </div>

            <div class="field">
                <label for="location">Locación:</label>
                <input type="text" id="location" v-model="location" required>
            </div>
        </form>

        <Actions @submit="submitForm" @cancel="cancelForm" />
    </div>
</template>

<script lang="ts">

import Actions from "@/components/competences/floating-forms/ActionsComponent.vue";

import { apiService } from '@/services/apiService';


export default {

    components: { Actions },
    name: 'NewCompetence',
    data() {
        return {
            name: '',
            description: '',
            track_length: '',
            location: '',
        };
    },
    methods: {
        async submitForm() {
            const data = {
                name: this.name,
                description: this.description,
                track_lenght: parseFloat(this.track_length),
                location: this.location
            }

            console.log('Form submitted:');
            console.log(data);

            const result = await apiService.postData(data, 'circuits')
            console.log(result);
            this.$emit('close');
        },

        cancelForm() {
            this.$emit('close');
        },

        restrictToNumeric() {
            // Remove non-numeric characters from the input value
            this.track_length = this.track_length.replace(/[^0-9.]/g, '');
        },
    }
}
</script>
