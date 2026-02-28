import chalk from "chalk"

/* interface's */
export interface Characters {
    id: string,
    alias: string,
    bio: string,
    base_hp: number,
    is_original_hero: boolean,
    release_date: string,
    portrait_url: string,
    role: string,
    abilities: string[],
    home_region: Regions;
}

export interface Regions {
    id : string,
    name: string,
    country: string,
    type: string
}



/* Chalk */
export const error = chalk.bold.red;
export const warning = chalk.hex('#FFA500');
export const textColor = chalk.gray;
export const titleColor = chalk.gray.grey;

