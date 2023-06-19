<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { competitionStore } from './stores/competitionStore';

export default defineComponent({
  name: 'App',

  data() {
    return {

    }
  },

  setup() {
    onMounted(async () => {
      await competitionStore().fetchCompetitions();
    })
  },
})
</script>
