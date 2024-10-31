import { Server } from '../interface/type';
import { checkServerStatus } from '../utils/httpClient';

export async function findServer(servers: Server[]): Promise<Server> {
  const results = await Promise.allSettled(servers.map((server) => checkServerStatus(server)));
  const onlineServers = results
    .filter(result => result.status === 'fulfilled')
    .map(item => item.value)
    .sort((a, b) => (a!.priority - b!.priority));

  if (onlineServers.length === 0) {
    throw new Error('No servers are online');
  }

  return onlineServers[0] as Server;
}
