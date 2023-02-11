import { Server } from 'socket.io';
import server from './server';
import { ConfigKeysEnum, getConfig } from './utils';

const origin = getConfig(ConfigKeysEnum.FRONTEND_BASE_URL) || '';

const io = new Server(server, {
  cors: {
    origin,
    methods: ['GET', 'PUT'],
  },
});

io.on('connection', (socket) => {
  console.info('User connected:', socket.id);

  socket.broadcast.emit('user connected', {
    userId: socket.id,
    // username: socket.handshake.auth.username,
  });

  socket.on('connected_user', (arg) => {
    console.info(arg);
    console.info(Array.from(io.of('/').sockets).map((a) => a[1].handshake.auth));
  });

  socket.on('disconnect', () => {
    console.info('User disconnected:', socket.id);
  });
});
