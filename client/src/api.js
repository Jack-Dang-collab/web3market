import axios from 'axios';
import io from 'socket.io-client';

const API_URL = 'http://localhost:7800';

export const login = async ({ walletAddress, username }) => {
  const response = await axios.post(`${API_URL}/api/login`, {
    walletAddress,
    username,
  });
  return response.data;
};

export const joinChatRoom = ({ recipientWalletAddress }, onMessageReceived) => {
  const socket = io(API_URL, {
    auth: {
      walletAddress: localStorage.getItem('walletAddress'),
    },
  });

  socket.emit('joinRoom', { recipientWalletAddress });

  socket.on('chatMessage', onMessageReceived);

  return socket;
};

export const sendMessage = (socket, message) => {
  socket.emit('chatMessage', message);
};
