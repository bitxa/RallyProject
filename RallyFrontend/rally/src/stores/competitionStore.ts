// store.ts
import { defineStore } from "pinia";
import {
  type Category,
  type Circuit,
  type Competition,
  type Sponsor,
  type Team,
} from "@/components/menu_entities/interfaces/Interfaces";
import { apiService } from "@/services/apiService";
import { ref } from "vue";

export const competitionStore = defineStore("competitionStore", {
  state: () => ({
    competitions: ref<Array<Competition>>([]),
    circuits: ref<Array<Circuit>>([]),
    categories: ref<Array<Category>>([]),
    teams: ref<Array<Team>>([]),
    sponsors: ref<Array<Sponsor>>([]),

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

    async deleteCircuit(index: number) {
      try {
        const circuit: Circuit = this.circuits[index];
        await apiService.deleteData("circuits", circuit._id);
        this.circuits.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteCategory(index: number) {
      try {
        const category: Category = this.categories[index];
        await apiService.deleteData("categories", category._id);
        this.categories.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteTeam(index: number) {
      try {
        const team: Team = this.teams[index];
        await apiService.deleteData("teams", team._id);
        this.teams.splice(index, 1);
      } catch (error) {
        console.log(error);
      }
    },

    async deleteSponsor(index: number) {
      try {
        const sponsor: Sponsor = this.sponsors[index];
        await apiService.deleteData("sponsors", sponsor._id);
        this.sponsors.splice(index, 1);
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

    async addCircuit(data: Object) {
      try {
        const newCircuit = await apiService.postData(data, "circuits");
        this.circuits.push(newCircuit.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },


    async addCategory(data: Object) {
      try {
        const newCategory = await apiService.postData(data, "categories");
        this.circuits.push(newCategory.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async addTeam(data: Object) {
      try {
        const newTeam = await apiService.postData(data, "teams");
        this.teams.push(newTeam.data);
        return newTeam.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async addCompetitor(data: Object) {
      try {
        const newCompetitor = await apiService.postData(data, "competitors");
        console.log(newCompetitor.data);
        return newCompetitor.data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async addSponsor(data: Object) {
      try {
        const newSponsor = await apiService.postData(data, "sponsors");
        this.sponsors.push(newSponsor.data);
      } catch (error) {
        console.log(error);
        throw error;
      }
    },

    async getCircuitsByCompetitionID(competition_id: string) {
      try {
        const circuitsByCompetitionID = await apiService.getData(
          `circuits/competition/${competition_id}`
        );
        this.circuits = circuitsByCompetitionID.data;
      } catch (error) {
        throw error;
      }
    },

    async getCategoriesByCircuitID(circuit_id: string) {
      try {
        const categoriesByCompetitionID = await apiService.getData(
          `categories/circuit/${circuit_id}`
        );
        this.categories = categoriesByCompetitionID.data;
      } catch (error) {
        throw error;
      }
    },

    async getSponsorsByCircuitID(circuit_id: string) {
      try {
        const getSponsorsByCircuitID = await apiService.getData(
          `sponsors/circuit/${circuit_id}`
        );
        this.sponsors = getSponsorsByCircuitID.data;
      } catch (error) {
        throw error;
      }
    },

    async patchCategory(category: Object = ' ', category_id: String) {
      try {
        const response = await apiService.patchData(category, `categories/${category_id}`);
        return response.data;
      } catch (error) {
        throw error;
      }
    },

    async getCategoryParticipantTeamsByIds(teams_ids: Array<string>) {
      try {

        const teamResponses = await Promise.all(
          teams_ids.map((team_id) => apiService.getData(`teams/${team_id}`))
        );

        this.teams = teamResponses.map((response) => response.data);
      } catch (error) {
        throw error;
      }
    },
  },
});
