let pokemonRepository = (function() {
   let pokemonList = [
      {
         name: "Bulbasur",
         ID: "#1",
         height: 0.7,
         type: ["Monster", " Grass"]
      },
      {
         name: "Charmander",
         ID: "#4",
         height: 0.6,
         type: ["Monster", " Dragon"]
      },
      {
         name: "Charizard",
         ID: "#6",
         height: 1.7,
         type: ["Monster", " Dragon"]
      },
      {
         name: "Squirtle",
         ID: "#7",
         height: 0.5,
         type: ["Monster", " Water"]
      },
      {
         name: "Caterpie",
         ID: "#10",
         height: 0.3,
         type: "Bug"
      },
      {
         name: "Weedle",
         ID: "#13",
         height: 0.3,
         type: "Bug"
      }
   ];

   return {
      getAll: function() {
         return pokemonList;
      },

      add: function(pokemon) {
         if (
            typeof Object.keys(pokemon) ===
            "object" /* &&
            pokemon !== null */
         ) {
            pokemonList.push(pokemon);
            console.log("Done");
         } else {
            return "No Pokemon, dude!";
         }
      }
   };
})();

pokemonRepository.getAll().forEach(item => {
   document.write(
      "<p>" +
         item.ID +
         " " +
         item.name +
         ": (height:" +
         item.height +
         "m) Type: " +
         item.type +
         "</p>"
   );
});

// function printPokemonList() {
//    for (let i = 0; i < pokemonList.length; i++) {
//       if (pokemonList[i].height > 1) {
//          document.write(
//             `<p>${pokemonList[i].ID} ${pokemonList[i].name}: (height: ${pokemonList[i].height}m) Wow, that\’s big!</p>`
//          );
//          document.write("<br>");
//       } else {
//          document.write(
//             `<p>${pokemonList[i].ID} ${pokemonList[i].name}: (height: ${pokemonList[i].height}m)</p>`
//          );
//          document.write("<br>");
//       }
//    }
// }
// printPokemonList();

// displays all objects including `height`-attribute and filters out the ones with attribute > 1 and adds a string to it
// line break for better readybility

/*Object.keys(pokemonList).forEach(function(_pokemon) {
         if (pokemon.height >= 1.7) {
            document.write(
               _pokemon.name + _pokemon.height + " - Wow, thats big!" + "</br>"
            );
         } else {
            document.write(_pokemon.name + _pokemon.height + "</br>");
         }
      });
      */
