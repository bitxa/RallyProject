<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">

        <form @submit.prevent="submitForm">
            <span class="header">
                <h2>Crear circuito</h2>
                <FaRoad class="header_icon" />
            </span>

            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" placeholder="Ingrese el nombre">
            </div>

            <div class="field">
                <label for="description">Descripción:</label>
                <input type="text" id="description" v-model="description" placeholder="Ingrese la descripción">
            </div>

            <div class="field">
                <label for="track_length">Longitud:</label>
                <input type="number" id="track_length" v-model="track_length" v-numeric placeholder="Km">
            </div>

            <div class="field">
                <label for="location">Locación:</label>
                <input type="text" id="location" v-model="location" placeholder="Ingrese la locación">
            </div>
        </form>

        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear un nuevo circuito?'" @cancel="closeConfirmation" />

    </div>
</template>

<script lang="ts">

import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";

import { competitionStore } from '@/stores/competitionStore';
import type { Competition } from '../interfaces/Interfaces';
import { type PropType } from "vue";

import { FaRoad } from "@kalimahapps/vue-icons";

export default {
    components: { Actions, ConfirmationDialog, FaRoad },
    name: 'NewCompetence',


    props: {
        competition: {
            type: Object as PropType<Competition>,
            required: false,
        },
    },
    data() {
        return {
            showConfirmationDialog: false,
            name: '',
            description: '',
            track_length: '',
            location: '',
        };
    },
    methods: {
        async submitForm() {
            const data = {
                competition_id: this.competition?._id,
                name: this.name,
                description: this.description,
                track_lenght: parseFloat(this.track_length),
                location: this.location
            }

            await competitionStore().addCircuit(data);

            this.$emit('close');
        },

        cancelForm() {
            this.$emit('close');
        },

        restrictToNumeric() { this.track_length = this.track_length.replace(/[^0-9.]/g, '') },

        showConfirmation() {
            this.showConfirmationDialog = true;
        },

        closeConfirmation() {
            this.showConfirmationDialog = false;
        },


    }
}
</script>
ç