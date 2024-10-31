import axios from 'axios';

import { Server } from '../interface/type';

export async function checkServerStatus(server: Server): Promise<Server> {
  const response = await axios.get(server.url, { timeout: 5000 });
  if (response.status >= 200 && response.status < 300) {
    return server;
  }

  throw new Error('Server is offline');
}