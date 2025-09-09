import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage.vue";
import Jobs from "../components/Jobs.vue";
import Apply from "../components/Apply.vue";
import Partners from "@/components/Partners.vue";
import LegalAid from "@/components/LegalAid.vue";
import AdminPanel from "@/components/AdminPanel.vue";
import LogIn from "@/components/LogIn.vue";
import SignUp from "@/components/SignUp.vue";
import WelcomePage from "@/components/WelcomePage.vue";
import TokenService from "../services/token.service";

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
      meta: { requiresAuth: true },
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
      path: "/login",
      name: "login",
      component: LogIn,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
    },

    {
      path: "/legalaid",
      name: "legalaid",
      component: LegalAid,
      meta: { requiresAuth: true },
    },

    {
      path: "/admin",
      name: "adminpanel",
      component: AdminPanel,
    },
    {
      path: "/welcome",
      name: "Welcome",
      component: WelcomePage,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

// Navigation guard
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if (!TokenService.isAuthenticated()) {
      // Not authenticated, redirect to login
      return next({ name: "LoginPage", query: { redirect: to.fullPath } });
    }

    // Check if route requires specific ability
    if (
      to.meta.requiredAbility &&
      !TokenService.hasAbility(to.meta.requiredAbility)
    ) {
      // User doesn't have required ability, redirect to home or unauthorized page
      return next({ name: "homepage" });
    }
  }

  // Check if route is for guests only (like login page)
  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (TokenService.isAuthenticated()) {
      // User is already authenticated, redirect to home
      return next({ name: "homepage" });
    }
  }

  // Proceed as normal
  next();
});

export default router;
