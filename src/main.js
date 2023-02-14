import { createApp } from "vue";
import App from "./App.vue";
// import Vlazyload from "@/directives/Vlazyload";

//import './assets/main.css'

const app = createApp(App);
// app.directive("lazy", Vlazyload);

createApp(App).mount("#app");
