let pokemonRepository=function(){let t=[];function e(){let t=document.createElement('div');t.innerHTML='Loading...',t.id='loadingMessage',document.body.appendChild(t)}function n(){let t=document.getElementById('loadingMessage');document.body.removeChild(t)}function o(e){'object'==typeof e&&'name'in e?(e.name=e.name[0].toUpperCase()+e.name.slice(1),t.push(e),console.log('Done')):console.log('pokemon is not correct')}function i(){return t}function a(t){return e(),fetch(t.detailsUrl).then(function(t){return t.json()}).then(function(e){n(),t.imageUrl=e.sprites.front_default,t.height=e.height,t.weight=e.weight,t.types=e.types,t.id=e.id,t.location=e.location}).catch(function(t){n(),console.error(t)})}function r(t){a(t).then(function(){var e;let n,o,i,a,r,p,l,m;e=t,n=$('.modal-body'),o=$('.modal-title'),$('.modal-header'),o.empty(),n.empty(),i=$('<h1>'+e.name+'<h1>'),a=$('<img class="modal-img mx-auto d-block" width="200px">'),a.attr('src',e.imageUrl),a.attr('alt','front image of the selected pokemon'),r=$('<p>ID: '+e.id+'</p>'),p=$('<p>Height: '+e.height/10+' m</p>'),l=$('<p>Weight: '+e.weight+' lbs</p>'),m=$('<p>Type: '+e.types+'</p>'),o.append(i),n.append(a),n.append(r),n.append(p),n.append(l),n.append(m)})}return{add:o,getAll:i,addListItem:function t(e){let n=document.querySelector('.list-group'),o=document.createElement('button');o.innerText=e.name,o.classList.add('list-group-item','list-group-item-action','btn','btn-primary','pokemon-button'),$('.list-group-item').attr('data-toggle','modal'),$('.list-group-item').attr('type','button'),$('.list-group-item').attr('data-target','#exampleModal'),o.toggleAttribute('modal'),n.appendChild(o),o.addEventListener('click',function(){r(e)})},filterPokemon:function e(n){return t.filter(t=>t.name.toLowerCase()===n.toLowerCase()).map(t=>(t.name=t.name[0].toUpperCase()+t.name.slice(1),t))},loadList:function t(){return e(),fetch('https://pokeapi.co/api/v2/pokemon/?limit=151').then(function(t){return t.json()}).then(function(t){n(),t.results.forEach(function(t){let e={name:t.name,detailsUrl:t.url};o(e),console.log(e)})}).catch(function(t){n(),console.error(t)})},loadDetails:a,showDetails:r,showLoadingMessage:e,hideLoadingMessage:n}}();pokemonRepository.loadList().then(function(){pokemonRepository.getAll().forEach(function(t){pokemonRepository.addListItem(t)})});