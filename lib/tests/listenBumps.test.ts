import { describe, expect, test } from 'vitest';
import { PumpApi } from '../PumpApi.js';

const TIMEOUT = 5 * 1000;

describe('Listen bumps', () => {
  test('Should listen bumps', async () => {
    let idx = 0;
    const api = new PumpApi();

    api.onBump((coin) => {
      if ('signature' in coin) {
				console.log(coin.mint)
        idx += 1;
      }
    })
    await new Promise((resolve) => setTimeout(resolve, TIMEOUT))

    expect(idx > 5);
  }, TIMEOUT)
})
