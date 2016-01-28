import AppComponent from './client/containers/app';
import IndexComponent from './client/containers/index';
import AboutComponent from './client/containers/about';
import UserComponent from './client/containers/userComponent';

const routes = {
  path: '',
  component: AppComponent,
  childRoutes: [
    {
      path: '/',
      component: IndexComponent
    },
    {
      path: '/about',
      component: AboutComponent
    },
    {
      path: '/user',
      component: UserComponent
    }
  ]
}

export { routes };
