import WebSocket from 'ws';
import { CreateSwapParams, CreateTransferParams, swap } from "@cryptoscan/swap-sdk";
import { getRate } from '@cryptoscan/scanner-sdk';
import { Connection } from "@solana/web3.js";
import { TransferParams } from './types/TransferParams.js';
import { BuyParams } from "./types/BuyParams.js";
import { PumpApiParams } from "./types/PumpApiParams.js";
import { SellParams } from "./types/SellParams.js";
import { PumpCoin } from "./types/index.js";
import { SwapParams } from '@cryptoscan/swap-sdk';
import { getBalance } from '@cryptoscan/solana-wallet-sdk';

export class PumpApi {
	protected readonly params: PumpApiParams = {
		buySlippage: 1,
		sellSlippage: 10,
		bumpSlippage: 10,
		buyFee: 0.00005,
		sellFee: 0.00005,
		transferFee: 0.00005,
		connection: new Connection('https://api.mainnet-beta.solana.com/'),
	}

	public constructor(params?: Partial<PumpApiParams>) {
		if (params) {
			this.params = {
				...this.params,
				...params,
			}
		}
	}

	public async buy(_params: BuyParams): Promise<string> {
		const params: SwapParams<Omit<CreateSwapParams, 'walletAddress'>> = {
			..._params,
			type: 'swap',
			network: 'solana',
			service: 'pumpfun',
			amount: _params.sol,
			wallet: _params.payerWallet || _params.wallet,
			from: 'So11111111111111111111111111111111111111112',
			to: _params.coinAddress,
			fee: _params.fee || this.params.buyFee,
			slippage: _params.slippage || this.params.buySlippage,
			connection: this.params.connection,
		};

		return swap(params);
	}

	public async sell(_params: SellParams): Promise<string> {
		let sol = _params.sol;
		let amount: number | undefined;

		if (!_params.sol) {
			const balance = await getBalance(_params.wallet.publicKey.toString(), _params.coinAddress);
			amount = balance;
		}
		if (!amount) {
			amount = await getRate({
				network: 'solana',
				service: 'pumpfun',
				from: 'So11111111111111111111111111111111111111112',
				to: _params.coinAddress,
				amount: sol,
			}).then((r) => r?.amount)
		}

		if (!amount) {
			throw new Error('Failed to get price')
		}

		const params: SwapParams<Omit<CreateSwapParams, 'walletAddress'>> = {
			..._params,
			type: 'swap',
			network: 'solana',
			service: 'pumpfun',
			amount,
			wallet: _params.payerWallet || _params.wallet,
			from: _params.coinAddress,
			to: 'So11111111111111111111111111111111111111112',
			fee: _params.fee || this.params.sellFee,
			slippage: _params.slippage || this.params.sellSlippage,
			connection: this.params.connection,
		};

		return swap(params);
	}

	public async transfer(_params: TransferParams): Promise<string> {
		let amount = _params.sol;

		if (!_params.sol) {
			amount = await getBalance(_params.walletFrom.publicKey.toString());
		}
		if (!!_params.coinAddress || _params.coinAddress?.toLowerCase() === 'so11111111111111111111111111111111111111112') {
			amount = await getRate({
				network: 'solana',
				service: 'pumpfun',
				from: 'So11111111111111111111111111111111111111112',
				to: _params.coinAddress,
				amount,
			}).then((r) => r?.amount)

			if (!amount) {
				throw new Error('Failed to get price')
			}
		}

		const params: SwapParams<CreateTransferParams> = {
			..._params,
			type: 'transfer',
			network: 'solana',
			wallet: _params.payerWallet || _params.walletFrom,
			coinAddress: _params.coinAddress || 'So11111111111111111111111111111111111111112',
			from: _params.walletFrom.publicKey.toString(),
			to: _params.walletTo.publicKey.toString(),
			amount: amount!,
			fee: _params.fee || this.params.transferFee,
			connection: this.params.connection,
		};

		return swap(params)
	}

	public async listenTransactions(address: string, onTransaction: (transaction: Record<string, unknown>) => void) {
		throw new Error('is not implemented')
	}

	public listenCoinBump(coinAddress: string, onBump: (coin: PumpCoin) => void) {
		return this.listenPumpFun((type, coin) => {
			if (type === 'tradeCreated' && coin.mint === coinAddress) {
				onBump(coin);
			}
		});
	}

	public waitMint(coinAddress: string): Promise<PumpCoin> {
		return new Promise((resolve) => {
			const stop = this.onMint((coin) => {
				if (
					coin.mint === coinAddress
					|| coin.symbol.toLowerCase() === coinAddress.toLowerCase()
					|| coin.name.toLowerCase() === coinAddress.toLowerCase()
				) {
					stop();
					resolve(coin);
				}
			});
		});
	}

	public onMint(callback: (data: PumpCoin) => void): () => void {
		return this.listenPumpFun((_, coin) => {
			const duration = (Date.now() - coin.created_timestamp) / 1000;
			if (duration <= 2) {
				callback(coin);
			}
		});
	}

	public onBump(callback: (data: PumpCoin) => void): () => void {
		return this.listenPumpFun((type, coin) => {
			if (type === 'tradeCreated') {
				callback(coin);
			}
		});
	}

	private listenPumpFun(callback: (type: string, data: PumpCoin) => void): () => void {
		const socketUrl = 'wss://frontend-api.pump.fun/socket.io/?EIO=4&transport=websocket';
		let ws = new WebSocket(socketUrl, undefined, {
			// agent: new SocksProxyAgent('socks://z34VxR:2rF0MqMYH1@46.8.223.195:5501'),
		});
		const close = () => {
			ws.close();
		}
		if (!ws) {
			console.log('no ws')
			return close;
		}

		ws.on('open', () => {
			console.log('Connected to the WebSocket');
			ws.send('40')
		});

		ws.on('message', (data: any) => {
			const text = data.toString('utf-8');
			try {
				const [type, coin] = JSON.parse(text.replace(/^42/, ''));
				if (!coin) {
					return;
				}
				if ('data' in coin) {
					callback(type, JSON.parse(coin.data.subscribe.data).payload)
					return;
				}
				callback(type, coin);
			} catch {
			}
		});

		ws.on('close', async () => {
			console.log('Disconnected from the PumpApi WebSocket');
			new Promise((resolve) => setTimeout(resolve, 500))
			return this.listenPumpFun(callback);
		});

		ws.on('error', (error: any) => {
			console.error('WebSocket error:', error);
		});

		return close;
	}
}
