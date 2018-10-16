import BaseApp from './components/BaseApp.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import LayoutPage from './containers/LayoutPage.jsx';
import TrainingPage from './containers/TrainingPage.jsx';
import StudentsPage from './containers/StudentsPage.jsx';
import ProgramsPage from './containers/ProgramsPage.jsx';
import TemplatesPage from './containers/TemplatesPage.jsx';
import LayoutMaker from './containers/LayoutMaker.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: BaseApp,
  childRoutes: [

    {
      path: '/',
      component: LayoutMaker
    },
    {
      path: '/layout',
      component: LayoutMaker
    },
    {
      path: '/students',
      component: StudentsPage
    },
    {
      path: '/programs',
      component: ProgramsPage
    },
    {
      path: '/templates',
      component: TemplatesPage
    },
    {
      path: '/homepage',
      component: HomePage
    },
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/signup',
      component: SignUpPage
    },
    {
      path: '/layout2',
      component: LayoutPage
    },
    {
      path: '/training',
      component: TrainingPage
    }
  ]
};

export default routes;