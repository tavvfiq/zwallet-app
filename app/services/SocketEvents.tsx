import React, {useEffect, useContext, useState} from 'react';
import _ioClient from 'socket.io-client';
import {SOCKET_URL} from '../utils/environment';

const SocketContext = React.createContext<SocketIOClient.Socket | undefined>(
  undefined,
);

export function useSocket() {
  return useContext(SocketContext);
}

type SocketProps = {
  id: number;
  children: React.ReactNode;
};

export function SocketProvider({id, children}: SocketProps) {
  const [socket, setSocket] = useState<SocketIOClient.Socket>();

  useEffect(() => {
    const newSocket = _ioClient(SOCKET_URL, {query: {id}});
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
