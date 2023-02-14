import { createRouter, createWebHashHistory } from 'vue-router'

import HomePage from '../pages/home.vue'
import Stats from '../pages/stats.vue'
import ContactIndex from '../pages/contact-index.vue'
import ContactDetails from '../pages/contact-details.vue'
import ContactEdit from '../pages/contact-edit.vue'
import SignUp from '../pages/sign-up.vue'


const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/signup'
        },
        {
            path: '/home',
            component: HomePage,
        },
        {
            path: '/contact',
            component: ContactIndex,
        },
        {
            path: '/contact/:_id',
            component: ContactDetails,
        },
        {
            path: '/contact/edit/:_id?',
            component: ContactEdit,
        },
        {
            path: '/signup',
            component: SignUp,
        },
        {
            path: '/stats',
            component: Stats,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            // component: () => import('../pages/AboutView.vue'),
        },
    ],
}
const router = createRouter(routerOptions)

export default router
