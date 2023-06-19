import { createApp, type DirectiveBinding } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import router from "./router";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// CSS
import "material-icons/iconfont/material-icons.css";

const vuetify = createVuetify({
  components,
  directives: {
    numeric: {
      mounted(element: any) {
        element.addEventListener("input", (event: any) =>{
          const input = event.target;
          input.value = input.value.replace(/\D/g, "");
        });
      },
    },
    age: {
      mounted(element: any) {
        element.addEventListener("input", (event: any) => {
          const input = event.target;
          const value = input.value.replace(/\D/g, "");
          const numericValue = parseInt(value, 10);
          if (isNaN(numericValue) || numericValue < 0 || numericValue > 100 ) {
            input.value = value.slice(0, -1); 
          } else {
            input.value = numericValue.toString().replace(/^0+/, ""); 
          }
        });
      },
    },
    
    ...directives,
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount("#app");
