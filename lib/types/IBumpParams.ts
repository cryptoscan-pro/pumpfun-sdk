import { ISendSolanaTransactionParams } from "@cryptoscan/solana-send-transaction";
import { Keypair } from "@solana/web3.js";

export interface IBumpParams extends ISendSolanaTransactionParams {
    coinAddress: string;
    payerWallet: Keypair;
    wallets: Keypair[];
    minSol: number;
    maxSol: number;
    slippage?: number;
    fee?: number;
}
