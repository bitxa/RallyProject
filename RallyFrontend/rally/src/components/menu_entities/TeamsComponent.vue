<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <v-toolbar class="section-header" :elevation="8" density="compact" dense floating style="width: 98%;">.
        <h4>Competencia:</h4>
        <v-autocomplete v-model="selectedCompetitionName" :items="competitions.map((competition: any) => competition.name)"
            item-text="name" item-value="name" return-object append-icon="mdi-slash-forward"
            @change="handleSelectedCompetition" density="compact" hide-details single-line class="ma-6 ml-2"
            placeholder="Seleccione una competencia" color="light-blue lighten-2" variant="solo" clearable></v-autocomplete>

        <h4>Circuito:</h4>
        <v-autocomplete v-model="selectedCircuitName" :items="circuits.map((circuit: any) => circuit.name)" item-text="name"
            return-object @change="handleSelectedCircuit" append-icon="mdi-slash-forward" density="compact" hide-details
            single-line class="ma-6 ml-2" placeholder="Seleccione una competencia" color="light-blue lighten-2"
            variant="solo" clearable></v-autocomplete>


        <h4>Categoria:</h4>
        <v-autocomplete v-model="selectedCategoryName" :items="categories.map((category: any) => category.name)"
            item-text="name" return-object density="compact" hide-details single-line class="ma-6 ml-2"
            color="light-blue lighten-2" variant="solo" placeholder="Seleccione una categoria" clearable
            @change="handleSelectedCategory"></v-autocomplete>

    </v-toolbar>

    <AdminMenuItemHeader header_title="Equipos" :data="[]" :placeholder="'Busque algún equipo:'" />

    <v-row justify="center" align="center">
        <v-col cols="auto">
            <NewEntityButton :button_title="'Crear equipo'" @showForm="showForm" />
        </v-col>
        <v-col cols="auto">
            <NewEntityButton :button_title="'Asignar equipo'" @showForm="isTeamAsignmentVisible = true" />
        </v-col>
    </v-row>
    <div class="pagination-container">
        <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button">
            <MdTwoToneNavigateBefore />
        </button>
        <v-pagination v-model="currentPage" :length="numberOfPages" :total-visible="5"
            class="pagination-numbers"></v-pagination>
        <button @click="goToNextPage" :disabled="currentPage === numberOfPages" class="pagination-button">
            <MdTwoToneNavigateNext />
        </button>
    </div>

    <div v-if="teams.length === 0" class="no-data-message">
        <h3>No has asignado ningún equipo a esta categoria aún..</h3>
        <p>Agrega o asigna equipos presionando en los botones a arriba.</p>
    </div>
    <div class="container">

        <div class="box" v-for="(team, index) in paginatedTeams" :key="index">

            <span>
                <h2>{{ team.name }}</h2>
                <ActionsForEntity @deleteItem="deleteTeam(index)" @editItem="editTeam(team)" />
            </span>

            <div class="info-element">
                <h2>Número del vehículo</h2>
                <p>{{ team.car_number }}</p>
            </div>

            <div class="info-element">
                <h2>Conductor:</h2>
                <p>{{ team.driver?.name ?? 'Sin conductor' }}</p>
            </div>

            <div class="info-element">
                <h2>Copiloto:</h2>
                <p>{{ team.copilot?.name ?? 'Sin copiloto' }}</p>
            </div>
        </div>
    </div>

    <v-dialog v-model="isFormVisible" persistent max-width="500px">
        <team-form :category="selectedCategory" @close="hideForm" v-if="isFormVisible" />
    </v-dialog>

    <v-dialog v-model="isTeamAsignmentVisible" persistent max-width="500px">
        <v-card>
            <v-card-title>Selecciona un equipo</v-card-title>
            <v-divider></v-divider>
            <v-card-text>
                <v-select color="light-blue lighten-2" variant="solo" v-model="selectedTeamForAssignment"
                    :items="teams.map((team: any) => team.name)" placeholder="Equipo" item-text="name" item-value="_id"
                    return-object>
                    <template v-slot:selection="{ item, index }">
                        <v-chip>
                            <span>{{ item.title }}</span>
                        </v-chip>
                    </template>
                </v-select>
            </v-card-text>
            <v-card-actions class="d-flex align-center justify-center">
                <v-btn variant="outlined" color="success" prepend-icon="mdi-content-save-move"
                    @click="isTeamAsignmentVisible = false">
                    Guardar
                </v-btn>
                <v-btn variant="outlined" color="error" prepend-icon="mdi-cancel" @click="isTeamAsignmentVisible = false">
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import TeamForm from '@/components/menu_entities/floating-forms/TeamForm.vue';

