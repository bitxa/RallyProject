<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <div class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <input type="text" v-model="selectedCompetitionName" list="item-list" class="breadcrumbInput"
                @input="handleSelectedCompetition" @change="handleSelectedCompetition">
            <datalist id="item-list">
                <option v-for="competition in competitions" :key="competition._id" :value="competition.name">{{
                    competition.name }}
                </option>
            </datalist>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Circuito:</label>
            <input type="text" v-model="selectedCircuitName" list="circuit-list" class="breadcrumbInput"
                @input="handleSelectedCircuit" @change="handleSelectedCircuit">
            <datalist id="circuit-list">
                <option v-for="circuit in circuits" :key="circuit._id" :value="circuit.name">{{ circuit.name }}</option>
            </datalist>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Categoria:</label>
            <input type="text" v-model="selectedCategoryName" list="category-list" class="breadcrumbInput"
                @select="handleSelectedCategory">
            <datalist id="category-list">
                <option v-for="category in categories" :key="category._id" :value="category.name">{{ category.name }}
                </option>
            </datalist>
        </div>
    </div>

    <AdminMenuItemHeader header_title="Equipos" :data="[]" :placeholder="'Busque algún equipo:'" />
    <NewEntityButton :button_title="'Crear equipo'" @showForm="showForm" />

    <div class="container">
        <div v-if="isFormVisible" class="overlay">
            <NewTeam @close="hideForm" :category="selectedCategory" :updated_category="handleSelectedCategory" />
        </div>

        <div class="box" v-for="(team, index) in teams" :key="team._id">
            <span>
                <h2>{{ team.name }}</h2>    
                <ActionsForEntity @deleteItem="deleteTeam(index)" />
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
                <h2>Copilot:</h2>
                <p>{{ team.copilot?.name ?? 'Sin copiloto' }}</p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewTeam from './floating-forms/NewTeam.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';

import { onMounted, ref, watchEffect } from 'vue';
import type { Category, Circuit, Competition, Team } from './interfaces/Interfaces';
import { competitionStore } from '@/stores/competitionStore';

export default {
    name: 'TeamsComponent',
    components: { AdminMenuItemHeader, NewEntityButton, NewTeam, ActionsForEntity},

    setup() {
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

        const showForm = () => {
            isFormVisible.value = true;
        };

        const hideForm = () => {
            isFormVisible.value = false;
        };

        const deleteTeam = async (index: number) => {
            await competitionStore().deleteTeam(index);
            circuits.value = competitionStore().circuits;
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
                console.log('TEAMS VALUE: ' + teams.value);
                teams.value = competitionStore().teams;
            }
        };

        onMounted(async () => {
            competitions.value = competitionStore().competitions;
            if (competitions.value.length > 0) {
                selectedCompetitionName.value = competitions.value[0].name;
                await handleSelectedCompetition();
            }
        });

        watchEffect(() => {
            if (selectedCircuitName.value) {
                handleSelectedCircuit();
            }
        });

        return {
            isFormVisible,
            showForm,
            hideForm,
            categories,
            competitions,
            circuits,
            teams,
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
        };
    }
}




</script>

