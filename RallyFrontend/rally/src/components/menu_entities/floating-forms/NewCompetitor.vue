<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">
        <span class="header">
            <h2>Agregar {{ title }}</h2>
            <UnPathfinderUnite class="header_icon" />
        </span>

        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" placeholder="Ingrese el nombre">
            </div>

            <div class="field">
                <label for="age">Edad:</label>
                <input type="number" v-age id="age" v-model="age" placeholder="Ingrese la edad">
            </div>

            <div class="field">
                <label for="identification">Identificación (cédula)</label>
                <input type="text" id="identification" v-model="identification" placeholder="Ingrese la cédula">
            </div>

            <div class="field">
                <label for="blood_type">Tipo sangre:</label>
                <input type="text" id="blood_type" v-model="bloodType" placeholder="Ingrese el tipo de sangre">
            </div>

            <div class="field">
                <label for="emergency_contact">Contacto emergencia:</label>
                <input type="text" id="emergency_contact" v-model="emergencyContact"
                    placeholder="Ingrese el contacto de emergencia">
            </div>

            <div class="field">
                <label for="province">Provincia:</label>
                <input type="text" id="province" v-model="province" placeholder="Escoga la provincia">
            </div>

            <div class="field">
                <label for="city">Ciudad:</label>
                <input type="text" id="city" v-model="city" placeholder="Escoga la ciudad">
            </div>
        </form>
        
        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear un nuevo competidor ?'" @cancel="closeConfirmation" />

    </div>
</template>

<script lang="ts">
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import { competitionStore } from '@/stores/competitionStore';
import type { Competitor } from '../interfaces/Interfaces';



export default {
    components: { Actions, ConfirmationDialog },
    name: 'NewCompetitor',

    data() {
        return {
            showConfirmationDialog: false,
            name: '',
            age: 0,
            identification: '',
            bloodType: '',
            emergencyContact: '',
            province: '',
            city: '',
            role: this.competitor_role,
        };
    },

    props: {
        competitor_role: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },
    },
    methods: {
        async submitForm() {
            const newCompetitor = {
                name: this.name,
                age: this.age,
                identification: this.identification,
                blood_type: this.bloodType,
                emergency_contact: this.emergencyContact,
                province: this.province,
                city: this.city,
                role: this.role
            }

            const competitorCreated: Competitor = await competitionStore().addCompetitor(newCompetitor);
            this.$emit('close');
            this.$emit('new_competitor', competitorCreated);
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
