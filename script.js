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

// Carrossel
document.querySelectorAll(".carrossel-container").forEach(initCarrossel);

function initCarrossel(article) {
  const container = article.querySelector(".cardsCarrossel");
  const cards = container.querySelectorAll(".card, .cardTop");
  const visibleCards = 5; // Quantos cards são exibidos por vez
  let index = 0; // Índice atual do carrossel
  const cardWidth = cards[0].offsetWidth + 10; // Largura de cada card (incluindo espaço)

  // Clona os primeiros 'visibleCards' para o final (loop infinito)
  for (let i = 0; i < visibleCards; i++) {
    const clone = cards[i].cloneNode(true); // Clona card
    container.appendChild(clone); // Adiciona no final
  }
  // Define a largura total do container (com os clones)
  container.style.width = `${(cards.length + visibleCards) * cardWidth}px`;

  // Seleciona os botões dentro do article
  const leftBtn = article.querySelector(".control-left");
  const rightBtn = article.querySelector(".control-right");

  // Evento para mover para a esquerda
  leftBtn.addEventListener("click", () => move(-1));
  // Evento para mover para a direita
  rightBtn.addEventListener("click", () => move(1));

  // Função que move o carrossel
  function move(direction) {
    index += direction; // Atualiza índice de acordo com a direção

    // Aplica transição e move
    container.style.transition = "transform 0.4s ease-in-out";
    container.style.transform = `translateX(${-index * cardWidth}px)`;

    setTimeout(() => {
      const totalCards = container.querySelectorAll(".card, .cardTop").length;

      // Se chegou no final (clones), volta para o início real
      if (index >= totalCards - visibleCards) {
        index = 0;
        container.style.transition = "none";
        container.style.transform = `translateX(0px)`;
      }
      // Se tentou voltar antes do primeiro
      else if (index < 0) {
        index = totalCards - visibleCards - 1;
        container.style.transition = "none";
        container.style.transform = `translateX(${-index * cardWidth}px)`;
      }
    }, 400); // Espera a animação antes de corrigir
  }
}
