import {createRouter, createWebHashHistory} from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    }, {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: 'Dashboard'
                },
                component: () => import ( /* webpackChunkName: "dashboard" */ "../views/Dashboard.vue")
            }, {
                path: "/table",
                name: "basetable",
                meta: {
                    title: 'Sold Out'
                },
                component: () => import ( /* webpackChunkName: "table" */ "../views/BaseTable.vue")
            },  {
                path: "/tabs",
                name: "tabs",
                meta: {
                    title: 'Buy In'
                },
                component: () => import ( /* webpackChunkName: "tabs" */ "../views/BaseForm.vue")
            },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;