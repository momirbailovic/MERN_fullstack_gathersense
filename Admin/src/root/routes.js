
import Dashboard from '../containers/Dashboard';
import Organization from '../containers/Organization';
import Admins from '../containers/Admins';
import MyAccount from '../containers/MyAccount';

const routes = [
    { path: '/overview', name: 'Dashboard', component: Dashboard },
    { path: '/organizations', name: 'Organization', component: Organization },
    { path: '/adminstrators', name: 'Admins', component: Admins },
    { path: '/myaccount', name: 'MyAccount', component: MyAccount },
];

export default routes;