import instance from 'Services/api/api.config';

export async function pageInfoApi(payload) {
  switch(payload?.method) {
    case 'GET':
    default:
      return await instance.get('/company-page-info', payload?.data);
  }
}
