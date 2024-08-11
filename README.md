# @cryptoscan/pumpfun-sdk

The fastest and easiest way to trade on pumpfun

- **Token Sniper** - waiting for token minting by symbol
- **Bump detector** of coin
- **Listen transactions** of coin (WIP)
- **Listen minted coins** - listen new coins in pumpfun
- Get rate/price of coin in USD/Solana
- Buy/Sell coin
- Transfer Pumpfun coins
- Transfer solana

[[GitHub]](https://github.com/cryptoscan-pro/pumpfun-sdk)
[[Our website]](https://cryptoscan.pro/)
[[Docs]](https://cryptoscan.pro/docs/)
[[Discord]](https://discord.gg/ktewAs67fE)

## Getting started

Let's see our [Project example](https://github.com/cryptoscan-pro/pumpfun-sdk/tree/main/example)

```
npm install @cryptoscan/pumpfun-sdk
```

## Buy Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of SOL to buy, (Optional) if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (Default: 1)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = 0.01;
const api = new PumpApi();

api.buy({
  wallet,
  coinAddress,
  sol,
})
```

## Sell Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of SOL to sell, (Optional) if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (Default: 10)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = undefined; // Sell all
const api = new PumpApi();

api.sell({
  wallet,
  coinAddress,
  sol,
})
```

## Transfer Solana Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of SOL to transfer, (Optional) if empty - all balance
- `coinAddress` - coin address (Optional)
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const sol = undefined; // All amount
const api = new PumpApi();

api.transfer({
  wallet,
  sol,
})
```

## Transfer Coins Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of coins in SOL to transfer, (Optional) if empty - all balance
- `coinAddress` - coin address (Optional)
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = 0.01;
const api = new PumpApi();

api.transfer({
  wallet,
  coinAddress,
  sol,
})
```

## Bump Solana Example

Request

- `payerWallet` - payer wallet keypair
- `wallets` - list of wallets to buy
- `minSol` - minimal SOL to buy by one wallet
- `maxSol` - maximal SOL to buy by one wallet
- `coinAddress` - coin address (Optional)
- `fee` - amount of SOL to pay fee (Optional)
- `slippage` - amount of slippage (example: 10)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const wallets = [wallet, wallet];
const minSol = 0.05;
const minSol = 0.1;
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const api = new PumpApi();

api.bump({
  payerWallet,
  coinAddress,
  wallets,
  minSol,
  maxSol,
})
```

## Transfer-Buy Example

- Transfer and buy in one transaction
- *Anti Bubble Map system*

Request

- `mainWallet`- main wallet keypair (by secret key)
- `payerWallet` - payer wallet keypair
- `wallet` - buyer wallet keypair
- `sol` - amount of SOL to buy, (Optional) if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (Default: 1)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const mainWallet = getWallet(process.env.SECRET_KEY!);
const wallet = getWallet(process.env.BUYER_KEY!);
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = 0.01;
const api = new PumpApi();

api.transferBuy({
  mainWallet,
  wallet,
  coinAddress,
  sol,
})
```

## Transfer-Sell Example

- Sell and transfer in one transaction
- *Anti Bubble Map system*

Request

- `mainWallet`- main wallet keypair (by secret key)
- `payerWallet` - payer wallet keypair
- `wallet` - seller wallet keypair
- `sol` - amount of SOL to sell, (Optional) if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (Default: 10)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const mainWallet = getWallet(process.env.SECRET_KEY!);
const wallet = getWallet(process.env.SELLER_KEY!);
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const sol = undefined; // Sell all
const api = new PumpApi();

api.transferSell({
  mainWallet,
  wallet,
  coinAddress,
  sol,
})
```

## Listen transactions

Request

- `coinAddress` - coin address
- `callback` - listen transaction callback
	- `tx` - transaction hash
	- `baseAmount` - amount of base coin
	- `quoteAmount` - amount of quote coin
	- `amount` - amount of base coin

```javascript
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const api = new PumpApi();
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';

api.listenTransactions(coinAddress, (transaction) => {
  console.log(transaction)
})
```

## Listen coin bumps

```javascript
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const api = new PumpApi();
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';

api.listenCoinBump(coinAddress, (coin) => {
  console.log('BUMPED')
})
```

## Listen pumpfun bumps

```javascript
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const api = new PumpApi();

api.onBump((coin) => {
  console.log(coin)
})
```

## Listen pumpfun mints (Just created coins)

```javascript
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const api = new PumpApi();

api.onMint((coin) => {
  console.log(coin)
})
```

## Wait pumpfun coin mint

Search coin by symbol or name, or address

```javascript
import { PumpApi } from '@cryptoscan/pumpfun-sdk';

const symbol = 'DOGEWIFHAT';
const api = new PumpApi();

api.waitMint(symbol, (coin) => {
  console.log(coin)
})
```

## FAQ

<details>
  <summary>Is it secure to use sdk with private key?</summary>

  Yes. You don't share private key through api request.
  You sign transaction with private key locally only.
  Library is based on [@cryptoscan/swap-sdk](https://docs.cryptoscan.pro/swap/sdk)
</details>
<details>
  <summary>Is it free?</summary>

  We charge a 0.5% fee on each successful transaction instruction. 
  If you want to decrease fee - please contact us in [discord](https://discord.gg/ktewAs67fE) or [telegram](https://t.me/nomoney_trader)
  We can increase fee down to 0.1% if you will contribute us.
</details>
<details>
  <summary>How to contribute?</summary>

  You can create pull requests or make a project based on our packages. 
  You have chance to get some supply for a work and get fee reduced for the api.
</details>

---

## Contribute

To install dependencies:

```bash
npm install
```

To build:

```bash
npm build
```

This project was created using `bun init` in bun v1.1.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
