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
                <label for="dsscription">Descripción:</label>
                <input type="text" id="description" v-model="description" required>
            </div>

            <div class="field">
                <label for="logo">Logo</label>
                <ImagePicker @imageSelected="handleImageSelected"></ImagePicker>

            </div>

            <div class="field">
                <label for="web_site_url">Sitio Web (URL):</label>
                <input type="text" id="web_site_url" v-model="web_site_url" required>
            </div>

        </form>

        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear un nuevo sponsor?'" @cancel="closeConfirmation" />
    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ImagePicker from "@/components/menu_entities/floating-forms/fragments/ImagePicker.vue";

import { apiService } from '@/services/apiService';


export default {

    components: { VueDatePicker, Actions, ImagePicker, ConfirmationDialog },
    name: 'NewSponsor',

    data() {
        return {
            showConfirmationDialog: false,
            name: '',
            description: '',
            logo: null as File | null,
            web_site_url: '',
        };
    },
    methods: {
        async submitForm() {
            const data = {
                name: this.name,
                description: this.description,
                logo: this.logo,
                web_site_url: this.web_site_url
            }

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

        handleImageSelected(image: File) {
            this.logo = image;
        },

    }
}
</script>
