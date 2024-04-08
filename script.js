// Função para alternar a visibilidade do menu
const toggleMenu = () => {
  const navList = document.getElementById("nav-list");
  navList.style.display =
    navList.style.display === "none" || navList.style.display === ""
      ? "block"
      : "none";
};

// Mostrar o menu quando o cursor passar sobre o ícone do menu
document.querySelector(".menu-icon").addEventListener("mouseenter", () => {
  document.getElementById("nav-list").style.display = "block";
});

//Esconder o menu quando o cursor sair da barra de navegação
document.querySelector("nav").addEventListener("mouseleave", () => {
  document.getElementById("nav-list").style.display = "none";
});

// Adicionar comportamento de rolagem suave aos links da barra de navegação
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    document.querySelector(anchor.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Função para verificar se a página está rolada
const checkScroll = () => {
  const navHeight = document.querySelector("nav").offsetHeight;
  if (window.scrollY >= navHeight) {
    document.querySelector("nav").classList.add("scrolled");
  } else {
    document.querySelector("nav").classList.remove("scrolled");
  }
};

// Adicionar um ouvinte de evento de rolagem à janela
window.addEventListener("scroll", checkScroll);

// Função para verificar a visibilidade das seções e adicionar ou remover a classe 'active' conforme necessário
const updateSectionVisibility = () => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (isElementInViewport(section)) {
      section.classList.add("active");
    } else {
      section.classList.remove("active");
    }
  });
};

// Criar um observador de interseção
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      } else {
        entry.target.classList.remove("active");
      }
    });
  },
  { threshold: 0.5 }
); // Define o threshold como 0.5, o que significa que a seção estará ativa quando metade ou mais dela estiver visível

// Observar cada seção
const sections = document.querySelectorAll(".section");
sections.forEach((section) => {
  observer.observe(section);
});

// Função para verificar se um elemento está visível na tela
const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Verificar as seções quando a página é carregada e quando o usuário rola a página
document.addEventListener("DOMContentLoaded", updateSectionVisibility);
window.addEventListener("scroll", updateSectionVisibility);
