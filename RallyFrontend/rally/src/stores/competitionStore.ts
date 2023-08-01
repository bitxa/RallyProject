import { defineStore } from "pinia";
import {
  type Category,
  type Circuit,
  type Competition,
  type Competitor,
  type Sponsor,
  type Team,
} from "@/interfaces/Interfaces";
import { apiService } from "@/services/apiService";
import { ref } from "vue";

export const competitionStore = defineStore("competitionStore", {
  state: () => ({
    competitions: ref<Array<Competition>>([]),
    competitors: ref<Array<Competitor>>([]),
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
      return this.competitions;
    },

    async fetchCompetitors() {
      try {
        const response = await apiService.getData("competitors");
        this.competitors = response.data;
      } catch (error) {
        console.error("Error fetching competitors:", error);
        throw error;
      } finally {
        return this.competitors;
      }
    },

    async fetchCircuits() {
      try {
        const response = await apiService.getData("circuits");
        this.circuits = response.data;
      } catch (error) {
        console.error("Error fetching circuits:", error);
        throw error;
      }
      return this.circuits;
    },

    async fetchCategories() {
      try {
        const response = await apiService.getData("categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }
    },

    async fetchTeams() {
      try {
        const response = await apiService.getData("teams");
        const teamsWithCompetitors = await Promise.all(
          response.data.map(async (team: any) => {
            const [driverResponse, coDriverResponse] = await Promise.all([
              apiService.getData(`competitors/${team.driver_id}`),
              apiService.getData(`competitors/${team.copilot_id}`),
            ]);

            return {
              ...team,
              driver: driverResponse.data,
              copilot: coDriverResponse.data,
            };
          })
        );
          
        this.teams = teamsWithCompetitors;
      } catch (error) {
        console.error("Error fetching teams:", error);
        throw error;
      }
    },
    async fetchSponsors() {
      try {
        const response = await apiService.getData("sponsors");
        this.sponsors = response.data;
      } catch (error) {
        console.error("Error fetching sponsors:", error);
        throw error;
      }
    },

    // Other fetch methods for different entities...

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
        this.categories.push(newCategory.data);
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
        const categoriesByCircuitID = await apiService.getData(
          `categories/circuit/${circuit_id}`
        );
        this.categories = categoriesByCircuitID.data;
      } catch (error) {
        throw error;
      }
    },

    async getSponsorsByCircuitID(circuit_id: string) {
      try {
        const sponsorsByCircuitID = await apiService.getData(
          `sponsors/circuit/${circuit_id}`
        );
        this.sponsors = sponsorsByCircuitID.data;
      } catch (error) {
        throw error;
      }
    },

    async putCompetition(competitionId: string, data: Object) {
      try {
        const updatedCompetition = await apiService.putData(
          data,
          `competitions/${competitionId}`
        );
        const index = this.competitions.findIndex(
          (competition) => competition._id === competitionId
        );
        this.competitions[index] = updatedCompetition.data;
      } catch (error) {
        throw error;
      }
    },

    async putCircuit(circuitId: string, data: Object) {
      try {
        const updatedCircuit = await apiService.putData(
          data,
          `circuits/${circuitId}`
        );
        const index = this.circuits.findIndex(
          (circuit) => circuit._id === circuitId
        );
        this.circuits[index] = updatedCircuit.data;
      } catch (error) {
        throw error;
      }
    },

    async putCategory(categoryId: string, data: Object) {
      try {
        const updatedCategory = await apiService.putData(
          data,
          `categories/${categoryId}`
        );
        const index = this.categories.findIndex(
          (category) => category._id === categoryId
        );
        this.categories[index] = updatedCategory.data;
      } catch (error) {
        throw error;
      }
    },

    async putTeam(teamId: string, data: Object) {
      try {
        const updatedTeam = await apiService.putData(data, `teams/${teamId}`);
        const index = this.teams.findIndex((team) => team._id === teamId);
        this.teams[index] = updatedTeam.data;
      } catch (error) {
        throw error;
      }
    },

    async putSponsor(sponsorId: string, data: Object) {
      try {
        const updatedSponsor = await apiService.putData(
          data,
          `sponsors/${sponsorId}`
        );
        const index = this.sponsors.findIndex(
          (sponsor) => sponsor._id === sponsorId
        );
        this.sponsors[index] = updatedSponsor.data;
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
