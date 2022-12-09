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
         type: ["Bug"]
      },
      {
         name: "Weedle",
         ID: "#13",
         height: 0.3,
         type: ["Bug"]
      }
   ];

   function getAll() {
      return pokemonList;
   }

   function add(pokemon) {
      if (
         typeof pokemon === "object" &&
         "name" in pokemon &&
         "height" in pokemon &&
         "types" in pokemon
      ) {
         pokemonList.push(pokemon);
         console.log("Done");
      } else {
         console.log("pokemon is not correct");
      }
   }

   function filterPokemon(pokemonName) {
      return pokemonList.filter(
         p => p.name.toLowerCase() === pokemonName.toLowerCase()
      );
   }

   function addListItem(pokemon) {
      let pokemonList = document.querySelector(".pokemon-list");
      let listItem = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("pokemonButton");
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener("click", function() {
         showDetails(pokemon.name);
      });
   }

   function showDetails(pokemon) {
      console.log(pokemon);
   }

   return {
      getAll,
      add,
      filterPokemon,
      addListItem,
      showDetails
   };
})();

pokemonRepository.getAll().forEach(function(pokemon) {
   pokemonRepository.addListItem(pokemon);
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
