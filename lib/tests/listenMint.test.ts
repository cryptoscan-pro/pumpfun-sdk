import { describe, test } from 'vitest';
import { PumpApi } from '../PumpApi.js';

const TIMEOUT = 60 * 1000;

describe('Listen coin create', () => {
  test('Should listen mint', async () => {
    const api = new PumpApi();

    api.onMint((coin) => {
      console.log(coin);
    })
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT))
  }, TIMEOUT)
})
