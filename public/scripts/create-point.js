function populateUfs() {
    const ufSelect = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then( (res) => res.json() )
        .then(states => {
            for( const state of states ) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}

populateUfs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const ufValue = event.target.value;

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = '<option value>Selecione a Cidade</option>';
    citySelect.disabled = false;
          
    fetch(url)
      .then( (res) => res.json() )
        .then(cities => {
            for( const city of cities ) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false;

        })
}


document
  .querySelector('select[name=uf]')
  .addEventListener('change', getCities)


// Itens de coleta
// 

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
  item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  // toggle = adicionar ou remover um classe
  // se existir a classe ele remove
  // se nao existir ele coloca
  itemLi.classList.toggle('selected')

  const itemId = itemLi.dataset.id;

  // verficar se existem items selecionados
  // se sim, pegar os items selecionados
  const alreadySelected = selectedItems.findIndex( item =>  {
    const itemFound = item == itemId;  // isso será true ou false
    return itemFound;
  });

  // se ja estiver seleciondo
  if(alreadySelected >= 0) {
    // tirar da seleção
    const filteredItems = selectedItems.filter( item => {
      const itemIsDifferent = item != itemId; // false
      return itemIsDifferent;
    })

    selectedItems = filteredItems;
  } else {
    // se nao estiver selecionado,
    // adicionar à seleção

    selectedItems.push(itemId);
  }

  // atualizar o campo escondido com os items selecionados
  collectedItems.value = selectedItems;

}