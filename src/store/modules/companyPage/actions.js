import { fetchPageInfo } from 'Services/api';

const loadCompanyPageInfo = async (context, company) => {
  const response = await fetchPageInfo(company);
  console.log(response);
  context.dispatch('updateCompanyPageInfo', response.data);
};

const updateCompanyPageInfo = (context, data) => {
  context.commit('UPDATE_COMPANY_PAGE_INFO', data);
};

export default {
  loadCompanyPageInfo,
  updateCompanyPageInfo,
};
