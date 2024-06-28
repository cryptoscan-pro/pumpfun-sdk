import { createTransaction, swap } from "@cryptoscan/swap-sdk";
import { IPumpApiParams } from "./types/IPumpApiParams";
import { IBuyParams } from "./types/IBuyParams";
import { ISellParams } from "./types/ISellParams";
import { Connection } from "@solana/web3.js";
import { IBumpParams } from "./types/IBumpParams";
import sendTransaction from '@cryptoscan/solana-send-transaction'
import { ITransferBuyParams } from "./types/ITransferBuyParams";
import { createWallet, getBalance } from "@cryptoscan/solana-wallet-sdk";
import { ITransferSellParams } from "./types/ITransferSellParams";
import { getRate } from "@cryptoscan/scanner-sdk";
import { ITransferParams } from "./types/ITransferParams";

export class PumpApi {
	protected readonly params: IPumpApiParams = {
		buySlippage: 10,
		sellSlippage: 10,
		buyFee: 0.00005,
		sellFee: 0.00005,
		transferFee: 0.00005,
		connection: new Connection('https://api.mainnet-beta.solana.com/'),
	}

	public constructor(params?: Partial<IPumpApiParams>) {
		if (params) {
			this.params = {
				...this.params,
				...params,
			}
		}
	}

	public async buy(params: IBuyParams): Promise<string | Error> {
		if (!params.payerWallet) {
			params.payerWallet = params.wallet;
		}

		return swap({
			wallet: params.wallet,
			from: 'sol',
			to: params.coinAddress,
			amount: params.sol,
			slippage: params.slippage || this.params.buySlippage,
			fee: params.fee || this.params.buyFee,
			connection: params.connection || this.params.connection,
			sendOptions: params?.sendOptions,
		});
	}

	public async sell(params: ISellParams): Promise<string | Error> {
		if (!params.payerWallet) {
			params.payerWallet = params.wallet;
		}

		return swap({
			wallet: params.wallet,
			from: params.coinAddress,
			to: 'sol',
			amount: params.sol,
			slippage: params.slippage || this.params.buySlippage,
			fee: params.fee || this.params.buyFee,
			connection: params.connection || this.params.connection,
			sendOptions: params?.sendOptions,
		});
	}

	public async transfer(params: ITransferParams): Promise<string | Error> {
		if (!params.payerWallet) {
			params.payerWallet = params.walletFrom;
		}

		const transaction = await createTransaction({
			payerAddress: params.payerWallet.publicKey.toString(),
			instructions: [
				{
					type: 'budgetPrice',
					sol: params.fee || this.params.transferFee,
				},
				{
					type: 'transfer',
					coinAddress: params.coinAddress,
					fromAddress: params.walletFrom.publicKey.toString(),
					toAddress: params.walletTo.publicKey.toString(),
					sol: params.sol,
				},
			],
		})

		if (transaction instanceof Error) {
			return transaction;
		}

		transaction.sign([params.walletFrom, params.walletTo, params.payerWallet]);

		return sendTransaction(transaction, {
			...params,
			connection: params.connection || this.params.connection
		});
	}

	public async bump(params: IBumpParams): Promise<string | Error> {
		const coinAddress = params.coinAddress;
		const getSol = () => Math.random() * (params.maxSol - params.minSol) + params.minSol

		const transaction = await createTransaction({
			payerAddress: params.payerWallet.publicKey.toString(),
			instructions: params.wallets.map((w) => ({
				type: 'buy',
				service: 'pumpfun',
				coinAddress,
				walletAddress: w.publicKey.toString(),
				sol: getSol(),
				slippage: params.slippage || this.params.buySlippage,
				fee: params.fee || this.params.buyFee,
			})),
		})

		if (transaction instanceof Error) {
			return transaction;
		}

		transaction.sign(params.wallets.concat(params.payerWallet))

		return sendTransaction(transaction, {
			...params,
			connection: params.connection || this.params.connection
		});
	}

	public async transferBuy(params: ITransferBuyParams): Promise<string | Error> {
		if (!params.payerWallet) {
			params.payerWallet = params.mainWallet;
		}

		const coinAddress = params.coinAddress;
		const bufferWallet = createWallet();

		const transaction = await createTransaction({
			...params,
			payerAddress: params.payerWallet.publicKey.toString(),
			instructions: [
				{
					type: 'budgetPrice',
					sol: params.fee || this.params.transferFee,
				},
				{
					type: 'transfer',
					fromAddress: params.mainWallet.publicKey.toString(),
					toAddress: bufferWallet.publicKey.toString(),
					sol: params.sol * 1.01,
				},
				{
					type: 'transfer',
					fromAddress: bufferWallet.publicKey.toString(),
					toAddress: params.wallet.publicKey.toString(),
					sol: params.sol * 1.01,
				},
				{
					type: 'buy',
					service: 'pumpfun',
					coinAddress: coinAddress,
					walletAddress: params.wallet.publicKey.toString(),
					sol: params.sol * 1.01,
					slippage: params.slippage || this.params.buySlippage,
				}
			],
		})

		if (transaction instanceof Error) {
			return transaction;
		}

		transaction.sign([
			params.mainWallet,
			params.payerWallet,
			bufferWallet,
			params.wallet,
		])

		return sendTransaction(transaction, {
			...params,
			connection: params.connection || this.params.connection
		});
	}

	public async transferSell(params: ITransferSellParams): Promise<string | Error> {
		if (!params.payerWallet) {
			params.payerWallet = params.mainWallet;
		}

		let sellFee = 0;

		if (!params.sol) {
			const tokensAmount = await getBalance(params.wallet.publicKey.toString(), params.coinAddress)
			const rate = await getRate('sol', params.coinAddress, tokensAmount)

			if (rate instanceof Error) {
				throw rate;
			}

			params.sol = rate.result;
			sellFee = rate.fee;
		}

		const coinAddress = params.coinAddress;
		const bufferWallet = createWallet();

		const transaction = await createTransaction({
			...params,
			payerAddress: params.payerWallet.publicKey.toString(),
			instructions: [
				{
					type: 'budgetPrice',
					sol: params.fee || this.params.transferFee,
				},
				{
					type: 'sell',
					service: 'pumpfun',
					coinAddress: coinAddress,
					walletAddress: params.wallet.publicKey.toString(),
					sol: params.sol,
					slippage: params.slippage || this.params.buySlippage,
				},
				{
					type: 'transfer',
					fromAddress: params.wallet.publicKey.toString(),
					toAddress: bufferWallet.publicKey.toString(),
					sol: params.sol - sellFee,
				},
				{
					type: 'transfer',
					fromAddress: bufferWallet.publicKey.toString(),
					toAddress: params.mainWallet.publicKey.toString(),
					sol: params.sol - sellFee,
				},
			],
		})

		if (transaction instanceof Error) {
			return transaction;
		}

		transaction.sign([
			params.mainWallet,
			params.payerWallet,
			bufferWallet,
			params.wallet,
		])

		return sendTransaction(transaction, {
			...params,
			connection: params.connection || this.params.connection
		});
	}
}
