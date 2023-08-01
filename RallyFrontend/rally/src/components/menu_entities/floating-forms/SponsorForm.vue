<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <v-card>
        <v-card-title class="d-flex justify-center align-center">
            <h2>Agregar sponsor</h2>
            <CaLocationCompanyFilled class="header_icon" />
        </v-card-title>
        <v-card-text>
            <form @submit.prevent="submitForm">

                <label for="name">Nombre:</label>
                <v-text-field type="text" id="name" v-model="name" placeholder="Ingrese el nombre" variant="solo-filled">
                </v-text-field>

                <label for="description">Descripción:</label>
                <v-textarea v-model="description" placeholder="Ingrese la descripción" variant="solo-filled"></v-textarea>


                <label for="logo" prepend-icon="mdi-camera">Logo</label>
                <ImagePicker @imageSelected="handleImageSelected" variant="solo-filled"></ImagePicker>


                <label for="web_site_url">Sitio Web (URL):</label>
                <v-textarea type="text" id="web_site_url" v-model="web_site" placeholder="Ingrese la URL del sitio web"
                    variant="solo-filled"></v-textarea>


                <label for="contact">Contacto:</label>
                <v-textarea type="text" id="contact" v-model="contact" placeholder="Ingrese un contacto"
                    variant="solo-filled"></v-textarea>

            </form>
        </v-card-text>

        <v-card-actions>
            <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        </v-card-actions>

        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear un nuevo sponsor ?'" @cancel="closeConfirmation" />
    </v-card>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ImagePicker from "@/components/menu_entities/floating-forms/fragments/ImagePicker.vue";
import { CaLocationCompanyFilled } from "@kalimahapps/vue-icons";
import { apiService } from '@/services/apiService';
import { competitionStore } from '@/stores/competitionStore';
import type { PropType } from 'vue';
import type { Circuit, Sponsor } from '@/interfaces/Interfaces';


export default {

    components: { VueDatePicker, Actions, ImagePicker, ConfirmationDialog, CaLocationCompanyFilled },
    name: 'SponsorForm',

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
