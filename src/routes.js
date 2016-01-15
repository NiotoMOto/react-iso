import AppComponent from './client/components/app';
import IndexComponent from './client/components/index';
import AboutComponent from './client/components/about';

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
    }
  ]
}

export { routes };
