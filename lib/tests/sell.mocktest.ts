import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { describe, test, expect } from 'vitest';
import { PumpApi } from '../PumpApi.js';
import { Connection } from '@solana/web3.js';

describe('Test sell', () => {
  test('Should sell', async () => {
    const api = new PumpApi({
      connection: new Connection(process.env.CONNECTION_URL!),
    });
    const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
    const wallet = getWallet(process.env.TEST_SECRET_KEY!);

    const tx = await api.sell({
      wallet,
      coinAddress,
    })

    console.log('TX:', tx)

    expect(typeof tx === 'string').toBe(true)
    expect(!!tx).toBe(true)
  })
})
