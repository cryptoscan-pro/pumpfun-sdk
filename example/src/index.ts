import { getBalance, getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';
import 'dotenv/config'
import { Connection } from '@solana/web3.js';

const connectionUrl = process.env.WS_CONNECTION_URL;
const connection = connectionUrl ? new Connection(process.env.CONNECTION_URL!, {wsEndpoint: connectionUrl }) : undefined;
const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = 0.01;
const api = new PumpApi({ connection });
console.log(wallet.publicKey.toString())

api.buy({
  wallet,
  coinAddress,
  sol,
}).then((tx) => console.log(tx))
