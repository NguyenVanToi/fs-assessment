import { findServer } from './controllers/serverController';
import servers from "./mock/servers.json";

const main = async () => {
  try {
    const onlineServer = await findServer(servers);
    console.log('Online server:', onlineServer);
  } catch (error) {
    console.error((error as Error).message);
  }
}

main();
