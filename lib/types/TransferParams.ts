import { Connection, Keypair } from "@solana/web3.js";

export interface TransferParams {
    walletFrom: Keypair;
    walletTo: Keypair;
    sol?: number;
    coinAddress?: string;
    payerWallet?: Keypair;
    fee?: number;
    connection?: Connection;
}
