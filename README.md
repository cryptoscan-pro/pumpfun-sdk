# @cryptoscan/pumpfun-sdk

The fastest and easiest way to trade on pumpfun

- Buy/Sell coin
- **Multi-wallets** support
- **Anti Bubble Map** system
- Transfer Pumpfun coins
- Transfer solana
- Buy/Sell/Transfer in 1 transaction
- Bump generator
- Bump's coin scanner

[[GitHub]](https://github.com/cryptoscan-pro/pumpfun-sdk)
[[Our website]](https://cryptoscan.pro/)
[[Docs]](https://docs.cryptoscan.pro/)
[[Discord]](https://discord.gg/ktewAs67fE)

## Docs

## Buy Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of SOL to buy, (Optional) if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee (Optional)
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (example: 20)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { pumpApi } from '@cryptoscan/pump-sdk';

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
- `slippage` - amount of slippage (example: 20)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { pumpApi } from '@cryptoscan/pump-sdk';

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
import { pumpApi } from '@cryptoscan/pump-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const sol = undefined; // All amount
const api = new PumpApi();

api.transfer({
  wallet,
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
- `slippage` - amount of slippage (example: 20)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { pumpApi } from '@cryptoscan/pump-sdk';

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
- `slippage` - amount of slippage (example: 20)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { pumpApi } from '@cryptoscan/pump-sdk';

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
- `slippage` - amount of slippage (example: 20)
- `priorityFee` - amount of SOL to pay priority fee (Optional)

Response

`txid` string - transaction hash

```javascript
import { pumpApi } from '@cryptoscan/pump-sdk';

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

## FAQ

<details>
  <summary>Is it secure to use sdk with private key?</summary>

  You don't share private key through api request.
  You sign transaction with private key locally only.
  Library is based on [@cryptoscan/swap-sdk](https://docs.cryptoscan.pro/swap/sdk)
</details>

---

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run lib/index.ts
```

This project was created using `bun init` in bun v1.1.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
