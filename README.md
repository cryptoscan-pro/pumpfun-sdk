# @cryptoscan/pumpfun-sdk

The fastest and easiest way to trade on pumpfun

- Buy/Sell coin
- **Multi-wallets** support
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
- `sol` - amount of SOL to buy, if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee
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
- `sol` - amount of SOL to sell, if empty - all balance
- `coinAddress` - coin address
- `fee` - amount of SOL to pay fee
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
- `sol` - amount of SOL to transfer, if empty - all balance
- `coinAddress` - coin address (Optional)
- `fee` - amount of SOL to pay fee
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

## Transfer Solana Example

Request

- `wallet` - wallet keypair (by secret key)
- `sol` - amount of tokens in SOL to transfer, if empty - all balance
- `coinAddress` - coin address (Optional)
- `fee` - amount of SOL to pay fee
- `payerWallet` - payer wallet keypair (Optional)
- `slippage` - amount of slippage (example: 20)

Response

`txid` string - transaction hash

```javascript
import { getWallet } from '@cryptoscan/solana-wallet-sdk';
import { pumpApi } from '@cryptoscan/pump-sdk';

const wallet = getWallet(process.env.SECRET_KEY!);
const sol = 0.1;
const coinAddress = 'HJAoYbnsf16Z8ftk3SsuShKLQQgzmxAPu41RTpjjpump';
const api = new PumpApi();

api.transfer({
  wallet,
  sol,
  coinAddress,
})
```

## FAQ

<details>
  <summary>Is it secure to use sdk with private key?</summary>

  You don't share private key through api request.
  You sign transaction with private key locally only.
  Library is based on [@cryptoscan/swap-sdk](https://docs.cryptoscan.pro/swap/sdk)
</details>

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run lib/index.ts
```

This project was created using `bun init` in bun v1.1.0. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
