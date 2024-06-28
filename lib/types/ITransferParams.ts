import { Connection, Keypair } from "@solana/web3.js";

export interface ITransferParams {
    walletFrom: Keypair;
    walletTo: Keypair;
    sol?: number;
    coinAddress?: string;
    payerWallet?: Keypair;
    fee?: number;
    connection?: Connection;
}
