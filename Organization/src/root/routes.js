import Dashboard from '../containers/Dashboard';
import Trainings from '../containers/Trainings';
import Reports from '../containers/Reports';
import Candidates from '../containers/Candidates';
import MyAccount from '../containers/MyAccount';
import test from '../containers/test';

const routes = [
    // { path: '/', exact: true, name: 'Login', component: Login },
    { path: '/test', name: 'test', component: test },
    { path: '/overview', name: 'Dashboard', component: Dashboard },
    { path: '/trainings', name: 'Trainings', component: Trainings },
    { path: '/reports', name: 'Reports', component: Reports },
    { path: '/candidates', name: 'Candidates', component: Candidates },
    { path: '/myaccount', name: 'MyAccount', component: MyAccount },
];

export default routes;