import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { describe, test, expect } from 'bun:test';
import { PumpApi } from '../PumpApi';
import { Connection } from '@solana/web3.js';

describe('Test bump', () => {
  test('Should bump', async () => {
    const api = new PumpApi({
      connection: new Connection(process.env.CONNECTION_URL!),
    });
    const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
    const wallet = getWallet(process.env.SECRET_KEY!);

    const tx = await api.bump({
      payerWallet: wallet,
      wallets: [wallet, wallet],
      coinAddress,
      minSol: 0.01,
      maxSol: 0.02,
    })

    console.log('TX:', tx)

    expect(typeof tx === 'string').toBe(true)
    expect(!!tx).toBe(true)
  })
})
