<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
  <AdminMenuItemHeader header_title="Competiciones" :listing_data="competitionNames"
    :placeholder="'Busque alguna competencia:'" />

  <v-col cols="auto" class="new-box-container">
    <v-btn size="x-large" class="new-box" @click="showForm" rounded>
      <h2>Crear competencia</h2>
      <v-icon left>
        <AnFilledPlusCircle class="plus" />
      </v-icon>
    </v-btn>
  </v-col>


  <div class="container">

    <div v-if="isFormVisible" class="overlay">
      <NewCompetence @close="hideForm" />
    </div>

    <div class="box" v-for="(competition, index) in competitions" :key="index">
      <span>
        <h2>{{ competition.name }}</h2>

        <v-btn rounded class="edit-button" fab color="primary">

          <FaPencil />
        </v-btn>

      </span>





      <div class="info-element">
        <div class="dates">
          <div class="date">
            <h2>Fecha Inicio</h2>
            <p>{{ competition.start_date }}</p>
          </div>

          <div class="date">
            <h2>Fecha Fin</h2>
            <p>{{ competition.end_date }}</p>
          </div>
        </div>

      </div>

      <div class="info-element">
        <h2>Provincia</h2>
        <p>{{ competition.province }}</p>
      </div>

      <div class="info-element">
        <h2>Descripción</h2>
        <p>{{ competition.description }}
        </p>
      </div>


      <div class="info-element">
        <h2>Circuitos</h2>
        <p><a href="#" class="wave-link">Ver circuitos
            <svg class="link__graphic link__graphic--slide" width="300%" height="100%" viewBox="0 0 1200 60"
              preserveAspectRatio="none">
              <path
                d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0">
              </path>
            </svg>
          </a>
        </p>
      </div>
    </div>



  </div>
</template>

<script lang="ts">

import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";
import { FaPencil } from "@kalimahapps/vue-icons";

import AdminMenuItemHeader from './fragments/AdminMenuItemHeader.vue';
import NewCompetence from "@/components/competences/floating-forms/NewCompetence.vue"
import { apiService } from '@/services/apiService';
import { onMounted, ref } from 'vue';
import { type Competition } from '@/components/competences/interfaces/Interfaces';

export default {
  name: 'CompetitionComponent',
  components: {
    AnFilledPlusCircle,
    FaPencil,
    AdminMenuItemHeader,
    NewCompetence
  },

  data() {
    return {
      isFormVisible: false,
      competitionMenu: false as boolean,
      selectedCompetition: ref<Competition | null>(null),
      search: '',
    };
  },

  methods: {
    showForm() {
      this.isFormVisible = true;
    },
    hideForm() {
      this.isFormVisible = false;
    },
    selectCompetition(competition: any) {
      this.selectedCompetition = competition;
      this.competitionMenu = false;
    },


  },


  setup() {
    var competitions = ref<Competition[]>([]);

    onMounted(async () => {
      try {
        const response = await apiService.getData('competitions');
        competitions.value = response.data;

      } catch (error) {
        console.error(error);
      }

    })

    return { competitions };
  },

  computed: {
    competitionNames() {
      return this.competitions.map((competition) => competition.name);
    },
  },
}
</script>

<style scoped>
.selected-item {
  margin-top: 10px;
}
</style>