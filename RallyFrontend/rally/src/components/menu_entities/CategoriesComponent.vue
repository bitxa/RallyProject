
<template>
    <v-breadcrumbs class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <input type="text" v-model="selectedCompetitionName" list="competitionsForCategory-list" class="breadcrumbInput"
                @input="handleSelectedCompetition" @change="handleSelectedCompetition">
            <datalist id="competitionsForCategory-list">
                <option v-for="competition in competitions" :key="competition._id" :value="competition.name">{{
                    competition.name }}</option>
            </datalist>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Circuito:</label>
            <input type="text" v-model="selectedCircuitName" list="circuitsForCategory-list" class="breadcrumbInput"
                @input="handleSelectedCircuit" @change="handleSelectedCircuit">
            <datalist id="circuitsForCategory-list">
                <option v-for="circuit in circuits" :key="circuit._id" :value="circuit.name">{{ circuit.name }}</option>
            </datalist>
        </div>
    </v-breadcrumbs>

    <AdminMenuItemHeader header_title="Categorias" :data="categories" :placeholder="'Busque alguna categoria:'"
        @input_name="handleInput" />

    <NewEntityButton :button_title="'Crear categoria'" @showForm="showForm" />

    <div class="container">
        <div v-if="isFormVisible" class="overlay">
            <NewCategory @close="hideForm" :circuit="selectedCircuit" />
        </div>

        <div class="box" v-for="(category, index) in filteredCategories" :key="category._id">
            <span>
                <h2>{{ category.name }}</h2>
                <ActionsForEntity @deleteItem="deleteCategory(index)" />
            </span>

            <div class="info-element">
                <h2>Descripción</h2>
                <p>{{ category.description }}</p>
            </div>

            <div class="info-element">
                <h2>Equipos participantes</h2>
                <LinkWithAnimation :message="'Ver equipos participantes'" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import NewCategory from "@/components/menu_entities/floating-forms/NewCategory.vue";
import LinkWithAnimation from "@/components/menu_entities/fragments/LinkWithAnimation.vue";
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import { createUUID } from '@/helpers/uniqueIdGenerator.js';

import type { Category, Competition, Circuit } from './interfaces/Interfaces';
import { onMounted, ref, computed, watchEffect } from 'vue';
import { competitionStore } from '@/stores/competitionStore';

export default {
    name: 'CategoriesComponent',
    components: {
        AdminMenuItemHeader,
        NewCategory,
        ActionsForEntity,
        LinkWithAnimation,
        NewEntityButton
    },

    setup() {
        const isFormVisible = ref(false);
        const categories = ref<Category[]>([]);
        const competitions = ref<Competition[]>([]);
        const circuits = ref<Circuit[]>([]);
        const selectedCompetitionName = ref('');
        const selectedCircuitName = ref('');
        const selectedCategoryName = ref('');
        const selectedCircuit = ref<Circuit | undefined>();
        const selectedCompetition = ref<Competition | undefined>();

        const showForm = () => {
            isFormVisible.value = true;
        };

        const hideForm = () => {
            isFormVisible.value = false;
        };

        const deleteCategory = async (index: number) => {
            await competitionStore().deleteCategory(index);
        };


        const handleInput = (name: string) => {
            selectedCategoryName.value = name;
        };

        const filteredCategories = computed(() => {
            if (!selectedCircuitName.value) {
                return categories.value;
            }

            return categories.value.filter((category) =>
                category.name.toLowerCase().includes(selectedCategoryName.value?.toLowerCase() ?? '')
            );
        });

        const handleSelectedCompetition = async () => {
            selectedCompetition.value = competitions.value.find(item => item.name === selectedCompetitionName.value);
            if (selectedCompetition.value) {
                await competitionStore().getCircuitsByCompetitionID(selectedCompetition.value._id || '');
                circuits.value = competitionStore().circuits;
                selectedCircuitName.value = circuits.value[0]?.name || '';
            }
        };

        const handleSelectedCircuit = async () => {
            selectedCircuit.value = circuits.value.find(circuit => circuit.name === selectedCircuitName.value);
            if (selectedCircuit.value) {
                await competitionStore().getCategoriesByCircuitID(selectedCircuit.value._id || '');
                categories.value = competitionStore().categories;
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
            categories,
            competitions,
            circuits,
            selectedCompetitionName,
            selectedCircuitName,
            selectedCircuit,
            selectedCompetition,
            showForm,
            hideForm,
            handleSelectedCompetition,
            handleSelectedCircuit,
            deleteCategory,
            filteredCategories,
            handleInput
        };
    },
};
</script>

