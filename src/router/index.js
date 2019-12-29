import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import CompanyDataPage from 'Pages/home/companyData/index.vue';
import CompanyTablePage from 'Pages/home/companyTable/index.vue';
import CompanyPage from 'Pages/home/companyPage/index.vue';

const routes = [
  {
    path: '/',
    redirect: { name: 'company-data' },
    name: 'home',
  },
  {
    path: '/company-data',
    name: 'company-data',
    component: CompanyDataPage,
  },
  {
    path: '/company-table',
    name: 'company-table',
    component: CompanyTablePage,
  },
  {
    path: '/company-page',
    name: 'company-page',
    component: CompanyPage,
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  base: __dirname,
  routes,
});

export default router;
