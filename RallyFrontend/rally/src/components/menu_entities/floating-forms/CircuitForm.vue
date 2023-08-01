<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
  <v-card>
    <v-card-title class="d-flex justify-center align-center">
      <h2>{{ isNewCircuit ? 'Crear circuito' : 'Editar circuito' }}</h2>
      <FaRoad class="header_icon" />

    </v-card-title>
    <v-card-text>
      <form @submit.prevent="submitForm">

        <label for="name">Nombre:</label>
        <v-text-field variant="solo" type="text" id="name" v-model="circuit.name"
          placeholder="Ingrese el nombre"></v-text-field>

        <label for="description">Descripción:</label>
        <v-textarea variant="solo" type="text" id="description" v-model="circuit.description"
          placeholder="Ingrese la descripción"></v-textarea>

        <label for="track_length">Longitud:</label>
        <v-text-field variant="solo" type="number" id="track_length" v-model="circuit.track_lenght" placeholder="Km">
          <template v-slot:append>
            <small><b>KM</b></small>
          </template></v-text-field>


        <label for="location">Locación:</label>
        <v-text-field variant="solo" type="text" id="location" v-model="circuit.location"
          placeholder="Ingrese la locación"></v-text-field>


        <Actions @cancel="closeForm" @accept="showConfirmationDialog = true" />
        <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
          :dialog="isNewCircuit ? '¿Seguro que deseas crear un nuevo circuito?' : '¿Seguro que deseas editar el circuito?'"
          @cancel="closeConfirmation" />
      </form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import { competitionStore } from '@/stores/competitionStore';
import type { Circuit } from '@/interfaces/Interfaces';
import { ref, type PropType, computed } from "vue";
import { FaRoad } from "@kalimahapps/vue-icons";

export default {
  components: { Actions, ConfirmationDialog, FaRoad },
  name: 'CircuitForm',
  props: {
    circuit: {
      type: Object as () => Circuit | null,
      required: true,
      default: null,
    },
    competition_id: {
      type: String,
      required: true,
    },
  },

  setup(props, { emit }) {
    const showConfirmationDialog = ref(false);
    const isNewCircuit = computed(() => props.circuit === null);

    const defaultCircuit = {
      competition_id: props.competition_id,
      name: '',
      description: '',
      track_lenght: 0,
      location: '',
    };

    const circuit = ref(props.circuit || defaultCircuit);

    const submitForm = async () => {
      const data = {
        competition_id: circuit.value.competition_id,
        name: circuit.value.name,
        description: circuit.value.description,
        track_length: circuit.value.track_lenght,
        location: circuit.value.location,
      };

      if (isNewCircuit.value) {
        await competitionStore().addCircuit(data);
      } else {
        if (props.circuit) {
          await competitionStore().putCircuit(props.circuit._id, data);
        }
      }
      closeForm();

    };

    const closeForm = async () => {
      emit('close');
      await competitionStore().fetchCircuits();
    };

    const closeConfirmation = () => {
      showConfirmationDialog.value = false;
    };

    return {
      defaultCircuit,
      isNewCircuit,
      showConfirmationDialog,
      submitForm,
      closeConfirmation,
      closeForm,
      circuit
    };
  }
}


</script>

<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>
