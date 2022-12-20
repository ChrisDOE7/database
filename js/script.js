let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=151";

   function showLoadingMessage() {
      let loadingMessage = document.createElement("div");
      loadingMessage.innerHTML = "Loading...";
      loadingMessage.id = "loadingMessage";
      document.body.appendChild(loadingMessage);
   }

   function hideLoadingMessage() {
      let loadingMessage = document.getElementById("loadingMessage");
      document.body.removeChild(loadingMessage);
   }

   function add(pokemon) {
      if (
         typeof pokemon === "object" &&
         "name" in pokemon // &&
         // "detailsUrl" in pokemon
      ) {
         pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
         pokemonList.push(pokemon);
         console.log("Done");
      } else {
         console.log("pokemon is not correct");
      }
   }

   function getAll() {
      return pokemonList;
   }

   function filterPokemon(pokemonName) {
      return pokemonList
         .filter(p => p.name.toLowerCase() === pokemonName.toLowerCase())
         .map(p => {
            p.name = p.name[0].toUpperCase() + p.name.slice(1);
            return p;
         });
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
         showDetails(pokemon);
      });
   }

   function loadList() {
      showLoadingMessage();
      return fetch(apiUrl)
         .then(function(response) {
            return response.json();
         })
         .then(function(json) {
            hideLoadingMessage();
            json.results.forEach(function(item) {
               let pokemon = {
                  name: item.name,
                  detailsUrl: item.url
               };
               add(pokemon);
               console.log(pokemon);
            });
         })
         .catch(function(e) {
            hideLoadingMessage();
            console.error(e);
         });
   }

   function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url)
         .then(function(response) {
            return response.json();
         })
         .then(function(details) {
            hideLoadingMessage();
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.weight = details.weight;
            item.types = details.types.type;
            item.id = details.id;
            item.location = details.location;
         })
         .catch(function(e) {
            hideLoadingMessage();
            console.error(e);
         });
   }

   function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {
         showModal(pokemon);
      });
   }

   function showModal(item) {
      let modalContainer = document.querySelector("#modal-container");

      modalContainer.innerHTML = "";

      let modal = document.createElement("div");
      modal.classList.add("modal");

      let closeButtonElement = document.createElement("button");
      closeButtonElement.classList.add("modal-close");
      closeButtonElement.innerText = "close";
      closeButtonElement.addEventListener("click", hideModal);

      let imageElement = document.createElement("img");
      imageElement.classList.add("pokemon-image");
      imageElement.src = item.imageUrl;

      let titleElement = document.createElement("h1");
      titleElement.classList.add("modal-title");
      titleElement.innerText = item.name;

      let idElement = document.createElement("p");
      idElement.innerText = "ID: #" + item.id;

      let heightElement = document.createElement("p");
      heightElement.innerText = "Height: " + item.height / 10 + " m";

      let weightElement = document.createElement("p");
      weightElement.innerText = "Weight: " + item.weight + " lbs";

      // let typesElement = document.createElement("p");
      // typesElement.innerText = "Type: " + item.type;

      // let regionElement = document.createElement("p");
      // regionElement.innerText = "Region: " + item.location;

      modal.appendChild(closeButtonElement);
      modal.appendChild(imageElement);
      modal.appendChild(titleElement);
      modal.appendChild(idElement);
      modal.appendChild(heightElement);
      modal.appendChild(weightElement);
      // modal.appendChild(typesElement);
      // modal.appendChild(regionElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add("is-visible");

      modalContainer.addEventListener("click", e => {
         let target = e.target;
         if (target === modalContainer) {
            hideModal();
         }
      });
   }

   function hideModal() {
      let modalContainer = document.querySelector("#modal-container");
      modalContainer.classList.remove("is-visible");
   }

   window.addEventListener("keydown", e => {
      let modalContainer = document.querySelector("#modal-container");
      if (
         e.key === "Escape" &&
         modalContainer.classList.contains("is-visible")
      ) {
         hideModal();
      }
   });

   window.addEventListener("keydown", e => {
      let modalContainer = document.querySelector("#modal-container");
      if (
         e.key === "Escape" &&
         modalContainer.classList.contains("is-visible")
      ) {
         hideModal();
      }
   });

   document.querySelector("#show-modal").addEventListener("click", () => {
      showModal("Modal title", "this is the modal content!");
   });

   return {
      add,
      getAll,
      addListItem,
      filterPokemon,
      loadList,
      loadDetails,
      showDetails,
      showLoadingMessage,
      hideLoadingMessage
   };
})();

pokemonRepository.loadList().then(function() {
   pokemonRepository.getAll().forEach(function(pokemon) {
      pokemonRepository.addListItem(pokemon);
   });
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
