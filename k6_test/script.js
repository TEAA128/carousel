import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 200,
  duration: '10s'
};

export default function() {
  let random = Math.floor(Math.random() * (10000000)) + 1;
  http.get(`http://localhost:3003/api/users/${random}`);
  sleep(1)
}