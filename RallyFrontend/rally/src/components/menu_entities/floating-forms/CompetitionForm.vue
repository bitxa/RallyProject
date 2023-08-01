<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
  <v-card>
    <v-card-title class="d-flex justify-center align-center">
      <h2>{{ isNewCompetition ? 'Crear competencia' : 'Editar competencia' }}</h2>
      <UnPathfinderUnite class="header_icon" />
    </v-card-title>
    <v-card-text>
      <form @submit.prevent="submitForm">
        <label for="name">Nombre:</label>
        <v-text-field variant="solo" type="text" id="name" v-model="competition.name" placeholder="Ingrese el nombre">
        </v-text-field>


        <label for="province">Provincia:</label>
        <v-select variant="solo" v-model="province" :items="provinces" label="Escoga la provincia"></v-select>


        <label for="description">Descripción:</label>
        <v-text-field variant="solo" type="text" id="description" v-model="competition.description"
          placeholder="Ingrese la descripción"> </v-text-field>


        <label for="dates">Fecha Inicio y Fin:</label>
        <VueDatePicker class="date-picker" v-model="date" range placeholder="Escoga las fechas" />

      </form>
    </v-card-text>

    <v-card-actions>
      <Actions @cancel="closeForm" @accept="showConfirmationDialog = true" />
    </v-card-actions>

    <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
      :dialog="isNewCompetition ? '¿Seguro que deseas agregar una nueva competición?' : '¿Seguro que deseas editar la competición?'"
      @cancel="closeConfirmation" />
  </v-card>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import { UnPathfinderUnite } from "@kalimahapps/vue-icons";
import { competitionStore } from '@/stores/competitionStore';

import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";

import { ref, onMounted, computed } from 'vue';

import { useProvincesStore } from '@/stores/provinces';
import type { Competition } from '@/interfaces/Interfaces';

export default {
  name: 'CompetitionForm',
  components: { VueDatePicker, Actions, ConfirmationDialog, UnPathfinderUnite },

  props: {
    competition: {
      type: Object as () => Competition | null,
      default: null,
    },
  },

  setup(props, { emit }) {
    const showConfirmationDialog = ref(false);
    const isNewCompetition = computed(() => props.competition === null);
    const date = ref();
    const provinces = useProvincesStore().getProvincesNames;
    const province = ref('Loja');
    const defaultCompetition = {
      name: '',
      description: '',
      province: 'Loja',
      start_date: new Date().toISOString(),
      end_date: new Date().toISOString(),
    };

    const competition = ref(props.competition || defaultCompetition);

    const submitForm = async () => {
      const data = {
        name: competition.value.name,
        description: competition.value.description,
        start_date: competition.value.start_date,
        end_date: competition.value.end_date,
        province: competition.value.province,
      };

      if (isNewCompetition.value) {
        await competitionStore().addCompetition(data);
      } else {
        if (props.competition) {
          await competitionStore().putCompetition(props.competition._id, data);
        }
      }
      closeForm();
    };

    const showConfirmation = () => {
      showConfirmationDialog.value = true;
    };

    const closeConfirmation = () => {
      showConfirmationDialog.value = false;
    };

    const closeForm = async () => {
      await competitionStore().fetchCompetitions();
      emit('close');
    };

    return {
      isNewCompetition,
      competition,
      date,
      provinces,
      province,
      submitForm,
      closeForm,
      showConfirmationDialog,
      showConfirmation,
      closeConfirmation,
    };
  },
};
</script>
