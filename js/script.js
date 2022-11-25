let pokemonList = [
   {
      name: "Bulbasur",
      ID: "#1",
      height: 0.7,
      type: ["Monster", "Grass"]
   },
   {
      name: "Charmander",
      ID: "#4",
      height: 0.6,
      type: ["Monster", "Dragon"]
   },
   {
      name: "Charizard",
      ID: "#6",
      height: 1.7,
      type: ["Monster", "Dragon"]
   },
   {
      name: "Squirtle",
      ID: "#7",
      height: 0.5,
      type: ["Monster", "Water"]
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

for (let i = 0; i < pokemonList.length; i++) {
   if (pokemonList[i].height > 1) {
      document.write(
         `${pokemonList[i].ID} ${pokemonList[i].name}: (height: ${pokemonList[i].height}m) Wow, that\’s big!`
      );
      document.write("<br>");
   } else {
      document.write(
         `${pokemonList[i].ID} ${pokemonList[i].name}: (height: ${pokemonList[i].height}m)`
      );
      document.write("<br>");
   }
}
// displays all objects including `height`-attribute and filters out the ones with attribute > 1 and adds a string to it
// line break for better readybility
