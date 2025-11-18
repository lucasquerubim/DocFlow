
document.addEventListener("DOMContentLoaded", () => {
  const btnNovoDoc = document.getElementById("btnNovoDoc");
  const modal = document.getElementById("modalNovoDoc");
  const fecharModal = document.getElementById("fecharModal");
  const seeMoreBtns = document.querySelectorAll(".see-more");
  const brancoBtn = document.getElementById("brancoBtn");
  const modeloBtn = document.getElementById("modeloBtn");


  btnNovoDoc.addEventListener("click", () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
  });


  fecharModal.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
  });

 
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      modal.setAttribute("aria-hidden", "true");
    }
  });


  seeMoreBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const original = btn.textContent;
      btn.textContent = "Carregando...";
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
        
        alert("Mais modelos serão carregados futuramente!");
      }, 1000);
    });
  });

  
  brancoBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    alert("Abrindo documento em branco.");
  });

  modeloBtn.addEventListener("click", () => {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    alert("Abrindo catálogo de modelos.");
  });
});
