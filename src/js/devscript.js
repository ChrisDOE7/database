let pokemonRepository = (function() {
   let pokemonList = [];
   let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

   function showLoadingMessage() {
      let loadingMessage = document.createElement('div');
      loadingMessage.innerHTML = 'Loading...';
      loadingMessage.id = 'loadingMessage';
      document.body.appendChild(loadingMessage);
   }

   function hideLoadingMessage() {
      let loadingMessage = document.getElementById('loadingMessage');
      document.body.removeChild(loadingMessage);
   }

   function add(pokemon) {
      if (
         typeof pokemon === 'object' &&
         'name' in pokemon // &&
         // "detailsUrl" in pokemon
      ) {
         pokemon.name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
         pokemonList.push(pokemon);
         console.log('Done');
      } else {
         console.log('pokemon is not correct');
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
      let pokemonList = document.querySelector('.list-group');
      let listItem = document.createElement('button');
      listItem.innerText = pokemon.name;
      listItem.classList.add(
         'list-group-item',
         'list-group-item-action',
         'btn',
         'btn-primary',
         'pokemon-button'
      );
      $('.list-group-item').attr('data-toggle', 'modal');
      $('.list-group-item').attr('type', 'button');
      $('.list-group-item').attr('data-target', '#exampleModal');

      listItem.toggleAttribute('modal');
      pokemonList.appendChild(listItem);
      listItem.addEventListener('click', function() {
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
            item.types = details.types;
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
      let modalBody = $('.modal-body');
      let modalTitle = $('.modal-title');
      // let modalHeader = $('.modal-header');

      modalTitle.empty();
      modalBody.empty();

      let titleElement = $('<h1>' + item.name + '<h1>');
      let imageElement = $(
         '<img class="modal-img mx-auto d-block" width="200px">'
      );
      imageElement.attr('src', item.imageUrl);
      imageElement.attr('alt', 'front image of the selected pokemon');
      let idElement = $('<p>ID: ' + item.id + '</p>');
      let heightElement = $('<p>Height: ' + item.height / 10 + ' m</p>');
      let weightElement = $('<p>Weight: ' + item.weight + ' lbs</p>');
      let typeElement = $('<p>Type: ' + item.types + '</p>');

      modalTitle.append(titleElement);
      modalBody.append(imageElement);
      modalBody.append(idElement);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typeElement);
   }

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
