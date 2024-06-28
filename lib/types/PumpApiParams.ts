import type { Connection } from "@solana/web3.js";

export interface PumpApiParams {
    buySlippage: number;
    sellSlippage: number;
    buyFee: number;
    sellFee: number;
    transferFee: number;
    connection?: Connection;
}
