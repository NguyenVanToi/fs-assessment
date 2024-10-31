import nock from 'nock';

import servers from "../mock/servers.json";
import { findServer } from './serverController';

describe('findServer', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  test('returns online server with lowest priority', async () => {
    servers.forEach((server) => {
      nock(server.url).get('/').reply(200);
    });

    const result = await findServer(servers);

    expect(result).toEqual(servers[0]);
  });

  test('throws error if no servers are online', async () => {
    servers.forEach((server) => {
      nock(server.url).get('/').reply(500);
    });

    await expect(findServer(servers)).rejects.toThrow('No servers are online');
  });
});
