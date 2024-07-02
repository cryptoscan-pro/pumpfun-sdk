import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';
import 'dotenv/config'

const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = 0.01;
const api = new PumpApi();

api.buy({
  wallet,
  coinAddress,
  sol,
}).then((tx) => console.log(tx))
