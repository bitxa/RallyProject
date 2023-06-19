<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <div class="popup">

        <span class="header">
            <h2>Agregar equipo</h2>
            <UnPathfinderUnite class="header_icon" />
        </span>

        <form @submit.prevent="submitForm">
            <div class="field">
                <label for="name">Nombre:</label>
                <input type="text" id="name" v-model="name" placeholder="Ingrese el nombre">
            </div>

            <div class="field">
                <label for="car_number">Número del vehículo:</label>
                <input type="number" id="car_number" v-model="carNumber" v-numeric
                    placeholder="Ingrese el número del vehículo">
            </div>

            <div class="field">
                <label for="driver">Conductor:</label>
                <input type="text" id="driver" v-model="driverName" placeholder="Escoga un conductor o agregue un nuevo">
                <NewEntityButton :button_title="'Nuevo conductor'" @showForm="showNewDriverForm"
                    style="align-self: center;  margin: 0%;" />

                <div v-if="isDriverFormVisible" class="overlay">
                    <NewCompetitor :competitor_role="'driver'" :title="'conductor'" @new_competitor="handleNewDriver"
                        @close="hideNewDriverForm" />
                </div>
            </div>

            <div class="field">
                <label for="copilot">Copiloto:</label>
                <input type="text" id="copilot" v-model="copilotName" placeholder="Escoga un copiloto o agregue un nuevo">
                <NewEntityButton :button_title="'Nuevo copiloto'" @showForm="showNewCopilotForm"
                    style="align-self: center;  margin: 0%;" />

                <div v-if="isCopilotFormVisible" class="overlay">
                    <NewCompetitor :competitor_role="'copilot'" :title="'copiloto'" @new_competitor="handleNewCopilot"
                        @close="hideNewCopilotForm" />
                </div>
            </div>
        </form>


        <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas agrear una nueva competición ?'" @cancel="closeConfirmation" />

    </div>
</template>

<script lang="ts">
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import type { Category, Competitor, Team } from "../interfaces/Interfaces";
import type { PropType } from "vue";
import NewCompetitor from "./NewCompetitor.vue"
import { competitionStore } from "@/stores/competitionStore";

export default {
    components: { ConfirmationDialog, Actions, NewEntityButton, NewCompetitor },
    name: 'NewTeam',
    props: {
        category: {
            type: Object as PropType<Category>,
            required: false,
        },
    },

    data() {
        return {
            showConfirmationDialog: false,
            isDriverFormVisible: false,
            isCopilotFormVisible: false,
            name: '',
            carNumber: 0,
            driverName: '',
            copilotName: '',
            driver: null as Competitor | null,
            copilot: null as Competitor | null,
        };
    },

    methods: {
        async submitForm() {
            const team = {
                name: this.name,
                car_number: this.carNumber,
                driver_id: this.driver?._id,
                copilot_id: this.copilot?._id,
            };

            const createdTeam: Team = await competitionStore().addTeam(team);
            console.log('CREATED TEAM: ' + JSON.stringify(createdTeam));


            this.category?.participantTeamsIds.push(createdTeam._id);

            console.log('CATEGORY: ' + JSON.stringify(this.category));


            await competitionStore().patchCategory(this.category, this.category?._id || ' ') ;

            this.closeConfirmation();
            this.$emit('close');
            this.$emit('updated_category');

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

        showNewDriverForm() {
            this.isDriverFormVisible = true;
        },

        hideNewDriverForm() {
            this.isDriverFormVisible = false;
        },

        showNewCopilotForm() {
            this.isCopilotFormVisible = true;
        },

        hideNewCopilotForm() {
            this.isCopilotFormVisible = false;
        },

        handleNewDriver(driver: Competitor) {
            this.driver = driver;
        },

        handleNewCopilot(copilot: Competitor) {
            this.copilot = copilot;
        }

    }
}
</script>
