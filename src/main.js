import {createApp} from 'vue';
import {createRouter, createWebHistory} from 'vue-router'

import App from './App.vue';
import TeamsList from './components/teams/TeamsList';
import UsersList from './components/users/UsersList';
import TeamMembers from './components/teams/TeamMembers';
import NotFound from './components/nav/NotFound';
import TeamsFooter from './components/teams/TeamsFooter';
import UserFooter from './components/users/UserFooter';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', redirect: '/teams'}, // change url
        // {path: '/teams', component: TeamsList, alias: '/'}, // alias doesn't change url and display TeamsList
        // {path: '/teams', component: TeamsList}, // url: our-domain/teams, content: TeamList
        {
            name: 'teams',
            path: '/teams',
            // component: TeamsList,
            components: {
                default: TeamsList,
                footer: TeamsFooter
            },
            children: [
                {name: 'team-members', path: '/teams/:teamId', component: TeamMembers, props: true}
            ]
        },
        {path: '/users', components: {default: UsersList, footer: UserFooter}},
        // dynamic adding address. It should be at the end of the list
        // props: true - dynamic component should added as props, TeamMembers.vue, props: teamId
        // {path: '/teams/:teamId', component: TeamMembers, props: true}, // remove to TeamList as children
        // {path: '/:notFound(.*)', redirect: '/users'} // if url doesn't exist redirect
        {path: '/:notFound(.*)', component: NotFound} // if url doesn't exist
    ],
    linkActiveClass: 'active',
    scrollBehavior(_, _2, savePosition) {  // names of arguments are up to you
        // console.log(to, from, savePosition)
        if (savePosition) {         // checking if a user doesn't use 'go back (backspace etc.)'
            return savePosition
        }
        return {left: 0, top: 0}  // can be used only 'left' and 'top'
    }
})

router.beforeEach(function (_, _2, next) {
    // console.log(to, from);
    // next(false); // cancelled all navigation, we see nothing on a screen

    // if (to.name === 'team-members') {    // redirect to /teams/t2
    //     next()
    // } else {
    //     next({name: 'team-members', params: {teamId: 't2'}});
    // }
    next()
})

router.afterEach(function (to, from) {
    // sending analytics data of user behaviour
    // contain every navigation action
    console.log(to, from)
});


const app = createApp(App)

app.use(router);

app.mount('#app');
