import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Portfolio from '../views/Portfolio';
import StocksList from '../components/Stocks/StocksList';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/portfolio',
    name: 'Portfolio',
    component: Portfolio
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: StocksList
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
