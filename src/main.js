import { createApp } from "vue";
import App from "./App.vue";
import VLazyLoader from "lazy_loading_vue";

//import './assets/main.css'

const app = createApp(App);
app.directive("lazy", VLazyLoader);

app.mount("#app");
