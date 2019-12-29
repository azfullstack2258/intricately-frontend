import instance from 'Services/api/api.config';

async function fetchPageInfo(company) {
  return instance.get('/company-page-info', { params: { company } });
}

export { fetchPageInfo };
