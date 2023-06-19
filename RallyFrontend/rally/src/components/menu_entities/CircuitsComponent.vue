<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <v-breadcrumbs class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <input type="text" v-model="selectedCompetitionName" list="competitionsForCircuits-list" class="breadcrumbInput"
                @input="handleSelectedCompetition" @change="handleSelectedCompetition">

            <datalist id="competitionsForCircuits-list">
                <option v-for="competition in competitions" :key="competition._id"  :value="competition.name">{{ competition.name }}</option>
            </datalist>
        </div>
    </v-breadcrumbs>

    <AdminMenuItemHeader header_title="Circuitos" :data="circuits" :placeholder="'Busque algún circuito:'"
        @input_name="handleInput" />

    <NewEntityButton :button_title="'Crear circuito'" @showForm="showForm" />


    <div class="container">
        <div v-if="isFormVisible" class="overlay">
            <NewCircuit @close="hideForm" :competition="selectedCompetition" />
        </div>

        <div class="box" v-for="(circuit, index) in filteredCircuits" :key="index">
            <span>
                <h2>{{ circuit.name }}</h2>
                <ActionsForEntity @deleteItem="deleteCircuit(index)" />

            </span>

            <div class="info-element">
                <h2>Descripción</h2>
                <p>{{ circuit.description }}</p>
            </div>

            <div class="info-element">
                <h2>Longitud</h2>
                <p>{{ circuit.track_lenght }} km</p>
            </div>

            <div class="info-element">
                <h2>Locación</h2>
                <p>{{ circuit.location }}</p>
            </div>

            <div class="info-element">
                <h2>Sponsors</h2>
                <LinkWithAnimation :message="'Ver Sponsors'" />
            </div>

            <div class="info-element">
                <h2>Categorias</h2>
                <LinkWithAnimation :message="'Categorias'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import NewCircuit from "@/components/menu_entities/floating-forms/NewCircuit.vue";
import LinkWithAnimation from "@/components/menu_entities/fragments/LinkWithAnimation.vue";
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import {createUUID } from '@/helpers/uniqueIdGenerator.js';

import type { Circuit, Competition } from './interfaces/Interfaces';
import { onMounted, ref, computed } from 'vue';
import { competitionStore } from '@/stores/competitionStore';
import type { PropType } from 'vue';

export default {
    name: 'CompetencesComponent',
    components: {
        AdminMenuItemHeader,
        NewCircuit,
        ActionsForEntity,
        LinkWithAnimation,
        NewEntityButton
    },

    setup() {
        const isFormVisible = ref(false);
        const competitions = ref<Competition[]>([]);
        const circuits = ref<Circuit[]>([]);
        const selectedCompetitionName = ref('');
        const selectedCircuitName = ref('');
        const selectedCompetition = ref<Competition>();


        const listID = computed(() => createUUID());

        const showForm = () => {
            isFormVisible.value = true;
        };

        const hideForm = () => {
            isFormVisible.value = false;
        };

        const handleInput = (name: string) => {
            selectedCircuitName.value = name;
        };

        const handleSelectedCompetition = async () => {
            selectedCompetition.value = competitions.value.find(item => item.name === selectedCompetitionName.value);
            if (selectedCompetition.value) {
                await competitionStore().getCircuitsByCompetitionID(selectedCompetition.value._id || '');
                circuits.value = competitionStore().circuits;
                selectedCircuitName.value = circuits.value[0]?.name || '';
            }
        };


        const deleteCircuit = async (index: number) => {
            await competitionStore().deleteCircuit(index);
            circuits.value = competitionStore().circuits;
        };

        const filteredCircuits = computed(() => {
            if (!selectedCircuitName.value) {
                return circuits.value;
            }

            return circuits.value.filter((circuit) =>
                circuit.name.toLowerCase().includes(selectedCircuitName.value?.toLowerCase() ?? '')
            );
        });


        onMounted(async () => {
            competitions.value = competitionStore().competitions;
            
            if (competitions.value.length < 0) {
                return;
            }

            selectedCompetition.value = competitions.value[0];
            selectedCompetitionName.value = competitions.value[0].name;
            await competitionStore().getCircuitsByCompetitionID(competitions.value[0]._id);
            circuits.value = competitionStore().circuits;
        });

        return {
            isFormVisible,
            circuits,
            competitions,
            selectedCompetitionName,
            selectedCompetition,
            showForm,
            hideForm,
            handleSelectedCompetition,
            handleInput,
            deleteCircuit,
            filteredCircuits,
        };
    },
};
</script>

