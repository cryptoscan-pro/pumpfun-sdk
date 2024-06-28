import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { describe, test, expect } from 'bun:test';
import { PumpApi } from '../PumpApi';
import { Connection } from '@solana/web3.js';

describe('Test transfer sell', () => {
  test('Should transfer and sell', async () => {
    const api = new PumpApi({
      connection: new Connection(process.env.CONNECTION_URL!),
    });
    const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
    const buyWallet = getWallet(process.env.BUYER_WALLET!);
    const mainWallet = getWallet(process.env.SECRET_KEY!);

    const tx = await api.transferSell({
      mainWallet,
      wallet: buyWallet,
      coinAddress,
    })

    console.log('TX:', tx)

    expect(typeof tx === 'string').toBe(true)
    expect(!!tx).toBe(true)
  }, 15000)
})
