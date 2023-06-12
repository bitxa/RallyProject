// store.ts
import { defineStore } from "pinia";
import { type Competition } from "@/components/menu_entities/interfaces/Interfaces";
import { apiService } from "@/services/apiService";
import { ref } from "vue";

// Define your store
export const competitionStore = defineStore("competitionStore", {
  state: () => ({
    competitions: ref<Array<Competition>>([]),
  }),

  actions: {
    async fetchCompetitions() {
      try {
        const response = await apiService.getData("competitions");
        this.competitions = response.data;
      } catch (error) {
        console.error("Error fetching competitions:", error);
      }
    },

    async deleteCompetition(index: number) {
      try {
        const competition: Competition = this.competitions[index];
        await apiService.deleteData("competitions", competition._id);
        this.competitions.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },

    async addCompetition(data: Object) {
      try {
        const newCompetition = await apiService.postData(data, "competitions");
        this.competitions.push(newCompetition.data);
      } catch (error) {
        throw error;
      }
    },
  },
});
