<style src="@/assets/styles/admin_panel/entity_data.css"></style>

<template>
  <AdminMenuItemHeader header_title="Competiciones" :data="competitions" :placeholder="'Busque alguna competencia:'"
    @input_name="handleInput" />

  <NewEntityButton :button_title="'Crear competencia'" @showForm="showForm" />

  <div class="container">
    <div v-if="isFormVisible" class="overlay">
      <NewCompetition @close="hideForm"/>
    </div>

    <div class="box" v-for="(competition, index) in filteredCompetitions" :key="index">
      <span>
        <h2>{{ competition.name }}</h2>
        <ActionsForEntity @deleteItem="deleteCompetition(index)"/>
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
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import { type Competition } from '@/components/menu_entities/interfaces/Interfaces';
import { FaPencil, AkCircleXFill } from '@kalimahapps/vue-icons';
import { competitionStore } from '@/stores/competitionStore';
import AdminMenuItemHeader from '@/components/menu_entities/fragments/AdminMenuItemHeader.vue';
import NewEntityButton from '@/components/menu_entities/fragments/NewEntityButton.vue';
import LinkWithAnimation from '@/components/menu_entities/fragments/LinkWithAnimation.vue';
import ActionsForEntity from '@/components/menu_entities/fragments/ActionsForEntity.vue';
import NewCompetition from '@/components/menu_entities/floating-forms/NewCompetition.vue';

export default {
  name: 'CompetitionComponent',
  components: {
    FaPencil,
    AkCircleXFill,
    LinkWithAnimation,
    ActionsForEntity,
    AdminMenuItemHeader,
    NewEntityButton,
    NewCompetition,
  },

  setup() {
    const isFormVisible = ref(false);
    const competitions = ref<Competition[]>([]);
    const selectedCompetitionName = ref<string | null>(null);

    const showForm = () => {
      isFormVisible.value = true;
    };

    const hideForm = () => {
      isFormVisible.value = false;
    };

    const handleInput = (name: string) => {
      selectedCompetitionName.value = name;
    };

    const formatDate= (date: any) =>{
      if (!date) return "";
      return date.split("T")[0];
    };

    const deleteCompetition = async (index: number) => {
      await competitionStore().deleteCompetition(index);
    };

    const filteredCompetitions = computed(() => {
      if (!selectedCompetitionName.value) {
        return competitions.value;
      }

      return competitions.value.filter((competition) =>
        competition.name.toLowerCase().includes(selectedCompetitionName.value?.toLowerCase() ?? '')
      );
    });

    onMounted(async () => {
      competitions.value = await competitionStore().competitions;
    });

    return {
      isFormVisible,
      competitions,
      showForm,
      hideForm,
      handleInput,
      formatDate,
      deleteCompetition,
      filteredCompetitions,
    };
  },
};
</script>

<style scoped>
.selected-item {
  margin-top: 10px;
}
</style>