import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import { usePagination } from '@/utils/pagination';
import { computed, onMounted, ref, toRef, watchEffect } from 'vue';
import type { Circuit, Competition, Category, Team } from '@/interfaces/Interfaces';

import { competitionStore } from '@/stores/competitionStore';

export default {
    name: 'TeamsComponent',
    components: { AdminMenuItemHeader, NewEntityButton, TeamForm, ActionsForEntity },

    setup() {
        const itemsPerPage = ref(10);
        const currentPage = ref(1);
        const isFormVisible = ref(false);
        const categories = ref<Category[]>([]);
        const competitions = ref<Competition[]>([]);
        const circuits = ref<Circuit[]>([]);
        const teams = ref<Team[]>([]);
        const selectedCompetitionName = ref('');
        const selectedCircuitName = ref('');
        const selectedCircuit = ref<Circuit>();
        const selectedCompetition = ref<Competition>();
        const selectedCategoryName = ref('');
        const selectedCategory = ref<Category>();
        const selectedTeamName = ref<string>('');
        const selectedTeam = ref<Team | null>(null);
        const isTeamAsignmentVisible = ref(false);
        const selectedTeamForAssignment = ref<Team | null>(null);


        const showForm = () => {
            isFormVisible.value = true;
        };

        const hideForm = () => {
            isFormVisible.value = false;
        };

        const deleteTeam = async (index: number) => {
            await competitionStore().deleteTeam(index);
            teams.value = competitionStore().teams;
        };

        const handleSelectedCompetition = async () => {
            selectedCompetition.value = competitions.value.find(item => item.name === selectedCompetitionName.value);
            if (selectedCompetition.value) {
                await competitionStore().getCircuitsByCompetitionID(selectedCompetition.value._id || '');
                circuits.value = competitionStore().circuits;
                selectedCircuitName.value = circuits.value[0]?.name || '';
                selectedCircuit.value = circuits.value[0];
                handleSelectedCircuit();
            }
        };

        const handleSelectedCircuit = async () => {
            selectedCircuit.value = circuits.value.find(circuit => circuit.name === selectedCircuitName.value);
            if (selectedCircuit.value) {
                await competitionStore().getCategoriesByCircuitID(selectedCircuit.value._id || '');
                categories.value = competitionStore().categories;
                selectedCategoryName.value = categories.value[0]?.name || '';
                selectedCategory.value = categories.value[0];
                handleSelectedCategory();
            }

        };

        const handleSelectedCategory = async () => {
            selectedCategory.value = categories.value.find(category => category.name === selectedCategoryName.value);
            if (selectedCategory.value) {
                await competitionStore().getCategoryParticipantTeamsByIds(selectedCategory.value.participantTeamsIds);
                teams.value = competitionStore().teams;
            }
        };

        const filteredTeams = computed(() => {
            if (!selectedTeamName.value) {
                return teams.value;
            }


            return teams.value.filter((team) =>
                team.name.toLowerCase().includes(selectedTeamName.value.toLowerCase() ?? '')
            );
        });



        const teamsRef = toRef(filteredTeams, 'value');

        const { paginatedData: paginatedTeams, numberOfPages, goToNextPage, goToPreviousPage } = usePagination(
            itemsPerPage,
            teamsRef,
            currentPage
        );


        onMounted(async () => {
            competitions.value = competitionStore().competitions;
            if (competitions.value.length > 0) {
                selectedCompetitionName.value = competitions.value[0].name;
                await handleSelectedCompetition();
            }

            await competitionStore().fetchTeams();
            teams.value = competitionStore().teams;
        });

        watchEffect(() => {
            if (selectedCircuitName.value) {
                handleSelectedCircuit();
            }
        });


        const editTeam = async (team: Team) => {
            selectedTeam.value = team;
            isFormVisible.value = true;
            await competitionStore().fetchTeams();
        };

        return {
            isFormVisible,
            showForm,
            hideForm,
            categories,
            competitions,
            circuits,
            teams: filteredTeams,
            isTeamAsignmentVisible,
            selectedTeamForAssignment,
            selectedCompetitionName,
            selectedCircuitName,
            selectedCircuit,
            selectedCompetition,
            selectedCategory,
            selectedCategoryName,
            deleteTeam,
            handleSelectedCompetition,
            handleSelectedCircuit,
            handleSelectedCategory,
            paginatedTeams,
            editTeam,
            numberOfPages,
            goToNextPage,
            goToPreviousPage,
            currentPage,
        };
    }
}




</script>

