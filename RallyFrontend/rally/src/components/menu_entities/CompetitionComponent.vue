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
        <LinkWithAnimation :message="'Ver Circuitos'" />
      </div>
    </div>



  </div>
</template>

<script lang="ts">
import { apiService } from '@/services/apiService';
import { onMounted, ref } from 'vue';
import { type Competition } from '@/components/menu_entities/interfaces/Interfaces';

import { AnFilledPlusCircle } from "@kalimahapps/vue-icons";
import { FaPencil } from "@kalimahapps/vue-icons";

import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import LinkWithAnimation from "@/components/menu_entities/fragments/LinkWithAnimation.vue";
import NewCompetence from "@/components/menu_entities/floating-forms/NewCompetence.vue"

export default {
  name: 'CompetitionComponent',
  components: {
    AnFilledPlusCircle,
    FaPencil,
    LinkWithAnimation,
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