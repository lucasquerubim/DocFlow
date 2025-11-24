
/* DocFlow UI Refactor — JS
   - Navegação entre views
   - Renderização de cards
   - Modal novo documento
   - Toasts e tema
*/

const $ = (sel, ctx=document) => ctx.querySelector(sel);
const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

// Estado mock para cards
const modelos = [
  { titulo: "Orçamento de Design", desc: "Valores e condições de serviços.", status: "Feito", img: "img/Gemini_Generated_Image_1jlf8l1jlf8l1jlf.png" },
  { titulo: "Recibo", desc: "Comprovante de pagamento.", status: "Feito", img: "img/Gemini_Generated_Image_1jlf8l1jlf8l1jlf.png"  },
  { titulo: "Contrato de Prestação de Serviços", desc: "Acordo entre cliente e prestador.", status: "Feito", img: "img/Gemini_Generated_Image_1jlf8l1jlf8l1jlf.png" },
  { titulo: "Certificado", desc: "Emitir certificados digitais.", status: "Feito", img: "img/Gemini_Generated_Image_1jlf8l1jlf8l1jlf.png" },
  { titulo: "Relatório Técnico", desc: "Resultados e conclusões de testes.", status: "Feito", img: "img/Gemini_Generated_Image_1jlf8l1jlf8l1jlf.png" },
  { titulo: "Dossiê de Crédito", desc: "Checklist + relatórios para solicitação.", status: "Feito", img: "img/Gemini_Generated_Image_1jlf8l1jlf8l1jlf.png" },
];

// Navegação
$$(".nav-item").forEach(btn => {
  btn.addEventListener("click", () => {
    $$(".nav-item").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");

    const viewId = btn.dataset.view;
    $$(".view").forEach(v => v.classList.add("hidden"));
    $("#" + viewId).classList.remove("hidden");
  });
});

// Render cards
function renderCards(){
  const grid = $("#cardsGrid");
  grid.innerHTML = "";
  modelos.forEach(m => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="card__media" role="img" aria-label="${m.titulo}"><img src="${m.img}"></div>
      <div class="pill">${m.status}</div>
      <h3>${m.titulo}</h3>
      <p class="muted small">${m.desc}</p>
      <div style="display:flex; gap:10px; margin-top:auto">
        <button class="btn btn-primary" onclick="openModal()">Gerar</button>
        <button class="btn" onclick="previewPopup()">Prévia</button>
      </div>
    `;
    grid.appendChild(card);
  });
}
renderCards();

// Modal novo documento
const modal = $(".modal");
$("#novoDocBtn").addEventListener("click", () => openModal());
$("#novoDocBtn2").addEventListener("click", () => openModal());
$("#fecharModal").addEventListener("click", () => closeModal());

function openModal(){ modal.classList.remove("hidden"); $("#formNovoDoc").reset(); }
function closeModal(){ modal.classList.add("hidden"); }
function previewPopup() {toast("🔎 Gerando prévia…");}

$("#gerarBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const data = new FormData($("#formNovoDoc"));
  const titulo = data.get("titulo") || "Documento";
  toast(`✅ "${titulo}" gerado com sucesso!`);
  closeModal();
});

$("#previewBtn").addEventListener("click", (e) => {
  e.preventDefault();
  toast("🔎 Gerando prévia…");
});

// Toaster
function toast(msg){
  const container = $("#toastContainer");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// Tema
const toggleTheme = $("#toggleTheme");
toggleTheme.addEventListener("click", () => {
  const dark = document.body.classList.toggle("dark");
  toggleTheme.setAttribute("aria-pressed", String(dark));
  toast(dark ? "🌙 Tema escuro ativado" : "☀️ Tema claro ativado");
});

// Acessibilidade: alto contraste
$("#altoContraste").addEventListener("change", (e) => {
  document.body.style.filter = e.target.checked ? "contrast(1.1) saturate(1.05)" : "none";
  toast(e.target.checked ? "Alto contraste ativado" : "Alto contraste desativado");
});

// Buscar (mock)
$("#buscar").addEventListener("click", () => {
  const q = $("#q").value.trim().toLowerCase();
  if(!q){ toast("Digite um termo para buscar."); return; }
  toast(`Resultados para "${q}" (mock)`);
});

$("#sairbtn").addEventListener("click", () => {
  const q = $("#q").value.trim().toLowerCase();
  if(!q){ toast("Digite um termo para buscar."); return; }
  toast(`Resultados para "${q}" (mock)`);
});