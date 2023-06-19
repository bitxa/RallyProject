<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">
        <span class="header">
            <h2>Agregar sponsor</h2>
            <UnPathfinderUnite class="header_icon" />
        </span>

        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" placeholder="Ingrese el nombre">
            </div>

            <div class="field">
                <label for="dsscription">Descripción:</label>
                <input type="text" id="description" v-model="description" placeholder="Ingrese la descripción">
            </div>

            <div class="field">
                <label for="logo">Logo</label>
                <ImagePicker @imageSelected="handleImageSelected"></ImagePicker>

            </div>

            <div class="field">
                <label for="web_site_url">Sitio Web (URL):</label>
                <input type="text" id="web_site_url" v-model="web_site" placeholder="Ingrese la URL del sitio web">
            </div>

            <div class="field">
                <label for="contact">Contacto:</label>
                <input type="text" id="contact" v-model="contact" placeholder="Ingrese un contacto">
            </div>

        </form>

        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear un nuevo sponsor ?'" @cancel="closeConfirmation" />

    </div>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ImagePicker from "@/components/menu_entities/floating-forms/fragments/ImagePicker.vue";

import { apiService } from '@/services/apiService';
import { competitionStore } from '@/stores/competitionStore';
import type { PropType } from 'vue';
import type { Circuit, Sponsor } from '../interfaces/Interfaces';


export default {

    components: { VueDatePicker, Actions, ImagePicker, ConfirmationDialog },
    name: 'NewSponsor',

    data() {
        return {
            showConfirmationDialog: false,
            name: '',
            description: '',
            logo: null as File | null,
            web_site: '',
            contact: '',
        };
    },

    props: {
        circuit: {
            type: Object as PropType<Circuit>,
            required: false,
        },
    },

    methods: {
        async submitForm() {
            const data = {
                circuit_id: this.circuit?._id,
                name: this.name,
                description: this.description,
                logo: this.logo,
                web_site: this.web_site,
                contact: this.contact,

            }

            await competitionStore().addSponsor(data);

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
