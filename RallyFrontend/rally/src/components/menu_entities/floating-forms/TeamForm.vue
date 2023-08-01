<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
    <v-card>
        <v-card-title class="d-flex justify-center align-center">
            <h2>Agregar equipo</h2>
            <FlFilledPeopleTeam class="header_icon" />
        </v-card-title>
        <v-card-text>

            <form @submit.prevent="submitForm">
                <label for="name">Nombre:</label>
                <v-text-field variant="solo" type="text" id="name" v-model="name"
                    placeholder="Ingrese el nombre"></v-text-field>


                <label for="car_number">Número del vehículo:</label>
                <v-text-field variant="solo" type="number" id="car_number" v-model="carNumber" v-numeric
                    placeholder="Ingrese el número del vehículo"> </v-text-field>


                <label for="driver">Conductor:</label>
                <v-autocomplete variant="solo" v-model="selectedDriverName"
                    :items="competitors.map((competitor: any) => competitor.name)" item-text="name" item-value="id"
                    return-object placeholder="Escoge un conductor o agrega uno nuevo" />
                <NewEntityButton :button_title="'Nuevo conductor'" @showForm="showNewDriverForm"
                    style="align-self: center; margin: 0%;" />
                <v-dialog v-model="isDriverFormVisible" persistent max-width="600px">
                    <competitor-form v-if="isDriverFormVisible" :competitor_role="'driver'" :title="'conductor'"
                        @new_competitor="handleNewDriver" @close="hideNewDriverForm" />
                </v-dialog>


                <label for="copilot">Copiloto:</label>
                <v-autocomplete variant="solo" v-model="selectedCopilotName"
                    :items="competitors.map((competitor: any) => competitor.name)" item-text="name" item-value="id"
                    return-object placeholder="Escoge un copiloto o agrega uno nuevo" />
                <NewEntityButton :button_title="'Nuevo copiloto'" @showForm="showNewCopilotForm"
                    style="align-self: center; margin: 0%;" />
                <v-dialog v-model="isCopilotFormVisible" persistent max-width="600px">
                    <competitor-form v-if="isCopilotFormVisible" :competitor_role="'copilot'" :title="'copiloto'"
                        @new_competitor="handleNewCopilot" @close="hideNewCopilotForm" />
                </v-dialog>

            </form>
        </v-card-text>

        <v-card-actions>
            <Actions @cancel="closeForm" @accept="showConfirmationDialog = true" />
        </v-card-actions>

        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
            :dialog="'¿Seguro que deseas crear un nuevo equipo?'" @cancel="closeConfirmation" />


    </v-card>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import type { Category, Competitor, Team } from "@/interfaces/Interfaces";
import CompetitorForm from "./CompetitorForm.vue"
import { competitionStore } from "@/stores/competitionStore";
import { FlFilledPeopleTeam } from "@kalimahapps/vue-icons";
import CategoryForm from './CategoryForm.vue';

export default defineComponent({
    components: { ConfirmationDialog, Actions, NewEntityButton, CompetitorForm, FlFilledPeopleTeam },
    name: 'TeamForm',
    props: {
        category: {
            type: Object as () => Category | null,
            required: false,
        },
        team: {
            type: Object as () => Team | null,
            required: false,
        },
    },
    setup(props, { emit }) {
        const showConfirmationDialog = ref(false);
        const isDriverFormVisible = ref(false);
        const isCopilotFormVisible = ref(false);
        const competitors = ref<Competitor[]>([]);
        const name = ref('');
        const carNumber = ref(0);
        const selectedDriverName = ref('');
        const selectedCopilotName = ref('');
        const driver = ref<Competitor>();
        const copilot = ref<Competitor>();

        onMounted(async () => {
            competitors.value = await competitionStore().fetchCompetitors();
        });

        const submitForm = async () => {

            const team = {
                name: name.value,
                car_number: carNumber.value,
                driver_id: competitors.value.find((competitor: Competitor) => competitor.name === selectedDriverName.value)?._id,
                copilot_id: competitors.value.find((competitor: Competitor) => competitor.name === selectedCopilotName.value)?._id,
            };

            alert(JSON.stringify(team));

            const createdTeam: Team = await competitionStore().addTeam(team);
            //Update the category so that its participantTeamsIds Array (empty) pushes the new team created id

            let updated_category = { ...props.category };  
            updated_category.participantTeamsIds = updated_category.participantTeamsIds?.concat(createdTeam._id);

            await competitionStore().putCategory(props.category?._id || '', updated_category);

            closeConfirmation();
            emit('close');
            emit('updated_category');
        };

        const closeForm = () => {
            emit('close');
        };

        const showNewDriverForm = () => {
            isDriverFormVisible.value = true;
        };

        const hideNewDriverForm = () => {
            isDriverFormVisible.value = false;
        };

        const showNewCopilotForm = () => {
            isCopilotFormVisible.value = true;
        };

        const hideNewCopilotForm = () => {
            isCopilotFormVisible.value = false;
        };

        const handleNewDriver = (newDriver: Competitor) => {
            driver.value = newDriver;
        };

        const handleNewCopilot = (newCopilot: Competitor) => {
            copilot.value = newCopilot;
        };

        const closeConfirmation = () => {
            showConfirmationDialog.value = false;
        };

        return {
            showConfirmationDialog,
            isDriverFormVisible,
            isCopilotFormVisible,
            competitors,
            name,
            carNumber,
            driver,
            copilot,
            submitForm,
            closeForm,
            showNewDriverForm,
            hideNewDriverForm,
            showNewCopilotForm,
            hideNewCopilotForm,
            handleNewDriver,
            handleNewCopilot,
            selectedDriverName,
            selectedCopilotName,
            closeConfirmation
        };
    }
})
</script>
