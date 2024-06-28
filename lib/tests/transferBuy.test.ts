import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { describe, test, expect } from 'bun:test';
import { PumpApi } from '../PumpApi';
import { Connection } from '@solana/web3.js';

describe('Test transfer buy', () => {
  test('Should transfer and buy', async () => {
    const api = new PumpApi({
      connection: new Connection(process.env.CONNECTION_URL!),
    });
    const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
    const buyWallet = getWallet(process.env.BUYER_WALLET!);
    const mainWallet = getWallet(process.env.SECRET_KEY!);

    const tx = await api.transferBuy({
      mainWallet,
      wallet: buyWallet,
      coinAddress,
      sol: 0.01,
    })

    console.log('TX:', tx)

    expect(typeof tx === 'string').toBe(true)
    expect(!!tx).toBe(true)
  }, 15000)
})
