export interface PumpCoin {
    name: string;
    description: string;
    mint: string;
    symbol: string;
    twitter: string;
    telegram: string;
    boding_curve: string;
    bonding_curve: string;
    associated_bonding_curve: string;
    creator: string;
    created_timestamp: number;
    raydium_pool: number | null;
    complete: boolean;
    virtual_sol_reserves: number;
    virtual_token_reserves: number;
    total_supply: number;
    website: string | null;
    king_of_the_hill_timestamp: null | string;
    market_cap: number;
    last_reply: number | null;
    nsfw: boolean;
    market_id: number | null;
    inverted: number | null;
    username: string;
    profile_image: string;
    usd_market_cap: number;
    image_uri: string;
}
