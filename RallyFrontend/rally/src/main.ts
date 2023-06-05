import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { provideSocketIO } from "./services/WebSocketPlugin";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// CSS
import "material-icons/iconfont/material-icons.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);
/*
const webSocketServerUrl = "ws://localhost:3001";
provideSocketIO(webSocketServerUrl);*/

app.use(router).use(vuetify).mount("#app");
