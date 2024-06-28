import { ISendSolanaTransactionParams } from "@cryptoscan/solana-send-transaction";
import { Keypair } from "@solana/web3.js";

export interface TransferSellParams extends ISendSolanaTransactionParams {
    mainWallet: Keypair;
    wallet: Keypair;
    coinAddress: string;
    sol?: number;
    payerWallet?: Keypair;
    slippage?: number;
    fee?: number;
}
