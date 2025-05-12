const pg = require("pg");

const connectionString = "postgres://postgres:12345@localhost:5432/node_postgres";
const db = new pg.Client({connectionString});

async function insertPokemon() {
    await db.connect();

    /*const query = `INSERT INTO "public"."pokemon" (name, type) VALUES ('Sprigatito', 'Grass')`;
    const result1 = await db.query(query);
    console.log(result1);*/

    //Inserting by dynamics data
    const pokemon = { name: 'Quaxly', type: 'Water'};
    const result2 = await db.query(
        `INSERT INTO "pokemon" (name, type) VALUES ($1, $2)`,
        [pokemon.name, pokemon.type]
    );
    console.log(result2);

    await db.end();
}

insertPokemon();