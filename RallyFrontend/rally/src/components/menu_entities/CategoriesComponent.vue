<template>
    <v-breadcrumbs class="breadcrumb">
        <div class="item">
            <label class="breadcrumbLabel">Competencia:</label>
            <v-autocomplete v-model="selectedCompetition" :items="competitions" item-text="name" return-object class="mx-3"
                style="max-width: 300px; height: 45px" dense outlined dark color="#fff"
                @change="handleSelectedCompetition"></v-autocomplete>
        </div>

        <div class="item">
            <label class="breadcrumbLabel">Circuito:</label>
            <v-autocomplete v-model="selectedCircuit" :items="circuits" item-text="name" return-object class="mx-3"
                style="max-width: 300px; height: 45px" dense outlined dark color="#fff"
                @change="handleSelectedCircuit"></v-autocomplete>
        </div>
    </v-breadcrumbs>

    <AdminMenuItemHeader header_title="Categorias" :data="categories" :placeholder="'Busque alguna categoria:'"
        @input_name="handleInput" />

    <NewEntityButton :button_title="'Crear categoria'" @showForm="showForm" />

    <div class="container grid-container">
        <div v-if="isFormVisible" class="overlay">
            <NewCategory @close="hideForm" :circuit="selectedCircuit" />
        </div>

        <div class="box grid-item" v-for="(category, index) in paginatedCategories" :key="category._id">
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

    <v-pagination v-model="currentPage" :length="numberOfPages" :total-visible="5"></v-pagination>
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
        const itemsPerPage = ref(5);
        const currentPage = ref(1);

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

        const paginatedCategories = computed(() => {
            const start = (currentPage.value - 1) * itemsPerPage.value;
            const end = start + itemsPerPage.value;
            return filteredCategories.value.slice(start, end);
        });

        const numberOfPages = computed(() => {
            return Math.ceil(filteredCategories.value.length / itemsPerPage.value);
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
            handleInput,
            paginatedCategories,
            numberOfPages,
            currentPage
        };
    },
};
</script>
