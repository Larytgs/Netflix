function sair(elemento) {
  var lista = document.getElementById(elemento).style.lista;
  if (lista == "block") {
    document.getElementById(elemento).style.lista = "none";
  } else {
    document.getElementById(elemento).style.lista = "block";
  }
}

// header
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Carrossel de fotos
const container = document.querySelector(".cardsCarrossel");
let cards = document.querySelectorAll(".card");
const cardWidth = cards[0].offsetWidth + 10; // Largura do card + gap
const visibleCards = 1; // Define quantos cards aparecem por vez
let index = 1; // Começa no primeiro card real

// Ajustar a largura do contêiner para caber os cards visíveis corretamente
container.style.width = `${visibleCards * cardWidth}px`;

// Clonar os primeiros e últimos 3 cards para efeito infinito
function clonarCards() {
  const totalCards = cards.length;

  // Clonar os primeiros e últimos `visibleCards` cards
  for (let i = 0; i < visibleCards; i++) {
    let cloneStart = cards[i].cloneNode(true); // Clona os primeiros
    let cloneEnd = cards[totalCards - 1 - i].cloneNode(true); // Clona os últimos

    container.appendChild(cloneStart); // Adiciona no final
    container.insertBefore(cloneEnd, container.firstChild); // Adiciona no início
  }

  // Atualiza a lista de cards incluindo os clones
  cards = document.querySelectorAll(".card");

  // ⚠️ Move a posição inicial do carrossel para o primeiro card real (evitando clones visíveis
  container.style.transform = `translateX(${-index * cardWidth}px)`;
}

clonarCards();

// Função para mover o carrossel
//A função recebe um parâmetro direcao, que indica se o carrossel deve se mover para frente (1) ou para trás (-1).
function moverCarrossel(direcao) {
  container.style.transition = "transform 0.4s ease-in-out"; //Define uma animação

  index += direcao; // Avança o número correto de cards
  //Se direcao for 1, o carrossel avança para o próximo item.
  //Se direcao for -1, o carrossel volta para o item anterior.

  container.style.transform = `translateX(${-index * cardWidth}px)`;
  //Move o carrossel na horizontal multiplicando o índice (index) pela largura do card (cardWidth).
  //O sinal negativo (-) faz o movimento para a esquerda.

  // Ajusta posição para manter o loop infinito
  setTimeout(() => {
    if (index >= cards.length - 1) {
      // Se estiver no clone do primeiro card, vai para o primeiro real
      container.style.transition = "none";
      index = 1;
      container.style.transform = `translateX(${-index * cardWidth}px)`;
    } else if (index < 0) {
      // Se estiver no clone do último card, vai para o último real
      container.style.transition = "none";
      index = cards.length - 1;
      container.style.transform = `translateX(${-index * cardWidth}px)`;
    }
  }, 500); //espera 0,5 segundos antes de executar o código dentro dele. Isso dá tempo para a animação terminar antes de fazer ajustes.
}
