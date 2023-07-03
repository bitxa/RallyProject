import { defineStore } from "pinia";

export const useProvincesStore = defineStore("provincias", {
  state: () => ({
    provinces: [
      {
        name: "Azuay",
        cities: [
          "Cuenca",
          "Gualaceo",
          "Paute",
          "Chordeleg",
          "Santa Isabel",
          "Nabón",
          "Pucará",
        ],
      },
      {
        name: "Bolívar",
        cities: [
          "Guaranda",
          "San Miguel",
          "Caluma",
          "Chillanes",
          "Chimbo",
          "Las Naves",
        ],
      },
      {
        name: "Cañar",
        cities: [
          "Azogues",
          "La Troncal",
          "El Tambo",
          "Déleg",
          "Suscal",
          "Biblián",
        ],
      },
      {
        name: "Carchi",
        cities: ["Tulcán", "Espejo", "Montúfar", "Mira", "Bolívar"],
      },
      {
        name: "Chimborazo",
        cities: ["Riobamba", "Guano", "Penipe", "Colta", "Alausí", "Chambo"],
      },
      {
        name: "Cotopaxi",
        cities: [
          "Latacunga",
          "La Maná",
          "Pujilí",
          "Salcedo",
          "Saquisilí",
          "Sigchos",
        ],
      },
      {
        name: "El Oro",
        cities: [
          "Machala",
          "Huaquillas",
          "Santa Rosa",
          "Pasaje",
          "Arenillas",
          "Atahualpa",
        ],
      },
      {
        name: "Esmeraldas",
        cities: [
          "Esmeraldas",
          "Quinindé",
          "Atacames",
          "San Lorenzo",
          "Eloy Alfaro",
          "Muisne",
        ],
      },
      {
        name: "Galápagos",
        cities: ["Puerto Baquerizo Moreno", "Puerto Ayora", "Puerto Villamil"],
      },
      {
        name: "Guayas",
        cities: [
          "Guayaquil",
          "Durán",
          "Samborondón",
          "Milagro",
          "Daule",
          "Balzar",
        ],
      },
      {
        name: "Imbabura",
        cities: ["Ibarra", "Otavalo", "Cotacachi", "Antonio Ante", "Pimampiro"],
      },
      {
        name: "Loja",
        cities: [
          "Loja",
          "Catamayo",
          "Zapotillo",
          "Pindal",
          "Puyango",
          "Saraguro",
        ],
      },
      {
        name: "Los Ríos",
        cities: [
          "Babahoyo",
          "Quevedo",
          "Vinces",
          "Valencia",
          "Ventanas",
          "Buena Fe",
        ],
      },
      {
        name: "Manabí",
        cities: [
          "Portoviejo",
          "Manta",
          "Montecristi",
          "Jipijapa",
          "Chone",
          "El Carmen",
        ],
      },
      {
        name: "Morona Santiago",
        cities: ["Macas", "Morona", "Sucúa", "Logroño", "Gualaquiza", "Taisha"],
      },
      {
        name: "Napo",
        cities: [
          "Tena",
          "El Chaco",
          "Quijos",
          "Archidona",
          "Carlos Julio Arosemena Tola",
        ],
      },
      {
        name: "Orellana",
        cities: ["Francisco de Orellana", "El Coca"],
      },
      {
        name: "Pastaza",
        cities: ["Puyo", "Mera", "Santa Clara", "Arajuno"],
      },
      {
        name: "Pichincha",
        cities: [
          "Quito",
          "Cayambe",
          "Machachi",
          "Mejía",
          "Pedro Vicente Maldonado",
          "Rumiñahui",
        ],
      },
      {
        name: "Santa Elena",
        cities: [
          "Santa Elena",
          "Salinas",
          "La Libertad",
          "La Libertad",
          "La Libertad",
        ],
      },
      {
        name: "Santo Domingo de los Tsáchilas",
        cities: ["Santo Domingo", "La Concordia"],
      },
      {
        name: "Sucumbíos",
        cities: ["Nueva Loja", "Lago Agrio", "Shushufindi", "Cuyabeno"],
      },
      {
        name: "Tungurahua",
        cities: ["Ambato", "Baños", "Pelileo", "Pillaro", "Quero", "Tisaleo"],
      },
      {
        name: "Zamora Chinchipe",
        cities: [
          "Zamora",
          "Yantzaza",
          "Yacuambi",
          "El Pangui",
          "Centinela del Cóndor",
          "Nangaritza",
        ],
      },
    ],
  }),
  getters: {
    getProvinces(): any {
      return this.provinces;
    },
  },
});
