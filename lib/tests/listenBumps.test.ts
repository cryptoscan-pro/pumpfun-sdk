import { describe, test } from 'vitest';
import { PumpApi } from '../PumpApi.js';

const TIMEOUT = 60 * 1000;

describe('Listen bumps', () => {
  test('Should listen bumps', async () => {
    const api = new PumpApi();

    api.onBump((coin) => {
      console.log(coin);
    })
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT))
  }, TIMEOUT)
})
