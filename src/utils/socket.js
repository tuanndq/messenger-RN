import {io} from 'socket.io-client';
import {SOCKER_SERVER_URL} from './ip';

export const socket = io(SOCKER_SERVER_URL, {
  transports: ['websocket'],
  jsonp: false,
});
