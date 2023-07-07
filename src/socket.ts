import { Server } from 'socket.io';
import server from './server';
import { ConfigService } from './services';

const io = new Server(server, {
  cors: {
    origin: ConfigService.get('FRONTEND_BASE_URL'),
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
