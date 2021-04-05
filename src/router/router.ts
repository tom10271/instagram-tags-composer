import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/home.vue'),
        meta: {
            requiredAccessRights: ['Administrator'],
        },
    },
    {
        path: '/instagram-tag-composer',
        name: 'instagram-tag-composer',
        component: () => import(/* webpackChunkName: "home" */ '../views/ig-tag/main.vue'),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
