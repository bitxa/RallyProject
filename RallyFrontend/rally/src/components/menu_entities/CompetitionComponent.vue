<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
  <AdminMenuItemHeader header_title="Competiciones" :data="competitions" :placeholder="'Busque alguna competencia:'"
    @selected-name="handleSelectedName" />

  <NewEntityButton :button_title="'Crear competencia'" @showForm="showForm"></NewEntityButton>

  <div class="container">

    <div v-if="isFormVisible" class="overlay">
      <NewCompetition @close="hideForm" @competition_created="competitionCreated" />
    </div>

    <div class="box" v-for="(competition, index) in filteredCompetitions" :key="index">
      <span>
        <h2>{{ competition.name }}</h2>

        <div class="action_buttons">
          <v-btn rounded class="edit-button" fab color="primary" @click="">
            <FaPencil />
          </v-btn>

          <v-btn rounded class="delete-button" @click="deleteCompetition(index)">
            <AkCircleXFill />
          </v-btn>
        </div>
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
import { competitionStore } from '@/stores/competitionStore';
import { onMounted, ref, watch } from 'vue';
import { type Competition } from '@/components/menu_entities/interfaces/Interfaces';
import { FaPencil } from "@kalimahapps/vue-icons";
import { AkCircleXFill } from "@kalimahapps/vue-icons";

import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';

import LinkWithAnimation from "@/components/menu_entities/fragments/LinkWithAnimation.vue";
import NewCompetition from "@/components/menu_entities/floating-forms/NewCompetition.vue"

export default {
  name: 'CompetitionComponent',
  components: {
    FaPencil,
    AkCircleXFill,
    LinkWithAnimation,
    AdminMenuItemHeader,
    NewEntityButton,
    NewCompetition,
  },

  data() {
    return {
      isFormVisible: false,
      competitionMenu: false,
      selectedCompetition: ref<Competition | null>(null),
      selectedCompetitionName: null as String | null,
    };
  },

  methods: {
    showForm() {
      this.isFormVisible = true;
    },

    hideForm() {
      this.isFormVisible = false;
    },

    handleSelectedName(name: string): void {
      this.selectedCompetitionName = name;
    },

    competitionCreated(newCompetition: Competition) {
      this.competitions.push(newCompetition);
    },

    async deleteCompetition(index: any) {
      await competitionStore().deleteCompetition(index);
    },

  },

  computed: {
    filteredCompetitions(): Competition[] {
      if (this.selectedCompetitionName === undefined) {
        return this.competitions;
      }

      return this.competitions.filter((competition) =>
        competition.name.toLowerCase().includes(this.selectedCompetitionName?.toLowerCase() ?? '')
      );
    },

    competitions() {
      return competitionStore().competitions;
    },
  },


  setup() {
    var competitions = ref<Competition[]>([])

    onMounted(async () => {
      await competitionStore().fetchCompetitions();
      competitions.value = competitionStore().competitions;
    });


    return {
      competitions,
    };
  },
}
</script>

<style scoped>
.selected-item {
  margin-top: 10px;
}
</style>