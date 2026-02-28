/* Import packages,files (typescript),json */
/* --------------------------------------- */
import type { Characters } from "./type";
import type { Regions } from "./type";
import { readFile} from "fs/promises";
/*import dataCharacters from "./json/Characters.json"
import dataRegions from "./json/Regions.json"*/
import readline from "readline-sync";
import {error,warning,textColor,titleColor} from "./type";
import { rawListeners } from "cluster";
import { RegisterOptions } from "module";

const menuItems : string[] = ["View all data", "Filter by ID", "Exit"];
let exit:boolean = false;

async function getCharacters(): Promise<Characters[]>{
    try {
        const response = await import("./json/Characters.json")
        const data:Characters[] = await response.default || response;
        return data;
    }
    catch (error:any){
        return error;
    }
};

async function getRegions(): Promise<Regions[]> {
    try {
        const response = await import("./json/Regions.json");
        const data: Regions[] = await response.default || response;
        return data;
    }
    catch (error:any){
        return error;
    } 

    
}

function ShowAllCharacters (character : Characters[]){
    console.log("--- All Characters ---")

    const characterAndId = character.map(el => `=> ${el.alias} (${el.id})`).join('\n');

    console.log(characterAndId)
}

function FilterCharactersById (character : Characters[], searchId:string) {
    const characterFoundById = character
    .filter(el => el.id === searchId)
    .map(el => `
    --- Character found ---
    - id: ${el.id},
    - name: ${el.alias},
    - bio: ${el.bio},
    - base_hp: ${el.base_hp},
    - is_original_hero: ${el.is_original_hero},
    - release_date: ${el.release_date},
    - portrait_url: ${el.portrait_url},
    - role: ${el.role},
    - abilities: ${el.abilities},
    - home_region: ${el.home_region};
    `);

    if (characterFoundById.length > 0) {
        console.log(characterFoundById.join("\n"))
    }
    else {
        console.log(error(`Sorry, we cant find a character with the id "${searchId}"`))
    }
}

async function main() {
    do {
        console.log("Welcome to the JSON data viewer!");
        const answer = readline.keyInSelect(menuItems, "Please enter your choice:");
        

        try{
            const characters = await getCharacters();
            const regions = await getRegions();

            if (answer === 0) {
                console.log()
                ShowAllCharacters(characters);
                console.log();
            }
            else if(answer === 1){
                const searchId = readline.question("Please enter the ID you want to filter by: ")
                FilterCharactersById(characters,searchId)
            }
            else if(answer === 2 || answer === -1){
                exit = true;
            }
        }
        catch (error) {
            console.log(`Er ging iets mis bij het inlezen van de data. Controleer of characters.json bestaat.`)
        }
    } while (!exit);

}

main();




