import { defineStore } from "pinia";

export const usePopupStore = defineStore("popup", {
  state: () => ({
    isPopupOpen: false,
  }),
  actions: {
    openPopup() {
      this.isPopupOpen = true;
      document.body.style.overflow = "hidden";
    },
    closePopup() {
      this.isPopupOpen = false;
      document.body.style.overflow = "auto";
    },
  },
});
