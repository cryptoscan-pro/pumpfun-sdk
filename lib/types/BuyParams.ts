import { SendSolanaTransactionParameters } from "@cryptoscan/solana-send-transaction";
import { Keypair } from "@solana/web3.js";

export interface BuyParams extends SendSolanaTransactionParameters {
    wallet: Keypair;
    payerWallet?: Keypair;
    coinAddress: string;
    sol: number;
    slippage?: number;
    fee?: number;
    priorityFee?: number;
}
