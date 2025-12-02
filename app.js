
/* DocFlow UI Refactor — JS
   - Navegação entre views
   - Renderização de cards
   - Modal novo documento
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
  gerarPDF()
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

//$("#sairbtn").addEventListener("click", () => {
  //const q = $("#q").value.trim().toLowerCase();
  //if(!q){ toast("Digite um termo para buscar."); return; }
  //toast(`Resultados para "${q}" (mock)`);
//});

function gerarPDF() {
    const titulo = $('input[name="titulo"]').value || 'Documento Sem Título';
    const categoria = $('select[name="categoria"]').value;
    const tom = $('select[name="tom"]').value;
    
    const campos = [];
    $$('.dado-item').forEach(item => {
        const nomeCampo = item.querySelector('input[type="text"]').value;
        const tipoCampo = item.querySelector('select').value;
        if (nomeCampo && nomeCampo.trim() !== '') {
            campos.push({ nome: nomeCampo, tipo: tipoCampo });
        }
    });
    
    const doc = new jsPDF();
    let yPos = 20;
    const margin = 20;
    const pageWidth = doc.internal.pageSize.width;
    const contentWidth = pageWidth - (margin * 2);
    
    // CABEÇALHO - Com quebra automática para título longo
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    
    // Usar splitTextToSize para quebrar o título se for muito longo
    const tituloLinhas = doc.splitTextToSize(titulo, contentWidth);
    doc.text(tituloLinhas, margin, yPos);
    yPos += (tituloLinhas.length * 6); // Aproximadamente 6 unidades por linha
    
    // INFORMAÇÕES
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Categoria: ${categoria}`, margin, yPos);
    doc.text(`Tom de Linguagem: ${tom}`, pageWidth - margin, yPos, { align: 'right' });
    yPos += 15;
    
    // Linha separadora
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
    yPos += 15;
    
    // CONTEÚDO PRINCIPAL
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    const tituloCampos = doc.splitTextToSize('DADOS DO DOCUMENTO:', contentWidth);
    doc.text(tituloCampos, margin, yPos);
    yPos += (tituloCampos.length * 6) + 5;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    if (campos.length > 0) {
        campos.forEach((campo, index) => {
            // Verificar se precisa de nova página
            if (yPos > 250) {
                doc.addPage();
                yPos = 20;
            }
            
            const label = `${campo.nome}:`;
            const value = `[${campo.tipo.toUpperCase()}]`;
            
            // Quebrar label se for muito longo
            const labelLinhas = doc.splitTextToSize(label, contentWidth - 70);
            const valueLinhas = doc.splitTextToSize(value, 60);
            
            // Desenhar label
            doc.setFont(undefined, 'bold');
            doc.text(labelLinhas, margin, yPos);
            
            // Desenhar valor alinhado à direita
            doc.setFont(undefined, 'normal');
            const valueY = yPos;
            doc.text(valueLinhas, pageWidth - margin - 60, valueY, { align: 'right' });
            
            // Ajustar Y para próxima linha baseado na maior quantidade de linhas
            const maxLinhas = Math.max(labelLinhas.length, valueLinhas.length);
            yPos += (maxLinhas * 6) + 4;
            
            // Linha para preenchimento (apenas se não for a última)
            if (index < campos.length - 1) {
                doc.setDrawColor(220, 220, 220);
                doc.line(margin, yPos, pageWidth - margin, yPos);
                yPos += 8;
            }
        });
    } else {
        doc.text('Nenhum campo definido', margin, yPos);
        yPos += 10;
    }
    
    // Adicionar data/hora no rodapé
    yPos += 10;
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');
    const horaFormatada = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text(`Gerado por DocFlow em ${dataFormatada} às ${horaFormatada}`, pageWidth / 2, pageWidth - 10, { align: 'center' });
    
    // SALVAR O PDF
    const fileName = titulo.toLowerCase().replace(/[^a-z0-9]/g, '_') + '.pdf';
    doc.save(fileName);

    toast(`✅ PDF "${titulo}" gerado com sucesso!`);
    closeModal();
}