import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./routes";
import App from "./App.vue";

import "./output.css";

const pinia = createPinia();
const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(pinia);
app.mount("#app");
