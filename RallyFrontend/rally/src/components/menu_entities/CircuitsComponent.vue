<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
  <v-toolbar class="section-header" :elevation="8" density="compact" dense floating>
    <h4>Competencia:</h4>
    <v-autocomplete v-model="selectedCompetitionName" :items="competitions.map((competition: any) => competition.name)" 
      item-text="name" item-value="name" return-object append-icon="mdi-magnify" @change="handleSelectedCompetition" density="compact"
      hide-details single-line class="ma-6 ml-2" placeholder="Seleccione una competencia" color="light-blue lighten-2"
      variant="solo" clearable></v-autocomplete>
  </v-toolbar>
  <AdminMenuItemHeader header_title="Circuitos" :data="circuits" :placeholder="'Busque algún circuito:'"
    @input_name="handleInput" />

  <NewEntityButton :button_title="'Crear circuito'" @click="showForm" />

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
    <div class="box" v-for="(circuit, index) in paginatedCircuits" :key="index">
      <span>
        <h2>{{ circuit.name }}</h2>
        <ActionsForEntity @deleteItem="deleteCircuit(index)" @editItem="editCircuit(circuit)" />
      </span>

      <div class="info-element">
        <h2>Descripción</h2>
        <p>{{ circuit.description }}</p>
      </div>

      <div class="info-element">
        <h2>Longitud</h2>
        <p>{{ circuit.track_length }} km</p>
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

  <v-dialog v-model="isFormVisible" persistent max-width="500px">
    <circuit-form :circuit="selectedCircuit" :competition_id="selectedCompetition?._id || ''" @close="hideForm"
      v-if="isFormVisible" />
  </v-dialog>
</template>

<script lang="ts">
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import CircuitForm from "./floating-forms/CircuitForm.vue";
import LinkWithAnimation from "@/components/menu_entities/fragments/LinkWithAnimation.vue";
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import { createUUID } from '@/helpers/uniqueIdGenerator.js';
import { MdTwoToneNavigateBefore, MdTwoToneNavigateNext } from '@kalimahapps/vue-icons';
import type { Circuit, Competition } from '@/interfaces/Interfaces';
import { onMounted, ref, computed, toRef } from 'vue';
import { competitionStore } from '@/stores/competitionStore';
import { usePagination } from '@/utils/pagination';

export default {
  name: 'CircuitsComponent',
  components: {
    AdminMenuItemHeader,
    CircuitForm,
    ActionsForEntity,
    LinkWithAnimation,
    NewEntityButton,
    MdTwoToneNavigateBefore,
    MdTwoToneNavigateNext,
  },

  setup() {
    const isFormVisible = ref(false);
    const competitions = ref<Competition[]>([]);
    const circuits = ref<Circuit[]>([]);
    const selectedCompetition = ref<Competition>();
    const selectedCompetitionName = ref('');
    const selectedCircuit = ref<Circuit | null>(null);
    const selectedCircuitName = ref('');
    const currentPage = ref(1);
    const itemsPerPage = ref(5);



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
      const circuit = circuitsRef.value[index];
      if (circuit) {
        await competitionStore().deleteCircuit(index);
        circuits.value = competitionStore().circuits;
      }
    };

    const editCircuit = (circuit: Circuit) => {
      selectedCircuit.value = circuit;
      competitionStore().fetchCircuits();
      isFormVisible.value = true;
    };

    const filteredCircuits = computed(() => {
      if (!selectedCircuitName.value) {
        return circuits.value;
      }

      return circuits.value.filter((circuit) =>
        circuit.name.toLowerCase().includes(selectedCircuitName.value.toLowerCase())
      );
    });

    const circuitsRef = toRef(filteredCircuits, 'value');

    const { paginatedData: paginatedCircuits, numberOfPages, goToNextPage, goToPreviousPage } = usePagination(
      itemsPerPage,
      circuitsRef,
      currentPage
    );

    onMounted(async () => {
      competitions.value = competitionStore().competitions;
      if (competitions.value.length > 0) {
        selectedCompetition.value = competitions.value[0];
        selectedCompetitionName.value = competitions.value[0].name;
        await competitionStore().getCircuitsByCompetitionID(competitions.value[0]._id);
        circuits.value = competitionStore().circuits;
      }
    });

    return {
      isFormVisible,
      circuits: circuits.value,
      competitions,
      selectedCompetitionName,
      selectedCompetition,
      selectedCircuit,
      showForm,
      hideForm,
      handleSelectedCompetition,
      handleInput,
      deleteCircuit,
      editCircuit,
      paginatedCircuits,
      currentPage,
      numberOfPages,
      goToNextPage,
      goToPreviousPage,
    };
  },
};
</script>
