import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { describe, test, expect } from 'bun:test';
import { PumpApi } from '../PumpApi';
import { Connection } from '@solana/web3.js';

describe('Test buy', () => {
  test('Should buy', async () => {
    const api = new PumpApi({
      connection: new Connection(process.env.CONNECTION_URL!),
    });
    const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
    const wallet = getWallet(process.env.SECRET_KEY!);

    const tx = await api.buy({
      wallet,
      coinAddress,
      sol: 0.01,
      priorityFee: 0.00001,
    })

    console.log('TX:', tx)

    expect(typeof tx === 'string').toBe(true)
    expect(!!tx).toBe(true)
  })
})
