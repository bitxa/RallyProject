<style scoped src="@/assets/styles/admin_panel/floating-forms/new_form.css"></style>

<template>
  <v-card>
    <v-card-title class="d-flex justify-center align-center">
      <h2>Agregar {{ title }}</h2>
      <UnPathfinderUnite class="header_icon" />
    </v-card-title>

    <v-card-text>
      <form @submit.prevent="submitForm">

        <label for="name">Nombre:</label>
        <v-text-field variant="solo" type="text" id="name" v-model="name" placeholder="Ingrese el nombre"> </v-text-field>


        <label for="age">Edad:</label>
        <v-text-field variant="solo" type="number" v-age id="age" v-model="age"
          placeholder="Ingrese la edad"></v-text-field>

        <label for="identification">Identificación (cédula)</label>
        <v-text-field variant="solo" type="text" id="identification" v-model="identification"
          placeholder="Ingrese la cédula"></v-text-field>


        <label for="blood_type">Tipo sangre:</label>
        <v-text-field variant="solo" type="text" id="blood_type" v-model="bloodType"
          placeholder="Ingrese el tipo de sangre"></v-text-field>


        <label for="emergency_contact">Contacto emergencia:</label>
        <v-text-field variant="solo" type="text" id="emergency_contact" v-model="emergencyContact"
          placeholder="Ingrese el contacto de emergencia"></v-text-field>


        <label for="province">Provincia:</label>
        <select v-model="province" placeholder="Escoga la provincia">
          <option v-for="province in provinces" :key="province.name" :value="province.name">{{ province.name }}</option>
        </select>

        <label for="city">Ciudad:</label>
        <select v-model="city" placeholder="Escoga la ciudad">
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>

      </form>
    </v-card-text>

    <v-card-actions>
      <Actions @cancel="cancelForm" @accept="showConfirmationDialog = true" />
    </v-card-actions>

    <ConfirmationDialog v-model="showConfirmationDialog" @confirm="submitForm" @edit="showConfirmationDialog = false"
      :dialog="'¿Seguro que deseas guardar estos datos?'" @cancel="closeConfirmation" />

  </v-card>
</template>
  
<script lang="ts">
import ConfirmationDialog from "@/components/menu_entities/floating-forms/fragments/ConfirmationDialog.vue";
import Actions from "@/components/menu_entities/floating-forms/fragments/ActionsComponent.vue";
import { competitionStore } from '@/stores/competitionStore';
import { useProvincesStore } from '@/stores/provinces';

import type { Competitor } from '@/interfaces/Interfaces';
import { onMounted } from "vue";

export default {
  components: { Actions, ConfirmationDialog },
  name: 'CompetitorForm',

  data() {
    return {
      showConfirmationDialog: false,
      provinces: useProvincesStore().getProvinces,
      /** Competitor Data **/
      name: '',
      age: 0,
      identification: '',
      bloodType: '',
      emergencyContact: '',
      province: 'Loja',
      city: 'Loja',
      role: this.competitor_role,
    };
  },

  props: {
    competitor_role: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },

  computed: {
    selectedProvince() {
      return this.provinces.find((province: { name: string; }) => province.name === this.province);
    },

    cities() {
      return this.selectedProvince ? this.selectedProvince.cities : [];
    },
  },

  methods: {
    async submitForm() {
      const newCompetitor = {
        name: this.name,
        age: this.age,
        identification: this.identification,
        blood_type: this.bloodType,
        emergency_contact: this.emergencyContact,
        province: this.province,
        city: this.city,
        role: this.role
      };

      const competitorCreated: Competitor = await competitionStore().addCompetitor(newCompetitor);
      this.$emit('close');
      this.$emit('new_competitor', competitorCreated);
    },

    cancelForm() {
      this.$emit('close');
    },

    showConfirmation() {
      this.showConfirmationDialog = true;
    },

    closeConfirmation() {
      this.showConfirmationDialog = false;
    },
  },
};
</script>
  