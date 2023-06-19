<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">
        <span class="header">
            <h2>Crear categoria</h2>
            <UnPathfinderUnite class="header_icon" />
        </span>

        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" placeholder="Ingrese el nombre">
            </div>

            <div class="field">
                <label for="description">Descripción:</label>
                <input type="text" id="description" v-model="description" placeholder="Ingrese la descripción">
            </div>
        </form>

        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear una nueva categoria?'" @cancel="closeConfirmation" />

    </div>
</template>

<script lang="ts">

import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";

import type { Circuit} from "../interfaces/Interfaces";
import type { PropType } from "vue";
import { competitionStore } from "@/stores/competitionStore";


export default {
    components: { Actions, ConfirmationDialog },
    name: 'NewCategory',
    data() {
        return {
            showConfirmationDialog: false,
            name: '',
            description: '',
            track_length: '',
            location: '',
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
                winning_team: '',
                participantTeamsIds: [],
            }

            await competitionStore().addCategory(data);
            
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
