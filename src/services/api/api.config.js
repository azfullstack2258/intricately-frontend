import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { companyPageInfo } from 'Services/data/companyPageInfo';

const API_URL = '';
const instance = axios.create({
  baseURL: API_URL,
  timeout: 1000,
  headers: { 'X-CUSTOM-Header': 'foobar' },
});

const mock = new MockAdapter(instance, { delayResponse: 400 });

mock.onGet('/company-page-info', { params: { company: 'microsoft' } }).reply(200, companyPageInfo);

export default instance;
