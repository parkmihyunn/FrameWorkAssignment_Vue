// src/routes.ts
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../src/views/Index.vue"),
  },
  {
    path: "/product/:id",
    name: "Product",
    component: () => import("../src/views/Products.vue"),
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../src/views/Cart.vue"),
  },
  {
    path: "/fashion",
    name: "Fashion",
    component: () => import("../src/views/Fashion.vue"),
  },
  {
    path: "/accessory",
    name: "Accessory",
    component: () => import("../src/views/Accessory.vue"),
  },
  {
    path: "/digital",
    name: "Digital",
    component: () => import("../src/views/Digital.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
