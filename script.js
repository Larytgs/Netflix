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
