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
        <v-pagination v-model="currentPage" :length="numberOfPages" :total-visible="5" class="pagination-numbers"></v-pagination>
        <button @click="goToNextPage" :disabled="currentPage === numberOfPages" class="pagination-button">
          <MdTwoToneNavigateNext />
        </button>
      </div>
  
      <div class="time" v-for="(time, index) in paginatedTimes" :key="index">
        <p><strong>Sensor:</strong> {{ time.id }}</p>
        <h2>HRS: MINS: SEGS: MS</h2>
        <h1>{{ time.time }}</h1>
        <button>Asignar Equipo</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted, ref, toRef, computed } from 'vue';
  import { useSocketIO } from '@/services/WebSocketPlugin';
  import { MdTwoToneNavigateBefore, MdTwoToneNavigateNext } from '@kalimahapps/vue-icons';
  import { usePagination } from '@/utils/pagination';
  
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
  
      const socketIO = useSocketIO();
  
      onMounted(() => {
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
      };
    },
  };
  </script>
  