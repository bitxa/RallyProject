<style src="@/assets/styles/admin_panel/times.css"></style>

<template>
  <div class="times">
    <div class="text-center info_message">
      <h4>Escuchando tiempos de sensores</h4>
      <v-progress-circular indeterminate color="green" />
    </div>

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

    <div class="time" v-for="(time, index) in paginatedTimes" :key="index">
      <p><strong>Sensor:</strong> {{ time.id }}</p>
      <h2>HRS: MINS: SEGS: MS</h2>
      <h1>{{ time.time }}</h1>
      <v-btn @click="isTeamAsignmentVisible = true">Asignar a equipo</v-btn>
    </div>
  </div>

  <v-dialog v-model="isTeamAsignmentVisible" persistent max-width="500px">
    <v-card>
      <v-card-title>Selecciona un equipo</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-select color="light-blue lighten-2" variant="solo" v-model="selectedTeamForAssignment"
          :items="teams.map((team: any) => team.name)" placeholder="Equipo" item-text="name" item-value="_id"
          return-object>
          <template v-slot:selection="{ item, index }">
            <v-chip>
              <span>{{ item.title }}</span>
            </v-chip>
          </template>
        </v-select>
      </v-card-text>
      <v-card-actions class="d-flex align-center justify-center">
        <v-btn variant="outlined" color="success" prepend-icon="mdi-content-save-move"
          @click="isTeamAsignmentVisible = false">
          Guardar
        </v-btn>
        <v-btn variant="outlined" color="error" prepend-icon="mdi-cancel" @click="isTeamAsignmentVisible = false">
          Cancelar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
  
<script lang="ts">
import { onMounted, ref, toRef, computed } from 'vue';
import { useSocketIO } from '@/services/WebSocketPlugin';
import { MdTwoToneNavigateBefore, MdTwoToneNavigateNext } from '@kalimahapps/vue-icons';
import { usePagination } from '@/utils/pagination';
import type { Team } from '@/interfaces/Interfaces';
import { competitionStore } from '@/stores/competitionStore';

interface Time {
  id: string;
  time: string;
}

export default {
  name: 'TimesComponent',

  components: {
    MdTwoToneNavigateBefore,
    MdTwoToneNavigateNext,
  },

  setup() {
    const currentPage = ref(1);
    const itemsPerPage = ref(5);
    const times = ref<Time[]>([]);
    const teams = ref<Team[]>([]);
    const isTeamAsignmentVisible = ref(false);
    const selectedTeamForAssignment = ref<Team | null>(null);

    const socketIO = useSocketIO();

    onMounted(async () => {
      const storedTimes = localStorage.getItem('times');
      if (storedTimes) {
        try {
          times.value = JSON.parse(storedTimes);
        } catch (error) {
          console.info('No se han capturado tiempos aún');
        }
      }
      socketIO.socket.on('connect', () => {
        console.log('Connected');
      });

      socketIO.socket.on('onMessage', (data: Time) => {
        console.log('Received message:', data);
        times.value.push(data);
        localStorage.setItem('times', JSON.stringify(times.value));
      });

      await competitionStore().fetchTeams();
      teams.value = competitionStore().teams;
    });

    const timesRef = toRef(times, 'value');

    const { paginatedData: paginatedTimes, numberOfPages, goToNextPage, goToPreviousPage } = usePagination(
      itemsPerPage,
      timesRef,
      currentPage
    );

    return {
      paginatedTimes,
      currentPage,
      numberOfPages,
      goToNextPage,
      goToPreviousPage,
      isTeamAsignmentVisible,
      selectedTeamForAssignment,
      teams,
    };
  },
};
</script>
  