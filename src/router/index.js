import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import Jobs from "../components/Jobs.vue";
import Apply from "../components/Apply.vue";
import Partners from "@/components/Partners.vue";
import LegalAid from "@/components/LegalAid.vue";
import AdminPanel from "@/components/AdminPanel.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homepage",
      component: HomePage,
    },
    {
      path: "/jobs",
      name: "jobs",
      component: Jobs,
    },

    {
      path: "/apply",
      name: "apply",
      component: Apply,
    },

    {
      path: "/partners",
      name: "partners",
      component: Partners,
    },

    

    {
      path: "/legalaid",
      name: "legalaid",
      component: LegalAid,
    },

        {
      path: "/adminpanel",
      name: "adminpanel",
      component: AdminPanel,
    },

  ],
});

export default router;
