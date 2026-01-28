import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home/index.vue"),
    },
    {
        path: '/article/:id',
        name: 'Article',
        component: () => import("@/views/Home/article.vue")
    },
    {
        path: "/editor",
        name: "Editor",
        component: () => import("@/views/Editor/index.vue"),
    },
    {
        path: "/archive",
        name: "Archive",
        component: () => import("@/views/Archive/index.vue"),
    },
    {
        path: '/archive/category/:id',
        name: 'CategoryArchive',
        component: () => import("@/views/Archive/CategoryArchivePage.vue")
    },
    {
        path: "/jottings",
        name: "Jottings",
        component: () => import("@/views/Jotting/index.vue"),
    },
    {
        path: "/leaveWord",
        name: "LeaveWord",
        component: () => import("@/views/LeaveWord/index.vue"),
    },
];

const router = createRouter({
    // history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
