import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 4000,
  duration: '60s'
}

export default function() {
  let random = Math.floor(Math.random() * (10000000)) + 1;
  let res = http.get(`http://localhost:3003/api/users/${random}`);
  check(res, { 'status was 200': r => r.status == 200 });
  sleep(1)
}


