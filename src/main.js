import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue';
import TeamsList from './components/teams/TeamsList';
import UsersList from './components/users/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import NotFound from './components/nav/NotFound';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // {path: '/', redirect: '/teams'}, // change url
        {path: '/teams', component: TeamsList, alias: '/'}, // alias doesn't change url and display TeamsList
        // {path: '/teams', component: TeamsList}, // url: our-domain/teams, content: TeamList
        {path: '/users', component: UsersList},
        // dynamic adding address. It should be at the end of the list
        // props: true - dynamic component should added as props, TeamMembers.vue, props: teamId
        {path: '/teams/:teamId', component: TeamMembers, props: true},
        // {path: '/:notFound(.*)', redirect: '/users'} // if url doesn't exist redirect
        {path: '/:notFound(.*)', component: NotFound} // if url doesn't exist
    ],
    linkActiveClass: 'active',
})

const app = createApp(App)

app.use(router);

app.mount('#app');
