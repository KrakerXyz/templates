
import { createRouter, createWebHistory, RouteLocationRaw, RouteRecordRaw } from 'vue-router';

export enum RouteName {
    Home = 'home'
}

export function useRoute(name: RouteName.Home): RouteLocationRaw
export function useRoute(name: RouteName, params?: any): RouteLocationRaw {
    return {
        name,
        params
    };
}

const routes: RouteRecordRaw[] = [
    {
        name: RouteName.Home,
        path: '/',
        component: () => import('./components/Home.vue')
    }
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
    linkActiveClass: 'active',
    linkExactActiveClass: 'active-exact',
});