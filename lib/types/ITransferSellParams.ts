import { ISendSolanaTransactionParams } from "@cryptoscan/solana-send-transaction";
import { Keypair } from "@solana/web3.js";

export interface ITransferSellParams extends ISendSolanaTransactionParams {
    mainWallet: Keypair;
    payerWallet?: Keypair;
    wallet: Keypair;
    coinAddress: string;
    sol?: number;
    slippage?: number;
    fee?: number;
}
