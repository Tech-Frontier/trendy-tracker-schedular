import axios from 'axios';

const { TTAPI_TOKEN = '' } = process.env;

if (TTAPI_TOKEN === '') {
  throw new Error(`TTAPI_TOKEN 가 주어지지 않았습니다.`);
}

const ttapi = axios.create({
  baseURL: 'https://api.trendy-tracker.kr',
});

ttapi.defaults.headers.common = {
  'Authorization': `Bearer ${TTAPI_TOKEN}`
};

export { ttapi };
