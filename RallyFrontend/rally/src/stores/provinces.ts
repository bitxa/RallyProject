// provincesStore.js
import { defineStore } from 'pinia';

export const useProvincesStore = defineStore('provincias', {
  state: () => ({
    provincias: [
        "Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona-Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora-Chinchipe"
    ],
  }),
  getters: {
    getProvinces() : any{
      return this.provincias;
    },
  },
});
