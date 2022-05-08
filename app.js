
//Global Variables
const express = require('express');
const app = express();
const fs = require('fs');

var source = readJsonFile('data.json');
var recipes = source.recipes;

app.use(express.json());

// All GET routes
app.get('/', (req, res) => {            // Gets all data
    res.send(source);
});

app.get('/recipes', (req, res) => {     // Gets all recipe names-only
    var recipeNames = new Array;
    for(let i = 0; i < recipes.length; i++){
         recipeNames[i] = recipes[i].name;
    }
    const arr = {
        recipeNames
    }
    res.status(200).send(arr);
});

app.get('/recipes/details/:name', (req, res) => { // Gets details on recipe
    const empty = {};
    const recipe = recipes.find(c => c.name === req.params.name);
    if (!recipe) return res.status(200).send(empty);

    ingredients = recipe.ingredients;
    const details = {
        "details":
        {
            recipeIng
        }
    };
    res.send(details);
});

// POST route to add recipes
app.post('/recipes', (req, res) => {            // Adds new recipe
    const newRecipe = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    };

    const recipe = recipes.find(c => c.name === newRecipe.name);
    if (recipe) return res.status(404).send("Recipe already exists");

    recipes.push(newRecipe);
    res.status(201).send(newRecipe);
});

// PUT route to updatge recipes
app.put('/recipes', (req, res) => {         // Updates existing recipe

    const inList = {
        name: req.body.name,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions
    };

    const update = recipes.find(c => c.name === inList.name);
    if (!update) return res.status(404).send("Recipe does not exist.");

    update.name = req.body.name;
    update.ingredients = req.body.ingredients;
    update.instructions = req.body.instructions;
    
    return res.status(204).send(update);
});

// DELETE route
app.delete('/recipes/:name', (req, res) => {        // deletes recipes by name.
    const recipe = recipes.find(c => c.name === req.params.id);
    if (!recipe) return res.status(404).send('The recipe was not found.');

    const index = recipes.indexOf(recipe);
    recipes.splice(index, 1);

    res.status(200).send(recipe);
});


function readJsonFile(file) {
    let bufferData = fs.readFileSync(file);
    let stData = bufferData.toString();
    let data = JSON.parse(stData);
    return data;
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));