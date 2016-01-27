import AppComponent from './client/components/app.jsx';
import IndexComponent from './client/components/index.jsx';
import AboutComponent from './client/components/about.jsx';
import UserComponent from './client/components/userComponent.jsx';

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
