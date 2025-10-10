# Docflow (MVP sem IA)

Aplicação web estática para gerar documentos padronizados (orçamento, recibo, contrato, certificado, etc.), com:
- **Login 1-clique**
- **Dashboard** com KPIs, busca e cards por tipo de documento
- **Gerador** em 3 abas: **Tipo → Dados → Prévia**
- **Anexos sugeridos** por tipo + **upload/drag-and-drop**
- **Prévia** em HTML e exportação **.docx** (Docxtemplater), **.doc** (fallback) e **.pdf**
- **Perfil** da persona **Lucas Almeida** e **lista** de documentos com ações (abrir/editar/duplicar/excluir)

> Tudo em **HTML + CSS + JS** vanilla, sem build. Dados de exemplo via **JSONPlaceholder** e imagens do **Unsplash**.

---

## 🎯 Como rodar

Basta abrir o `index.html` no navegador.

- Sem servidor: clique duas vezes no arquivo (Chrome/Edge/Firefox).
- Com servidor estático (opcional):  
  `npx serve .` ou `python -m http.server 8000` → `http://localhost:8000`

> **Dica:** habilite popups para baixar `.docx`/`.pdf` sem bloqueios.

---

## 🗂️ Estrutura

