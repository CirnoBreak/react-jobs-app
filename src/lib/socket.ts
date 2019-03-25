import io from 'socket.io-client';

io.socket = io();

export const socket = io.socket;