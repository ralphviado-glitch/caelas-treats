import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'notyf/notyf.min.css';
import './assets/main.css'

import { createApp } from 'vue'

import { createPinia } from 'pinia'
import App from './App.vue';
import { useGlobalStore } from './stores/global.js'

  import HomePage from './pages/HomePage.vue';

  //import CoursesPage from './pages/CoursesPage.vue';
  //import NewsPage from './pages/NewsPage.vue';
  import RegisterPage from './pages/RegisterPage.vue'
  import ProductsPage from './pages/ProductsPage.vue'
  import LoginPage from './pages/LoginPage.vue'
  import LogoutPage from './pages/LogoutPage.vue'
  //import ErrorPage from './pages/ErrorPage.vue'
  //import ProfilePage from './pages/ProfilePage.vue'
  //import ViewCourse from "./pages/ViewCourse.vue"; // << added
  //import AddCourse from "./pages/AddCourse.vue";


  import { createRouter, createWebHistory } from 'vue-router';


  const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/products',
            name: 'Products',
            component: ProductsPage
        },

        /*{
            path: '/courses',
            name: 'Courses',
            component: CoursesPage
        },
        {
            //This route allows the use of a params, denoted by a colon.
            //Which means we can switch to this page and pass data in the url.
            //ex. /courses/1234
            //We can then retrieve the data passed from the url as id.
            path: "/courses/:id",
            component: ViewCourse,
        }, // << added
        {
            path: '/news',
            name: 'News',
            component: NewsPage
        },
        {
            path: '/profile',
            name: 'Profile',
            component: ProfilePage
        },
        {
            path: '/add-courses',
            name: 'AddCourse',
            component: AddCourse
        },*/
        {
            path: '/register',
            name: 'Register',
            component: RegisterPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        },
        {
            path: '/logout',
            name: 'Logout',
            component: LogoutPage
        },
/*        {
            path: '/:catchAll(.*)',
            component: ErrorPage
        }*/
    ]
  })



const app = createApp(App)
app.use(createPinia())

app.use(router)



app.mount('#app')