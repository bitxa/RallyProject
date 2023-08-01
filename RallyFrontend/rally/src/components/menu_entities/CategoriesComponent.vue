<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
    <v-toolbar class="section-header" :elevation="8" density="compact" dense floating>

        <h4>Competencia:</h4>
        <v-autocomplete v-model="selectedCompetitionName" :items="competitions.map((competition: any) => competition.name)"
            item-text="name" item-value="name" return-object append-icon="mdi-slash-forward"
            @change="handleSelectedCompetition" density="compact" hide-details single-line class="ma-6 ml-2"
            placeholder="Seleccione una competencia" color="light-blue lighten-2" variant="solo" clearable></v-autocomplete>

        <h4>Circuito:</h4>
        <v-autocomplete v-model="selectedCircuitName" :items="circuits.map((circuit: any) => circuit.name)" item-text="name"
            return-object @change="handleSelectedCircuit" density="compact" hide-details single-line class="ma-6 ml-2"
            placeholder="Seleccione una competencia" color="light-blue lighten-2" variant="solo" clearable></v-autocomplete>
    </v-toolbar>

    <AdminMenuItemHeader header_title="Categorias" :data="paginatedCategories" :placeholder="'Busque alguna categoria:'"
        @input_name="handleInput" />

    <NewEntityButton :button_title="'Crear categoria'" @click="showForm" />

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
    <div class="container">
        <div class="box" v-for="(category, index) in paginatedCategories" :key="index">
            <span>
                <h2>{{ category.name }}</h2>
                <ActionsForEntity @deleteItem="deleteCategory(index)" @editItem="editCategory(category)" />
            </span>

            <div class="info-element">
                <h2>Descripción</h2>
                <p>{{ category.description }}</p>
            </div>

            <div class="info-element">
                <h2>Equipo ganador</h2>
                <p>{{ category.winning_team || 'Aún no hay resultados' }}</p>
            </div>

            <div class="info-element">
                <h2>Equipos participantes</h2>
                <LinkWithAnimation :message="'Ver equipos participantes'" />
            </div>
        </div>
    </div>
    <v-dialog v-model="isFormVisible" persistent max-width="500px">
        <category-form :category="selectedCategory" :circuit_id="selectedCircuit?._id || ''" @close="hideForm"
            v-if="isFormVisible" />
    </v-dialog>
</template>
<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import CategoryForm from "@/components/menu_entities/floating-forms/CategoryForm.vue";
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import { MdTwoToneNavigateBefore, MdTwoToneNavigateNext } from '@kalimahapps/vue-icons';
import type { Circuit, Category, Competition } from '@/interfaces/Interfaces';
import { onMounted, ref, computed, toRef, watchEffect } from 'vue';
import { competitionStore } from '@/stores/competitionStore';
import { usePagination } from '@/utils/pagination';
import LinkWithAnimation from '@/components/menu_entities/fragments/LinkWithAnimation.vue';

export default {
    name: 'CategoriesComponent',
    components: {
        AdminMenuItemHeader,
        CategoryForm,
        ActionsForEntity,
        NewEntityButton,
        MdTwoToneNavigateBefore,
        MdTwoToneNavigateNext,
        LinkWithAnimation
    },

    setup() {
        const itemsPerPage = ref(10);
        const currentPage = ref(1);
        const categories = ref<Category[]>([]);
        const competitions = ref<Competition[]>([]);
        const circuits = ref<Circuit[]>([]);
        const selectedCompetition = ref<Competition>();
        const selectedCompetitionName = ref('');
        const selectedCircuit = ref<Circuit>();
        const selectedCircuitName = ref('');
        const selectedCategoryName = ref('');
        const selectedCategory = ref<Category>();
        const isFormVisible = ref(false);

        const showForm = () => isFormVisible.value = true;
        const hideForm = () => isFormVisible.value = false;
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

        const deleteCategory = async (index: number) => {
            const category = categoriesRef.value[index];
            if (category) {
                await competitionStore().deleteCategory(index);
                categories.value = competitionStore().categories;
            }
        };

        const categoriesRef = toRef(filteredCategories, 'value');

        const editCategory = (category: Category) => {
            selectedCategory.value = category;
            isFormVisible.value = true;
            competitionStore().fetchCategories();
        };

        const { paginatedData: paginatedCategories, numberOfPages, goToNextPage, goToPreviousPage } = usePagination(
            itemsPerPage,
            categoriesRef,
            currentPage
        );

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
            circuits: circuits.value,
            competitions,
            selectedCompetition,
            selectedCompetitionName,
            selectedCategory,
            selectedCategoryName,
            selectedCircuit,
            selectedCircuitName,
            showForm,
            hideForm,
            handleSelectedCompetition,
            handleSelectedCircuit,
            handleInput,
            deleteCategory,
            editCategory,
            paginatedCategories,
            currentPage,
            numberOfPages,
            goToNextPage,
            goToPreviousPage,
        };
    },
};
</script>
  