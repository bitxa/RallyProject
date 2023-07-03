<template>
  <div>
    <AdminMenuItemHeader
      header_title="Competiciones"
      :data="filteredCompetitions"
      :placeholder="'Busque alguna competencia:'"
      @input_name="handleInput"
    />

    <NewEntityButton :button_title="'Crear competencia'" @showForm="showForm" />

    <div class="pagination-container">
      <button @click="goToPreviousPage" :disabled="currentPage === 1" class="pagination-button">
        <MdTwoToneNavigateBefore />
      </button>
      <v-pagination v-model="currentPage" :length="numberOfPages" :total-visible="5" class="pagination-numbers"></v-pagination>

      <button @click="goToNextPage" :disabled="currentPage === numberOfPages" class="pagination-button">
        <MdTwoToneNavigateNext />
      </button>
    </div>

    <div class="container">
      <div v-if="isFormVisible" class="overlay">
        <NewCompetition v-if="isNewCompetition" @close="hideForm" />
        <EditCompetition v-else @close="hideForm" :competition="selectedCompetition" />
      </div>

      <div class="box" v-for="(competition, index) in paginatedCompetitions" :key="index">
        <span>
          <h2>{{ competition.name }}</h2>
          <ActionsForEntity
            @deleteItem="deleteCompetition(index)"
            @editItem="editCompetition(competition)"
          />
        </span>

        <div class="info-element">
          <div class="dates">
            <div class="date">
              <h2>Fecha Inicio</h2>
              <p>{{ formatDate(competition.start_date) }}</p>
            </div>

            <div class="date">
              <h2>Fecha Fin</h2>
              <p>{{ formatDate(competition.start_date) }}</p>
            </div>
          </div>
        </div>

        <div class="info-element">
          <h2>Provincia</h2>
          <p>{{ competition.province }}</p>
        </div>

        <div class="info-element">
          <h2>Descripción</h2>
          <p>{{ competition.description }}</p>
        </div>

        <div class="info-element">
          <h2>Circuitos</h2>
          <LinkWithAnimation :message="'Ver Circuitos'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, toRef, computed } from 'vue';
import type { Competition } from '@/components/menu_entities/interfaces/Interfaces';
import { competitionStore } from '@/stores/competitionStore';
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import CompetitionForm from '@/components/menu_entities/floating-forms/CompetitionForm.vue';
import { MdTwoToneNavigateBefore, MdTwoToneNavigateNext } from '@kalimahapps/vue-icons';
import LinkWithAnimation from '@/components/menu_entities/fragments/LinkWithAnimation.vue';
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import { usePagination } from '@/utils/pagination';

export default {
  name: 'CompetitionComponent',
  components: {
    AdminMenuItemHeader,
    NewEntityButton,
    CompetitionForm,
    ActionsForEntity,
    //icons
    MdTwoToneNavigateBefore,
    MdTwoToneNavigateNext,
  },

  setup() {
    const isFormVisible = ref(false);
    const isNewCompetition = ref(false);
    const competitions = ref<Competition[]>([]);
    const currentPage = ref(1); // This is a ref now
    const itemsPerPage = ref(5); // This is a ref now
    const selectedCompetitionName = ref<string | null>(null);
    const selectedCompetition = ref<Competition | null>(null);

    const showForm = () => {
      isFormVisible.value = true;
      isNewCompetition.value = true;
    };

    const hideForm = () => {
      isFormVisible.value = false;
      selectedCompetition.value = null;
    };

    const handleInput = (name: string) => {
      selectedCompetitionName.value = name;
    };

    const deleteCompetition = async (index: number) => {
      await competitionStore().deleteCompetition(index);
    };

    const editCompetition = (competition: Competition) => {
      selectedCompetition.value = competition;
      isFormVisible.value = true;
      isNewCompetition.value = false;
    };

    const filteredCompetitions = computed(() => {
      if (!selectedCompetitionName.value) {
        return competitions.value;
      }

      const query = selectedCompetitionName.value.toLowerCase();
      return competitions.value.filter(
        (competition) =>
          competition.name.toLowerCase().includes(query) ||
          competition.province.toLowerCase().includes(query)
      );
    });

    const competitionsRef = toRef(filteredCompetitions, 'value'); // Create a reactive reference

    const { paginatedData: paginatedCompetitions, numberOfPages, goToNextPage, goToPreviousPage } = usePagination(
      itemsPerPage,
      competitionsRef,
      currentPage
    );

    const formatDate = (date: any) => {
      if (!date) return '';
      return date.split('T')[0];
    };

    onMounted(async () => {
      competitions.value = await competitionStore().competitions;
    });

    return {
      isFormVisible,
      isNewCompetition,
      filteredCompetitions,
      competitions: filteredCompetitions,
      showForm,
      hideForm,
      handleInput,
      deleteCompetition,
      editCompetition,
      selectedCompetition,
      paginatedCompetitions,
      currentPage,
      numberOfPages,
      goToNextPage,
      goToPreviousPage,
      formatDate,
    };
  },
};
</script>
