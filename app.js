/* ===== Storage e util ===== */
const STORAGE = { USER:'doc_user', DOCS:'doc_docs', PROFILE:'doc_profile', NOTIFS:'doc_notifs' };
const getDocs = () => JSON.parse(localStorage.getItem(STORAGE.DOCS)||'[]');
const setDocs = d => localStorage.setItem(STORAGE.DOCS, JSON.stringify(d));
const set = (k,v)=> localStorage.setItem(k, JSON.stringify(v));
const get = k => JSON.parse(localStorage.getItem(k)||'null');
const fmtDate = ts => new Date(ts).toLocaleString('pt-BR',{dateStyle:'short',timeStyle:'short'});
const E = id => document.getElementById(id); const SA = s => document.querySelectorAll(s);

/* ===== Persona Lucas ===== */
const PERSONA = {
  name:'Lucas Almeida',
  email:'lucas.almeida@docflow.app',
  role:'Designer gráfico autônomo',
  segment:'Design',
  goals:'Gerar orçamentos padronizados e recibos profissionais rapidamente.',
  pains:'Perda de tempo com formatação; risco de erros em valores.',
  prefs:'Orçamento; Contrato de prestação; Recibo.',
  favorites:['Orçamento de Design','Recibo','Contrato de Prestação de Serviços'],
  avatar:'LucasAlmeida.png'
};

/* ===== Tipos de documento ===== */
const TYPE_CONFIG = {
  'Orçamento de Design': {
    desc:'Valores e condições de serviços.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/1',
    templateUrls:[
      'https://docxtemplater.com/tag-example.docx',
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','resumo','clausulas','condicoes','assinaturas'],
    required:['Briefing do cliente','Referências visuais','Dados de faturamento'],
    image:'https://images.unsplash.com/photo-1508161777268-3899535b31a6?q=80&w=1200&auto=format&fit=crop'
  },
  'Recibo': {
    desc:'Comprovante de pagamento.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/2',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','clausulas','assinaturas'],
    required:['Dados do pagador','Valor e descrição','Comprovante de pagamento'],
    image:'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop'
  },
  'Contrato de Prestação de Serviços': {
    desc:'Acordo entre cliente e prestador.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/3',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','clausulas','condicoes','assinaturas','anexos'],
    required:['RG/CPF das partes','Escopo detalhado','Prazo e forma de pagamento'],
    image:'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=1200&auto=format&fit=crop'
  },
  'Certificado': {
    desc:'Emitir certificados digitais.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/5',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','resumo','assinaturas'],
    required:['Lista de participantes','Nome do evento','Data e local'],
    image:'https://images.unsplash.com/photo-1516383607781-913a19294fd1?q=80&w=1200&auto=format&fit=crop'
  },
  'Pitch para Investidores': {
    desc:'PIT completo e padronizado.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/9',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','resumo','clausulas','anexos'],
    required:['Resumo executivo','Métricas principais','Projeções financeiras'],
    image:'https://images.unsplash.com/photo-1529336953121-a0ce23d1fd1a?q=80&w=1200&auto=format&fit=crop'
  },
  'Relatório Mensal da Agência': {
    desc:'Metas e resultados (BB).',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/8',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','resumo','clausulas','anexos'],
    required:['Metas do mês','Resultados apurados','Evidências (prints/planilhas)'],
    image:'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop'
  },
  'Relatório Técnico': {
    desc:'Resultados e conclusões de testes.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/7',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','resumo','clausulas','anexos','assinaturas'],
    required:['Cenários de teste','Evidências (imagens)','Resultados e conclusão'],
    image:'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop'
  },
  'Dossiê de Crédito': {
    desc:'Checklist + relatórios para solicitação.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/6',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','resumo','clausulas','anexos'],
    required:['Extratos bancários','Comprovantes de faturamento','Garantias sugeridas'],
    image:'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop'
  },
  'Contrato de Locação': {
    desc:'Aluguel residencial.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/10',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','clausulas','condicoes','assinaturas','anexos'],
    required:['Documentos das partes','Dados do imóvel','Reajuste/garantia'],
    image:'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop'
  },
  'Briefing de Design': {
    desc:'Escopo, público, referências.',
    jsonUrl:'https://jsonplaceholder.typicode.com/posts/4',
    templateUrls:[
      'https://unpkg.com/docxtemplater/build/examples/tag-example.docx'
    ],
    sections:['capa','resumo','clausulas','anexos'],
    required:['Público-alvo','Mensagem-chave','Referências'],
    image:'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'
  }
};

/* ===== Estado ===== */
let state = {
  user: get(STORAGE.USER),
  profile: get(STORAGE.PROFILE) || PERSONA,
  notifs: get(STORAGE.NOTIFS) || [],
  currentTemplate: null,
  editingDocId: null
};

/* ===== Elementos ===== */
const loginView=E('loginView'), appShell=E('appShell'), oneClickLogin=E('oneClickLogin');
const avatar=E('avatar'),avatarTop=E('avatarTop'),sidebarName=E('sidebarName'),sidebarRole=E('sidebarRole'),userName=E('userName'),userEmail=E('userEmail');
const navItems=SA('.nav-item'), views=SA('.view'), searchInput=E('searchInput'), searchBtn=E('searchBtn');
const kpiDraft=E('kpiDraft'),kpiReady=E('kpiReady'),kpiSign=E('kpiSign');
const docsTbody=E('docsTbody'), allDocsTbody=E('allDocsTbody'), listAll=E('listAll'), btnVoltar=E('btnVoltar');
const notifList=E('notifList'), clearNotifs=E('clearNotifs'), logoutBtn=E('logoutBtn');
const pName=E('pName'),pEmail=E('pEmail'),pPhone=E('pPhone'),pRole=E('pRole'),pSegment=E('pSegment'),pGoals=E('pGoals'),pPains=E('pPains'),pPrefs=E('pPrefs'),favModels=E('favModels'),saveProfile=E('saveProfile');
const docGrid=document.querySelector('.doc-grid');

/* modal gerador */
const generatorModal=E('generatorModal'), genTitle=E('genTitle'), genSource=E('genSource'),
      genChecklist=E('genChecklist'), requiredList=E('requiredList'), suggestList=E('suggestList'),
      genPreview=E('genPreview');
const toDados=E('toDados'), toPrevia=E('toPrevia'), backTipo=E('backTipo'), backDados=E('backDados'), regen=E('regen');
const fldTitulo=E('fldTitulo'), fldResponsavel=E('fldResponsavel'), fldBrief=E('fldBrief'), fldPartes=E('fldPartes'), fldData=E('fldData'), fldObs=E('fldObs');
const dropArea=E('dropArea'), fileInput=E('fileInput'), browseBtn=E('browseBtn'), fileList=E('fileList');
const exportGen=E('exportGen'), exportGenDocx=E('exportGenDocx'), exportPdf=E('exportPdf'), saveGen=E('saveGen'), closeGen=E('closeGen'), printGen=E('printGen');
const tabs=SA('.tabs .tab');

/* ===== Helpers ===== */
function setView(id){ views.forEach(v=>v.classList.add('hidden')); E(id).classList.remove('hidden'); navItems.forEach(b=>b.classList.toggle('active',b.dataset.view===id)); }
function toast(msg){ state.notifs.unshift({id:crypto.randomUUID(),msg,ts:Date.now()}); state.notifs=state.notifs.slice(0,20); set(STORAGE.NOTIFS,state.notifs); renderNotifs(); }
function ensureImgFallback(img){ img.addEventListener('error',()=>{ img.src='https://images.unsplash.com/photo-1520975922284-8b456906c813?q=80&w=1200&auto=format&fit=crop'; }); }
async function fetchJson(url){ const r=await fetch(url); if(!r.ok) throw new Error('JSON indisponível'); return await r.json(); }
async function fetchFirstAvailable(urls){ for(const u of urls){ try{ const r=await fetch(u); if(r.ok) return await r.arrayBuffer(); }catch(_){} } throw new Error('Templates indisponíveis'); }
function switchTab(id){ ['tabTipo','tabDados','tabPrevia'].forEach(t=>{ E(t).classList.toggle('hidden', t!==id); tabs.forEach(b=> b.classList.toggle('active', b.dataset.tab===id)); }); }

/* ===== Render ===== */
function renderSidebarUser(){
  const p=state.profile;
  sidebarName.textContent=p.name; sidebarRole.textContent=p.role;
  avatar.src=p.avatar; avatarTop.src=p.avatar; userName.textContent=p.name; userEmail.textContent=p.email;
}
function renderKPIs(){
  const d=getDocs();
  kpiDraft.textContent=d.filter(x=>x.status==='Rascunho').length;
  kpiReady.textContent=d.filter(x=>x.status==='Pronto').length;
  kpiSign.textContent=d.filter(x=>x.status==='Pendente de assinatura').length;
}
function renderTable(tbody,docs){
  tbody.innerHTML=docs.sort((a,b)=>b.updatedAt-a.updatedAt).map(d=>`
    <tr>
      <td>${d.title}</td><td>${d.type}</td><td>${d.status}</td><td>${fmtDate(d.updatedAt)}</td>
      <td class="right">
        <button data-act="open" data-id="${d.id}" class="btn btn-ghost">Abrir</button>
        <button data-act="edit" data-id="${d.id}" class="btn btn-ghost">Editar</button>
        <button data-act="dup" data-id="${d.id}" class="btn btn-ghost">Duplicar</button>
        <button data-act="del" data-id="${d.id}" class="btn btn-ghost danger">Excluir</button>
      </td>
    </tr>`).join('');
}
function renderDocs(){ const d=getDocs(); renderTable(docsTbody,d.slice(0,6)); renderTable(allDocsTbody,d); }
function renderNotifs(){ notifList.innerHTML=state.notifs.map(n=>`<li><span>${n.msg}</span><span class="muted small">${fmtDate(n.ts)}</span></li>`).join(''); }
function renderDocGrid(){
  const items = Object.keys(TYPE_CONFIG).map(t=>({type:t, ...TYPE_CONFIG[t]}));
  document.querySelector('.doc-grid').innerHTML = items.map(t=>`
    <article class="doc-card">
      <div class="doc-thumb">
        <img src="${t.image}" alt="${t.type}"/>
        <span class="badge green">Feito</span>
      </div>
      <div class="doc-body">
        <div class="doc-title">${t.type}</div>
        <div class="doc-desc">${t.desc}</div>
        <div class="row">
          <button class="btn btn-primary" data-create='${JSON.stringify({type:t.type})}'>Gerar</button>
          <button class="btn" data-preview='${JSON.stringify({type:t.type})}'>Prévia</button>
        </div>
      </div>
    </article>
  `).join('');
  document.querySelectorAll('.doc-thumb img').forEach(ensureImgFallback);
}

/* ===== Login/Logout ===== */
function login(){ state.user={email:state.profile.email}; set(STORAGE.USER,state.user); set(STORAGE.PROFILE,state.profile); loginView.classList.add('hidden'); appShell.classList.remove('hidden'); renderAll(); setView('dashboardView'); }
function logout(){ state.user=null; localStorage.removeItem(STORAGE.USER); appShell.classList.add('hidden'); loginView.classList.remove('hidden'); }

/* ===== Busca ===== */
function doSearch(){ const q=searchInput.value.toLowerCase().trim(); const res=getDocs().filter(d=>[d.title,d.type,d.status].join(' ').toLowerCase().includes(q)); renderTable(allDocsTbody,res); setView('documentsView'); }

/* ===== Tabelas ===== */
function onTableClick(e){
  const b=e.target.closest('button'); if(!b) return;
  const id=b.dataset.id, act=b.dataset.act; const docs=getDocs(); const i=docs.findIndex(x=>x.id===id); if(i<0) return;
  if(act==='open'||act==='edit'){ openGenerator(docs[i].type,false,docs[i]); }
  else if(act==='dup'){ const copy={...docs[i],id:crypto.randomUUID(),title:docs[i].title+' (cópia)',updatedAt:Date.now(),status:'Rascunho'}; docs.unshift(copy); setDocs(docs); renderKPIs(); renderDocs(); toast('Cópia criada.'); }
  else if(act==='del'){ const t=docs[i].title; docs.splice(i,1); setDocs(docs); renderKPIs(); renderDocs(); toast(`"${t}" excluído.`); }
}

/* ===== Seções ===== */
const BASE_SECTIONS=[{key:'capa',label:'Capa'},{key:'resumo',label:'Resumo Executivo'},{key:'clausulas',label:'Cláusulas / Corpo'},{key:'condicoes',label:'Condições / Valores'},{key:'assinaturas',label:'Assinaturas'},{key:'anexos',label:'Anexos'}];
function renderChecklist(checked){ genChecklist.innerHTML=BASE_SECTIONS.map(s=>`<label><input type="checkbox" value="${s.key}" ${checked.includes(s.key)?'checked':''}/> ${s.label}</label>`).join(''); }
function renderRequired(list){ requiredList.innerHTML=list.map(i=>`<li>• ${i}</li>`).join(''); }
function renderSuggested(list){ suggestList.innerHTML=list.map(name=>`<li><label><input type="checkbox" data-suggest="${name}" checked/> ${name}</label></li>`).join(''); }

/* ===== Abrir gerador ===== */
function openGenerator(type,_previewOnly=false,existing=null){
  state.editingDocId = existing?.id || null;
  const cfg=TYPE_CONFIG[type];
  state.currentTemplate = {
    type, src:cfg.jsonUrl,
    sections: existing?.sections || cfg.sections.slice(),
    attachments: existing?.attachments || [],
    obs: existing?.obs || '',
    titulo: existing?.title || `${type} — ${new Date().toLocaleDateString('pt-BR')}`,
    responsavel: state.profile.name,
    partes: '',
    data: new Date().toISOString().slice(0,10),
    brief: ''
  };

  genTitle.textContent = existing ? `Editar: ${type}` : `Novo documento`;
  renderChecklist(state.currentTemplate.sections);
  renderRequired(cfg.required);
  renderSuggested(cfg.required);
  genSource.textContent = cfg.jsonUrl;

  fldTitulo.value=state.currentTemplate.titulo;
  fldResponsavel.value=state.currentTemplate.responsavel;
  fldBrief.value=state.currentTemplate.brief;
  fldPartes.value=state.currentTemplate.partes;
  fldData.value=state.currentTemplate.data;
  fldObs.value=state.currentTemplate.obs;

  renderAttachmentList();
  generatorModal.showModal();
  switchTab('tabTipo');
  if(existing?.content) genPreview.srcdoc=existing.content;
}

/* ===== Coletar dados + Prévia ===== */
function collectFormData(){
  const s=state.currentTemplate;
  s.titulo=fldTitulo.value.trim()||s.titulo;
  s.responsavel=fldResponsavel.value.trim()||s.responsavel;
  s.brief=fldBrief.value.trim();
  s.partes=fldPartes.value.trim();
  s.data=fldData.value||s.data;
  s.obs=fldObs.value.trim();
  s.sections = Array.from(genChecklist.querySelectorAll('input[type=checkbox]:checked')).map(i=>i.value);
  const sugg = Array.from(suggestList.querySelectorAll('input[data-suggest]:checked')).map(i=>({name:i.dataset.suggest}));
  s.allAnnexes = [...s.attachments, ...sugg];
}

async function updatePreview(){
  collectFormData();
  const {type, src} = state.currentTemplate;
  let web={title:'',body:''};
  try{ const js=await fetchJson(src); web.title=js.title||''; web.body=js.body||''; }catch(_){}
  const sec = (k,t,c)=> state.currentTemplate.sections.includes(k) ? `<section><h2>${t}</h2>${c}</section>` : '';
  const anexosHtml = (state.currentTemplate.allAnnexes?.length) ? `<ul>${state.currentTemplate.allAnnexes.map(a=>`<li>${a.name||a}</li>`).join('')}</ul>` : '<p>Nenhum anexo informado.</p>';

  const header = `
    <style>
      body{font-family:system-ui,Arial;margin:24px;line-height:1.55}
      h1{margin:0}h2{margin:16px 0 6px;font-size:16px}.muted{color:#64748b;font-size:12px}
      hr{border:none;border-top:1px solid #e5e7eb;margin:12px 0}
    </style>
    <h1>${type}</h1>
    <div class="muted">${web.title ? 'Resumo do modelo web: '+web.title : ''}</div>
    <hr/>`;

  const TPL = {
    'Orçamento de Design': () => `
      <ul>
        <li><strong>Cliente:</strong> ${state.currentTemplate.partes || '—'}</li>
        <li><strong>Serviço:</strong> Criação de arte</li>
        <li><strong>Valor:</strong> R$ 350,00</li>
        <li><strong>Prazo:</strong> 10/10/2025</li>
        <li><strong>Condições:</strong> 50% na aprovação e 50% na entrega.</li>
      </ul>`,
    'Recibo': () => `
      <p>Declaro que recebi de <strong>${state.currentTemplate.partes || 'Nome do Cliente'}</strong> a quantia de <strong>R$ 350,00</strong> referente ao serviço de design.</p>
      <p>Data: ${new Date(state.currentTemplate.data).toLocaleDateString('pt-BR')} — Assinatura: _______________________</p>`,
    'Contrato de Prestação de Serviços': () => `
      <ol>
        <li><strong>Objeto:</strong> Desenvolvimento de materiais gráficos.</li>
        <li><strong>Preço e condições:</strong> conforme proposta anexa.</li>
        <li><strong>Prazo:</strong> 30 dias após aceite.</li>
        <li><strong>Propriedade intelectual:</strong> conforme cláusulas.</li>
      </ol>`,
    'Certificado': () => `<p>Certificamos que <strong>${(state.currentTemplate.partes||'Participante')}</strong> participou da atividade informada.</p>`,
    'Pitch para Investidores': () => `<p>Problema, solução, mercado, modelo de negócios, projeções e pedido de investimento.</p>`,
    'Relatório Mensal da Agência': () => `<p>Agência 1023 (Recife). Metas x resultados, indicadores e destaques.</p>`,
    'Relatório Técnico': () => `<p>Resultados de testes, metodologia, evidências e conclusão.</p>`,
    'Dossiê de Crédito': () => `<p>Conjunto de documentos e relatórios para solicitação de crédito.</p>`,
    'Contrato de Locação': () => `<p>Contrato de locação residencial com valor mensal e prazo de 12 meses.</p>`,
    'Briefing de Design': () => `<ul><li>Público-alvo</li><li>Mensagem-chave</li><li>Referências visuais</li><li>Entrega esperada</li></ul>`
  };
  const corpo = (TPL[type] ? TPL[type]() : `<p>${web.body || 'Conteúdo do documento.'}</p>`);

  const html = [
    header,
    sec('capa','Capa', `<p><strong>${state.currentTemplate.titulo}</strong><br/>Gerado por ${state.currentTemplate.responsavel}</p>`),
    sec('resumo','Resumo Executivo', `<p>${state.currentTemplate.brief || web.title || '—'}</p>`),
    sec('clausulas','Cláusulas / Corpo', corpo),
    sec('condicoes','Condições / Valores', `<p>Condições comerciais, prazos e pagamentos.</p>`),
    sec('assinaturas','Assinaturas', `<p>Assinaturas das partes: ${state.currentTemplate.partes || '—'}</p>`),
    sec('anexos','Anexos', anexosHtml),
    state.currentTemplate.obs ? `<section><h2>Observações</h2><p>${state.currentTemplate.obs.replace(/\n/g,'<br/>')}</p></section>`:''
  ].join('');

  state.currentTemplate.html=html;
  genPreview.srcdoc=html;
}

/* ===== Exportações ===== */
function exportDocFromPreview(filename){
  const html=genPreview.srcdoc || '<p>Sem conteúdo</p>';
  const blob=new Blob([`<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>${html}</body></html>`],{type:'application/msword'});
  const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=`${filename}.doc`; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(url); a.remove();},0);
}
async function exportDocx(){
  const type=state.currentTemplate.type; const cfg=TYPE_CONFIG[type];
  try{
    const ab=await fetchFirstAvailable(cfg.templateUrls);
    const zip=new PizZip(ab); const doc=new window.docxtemplater(zip,{paragraphLoop:true,linebreaks:true});
    const data={
      titulo: state.currentTemplate.titulo,
      autor: state.currentTemplate.responsavel,
      data: new Date(state.currentTemplate.data).toLocaleDateString('pt-BR'),
      cliente: state.currentTemplate.partes || '',
      servico: 'Criação de arte',
      valor: 'R$ 350,00',
      prazo: '10/10/2025',
      resumo: state.currentTemplate.brief || '',
      observacoes: state.currentTemplate.obs || ''
    };
    doc.setData(data); doc.render();
    const out=doc.getZip().generate({type:'blob',mimeType:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(out); a.download=`${type}.docx`; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},0);
  }catch(err){ console.warn(err); toast('Template online indisponível — exportei .doc padrão.'); exportDocFromPreview(type); }
}
function exportPdfFromPreview(){
  const html = genPreview.srcdoc || '';
  const container = document.createElement('div'); container.innerHTML=html; document.body.appendChild(container);
  html2pdf().from(container).set({filename:`${state.currentTemplate.type}.pdf`, margin:10, html2canvas:{scale:2}, jsPDF:{unit:'mm',format:'a4',orientation:'portrait'}}).save().then(()=>container.remove());
}

/* ===== Anexos ===== */
function renderAttachmentList(){ fileList.innerHTML=(state.currentTemplate.attachments||[]).map(f=>`<li>${f.name||f}</li>`).join(''); }
function handleFiles(files){ for(const f of files){ state.currentTemplate.attachments.push(f); } renderAttachmentList(); }
function wireDropArea(){
  ['dragenter','dragover'].forEach(evt=> dropArea.addEventListener(evt, e=>{e.preventDefault();e.stopPropagation();dropArea.classList.add('dragover');}));
  ['dragleave','drop'].forEach(evt=> dropArea.addEventListener(evt, e=>{e.preventDefault();e.stopPropagation();dropArea.classList.remove('dragover');}));
  dropArea.addEventListener('drop', e=>{ const files=e.dataTransfer.files; if(files?.length) handleFiles(files); });
  browseBtn.addEventListener('click', ()=> fileInput.click());
  fileInput.addEventListener('change', ()=> handleFiles(fileInput.files));
}

/* ===== Salvar ===== */
function saveCurrentDoc(){
  const now=Date.now();
  const payload={
    title: state.currentTemplate.titulo,
    type: state.currentTemplate.type,
    status:'Rascunho',
    updatedAt: now,
    content: genPreview.srcdoc || state.currentTemplate.html,
    sections: state.currentTemplate.sections,
    src: state.currentTemplate.src,
    attachments: state.currentTemplate.attachments,
    obs: state.currentTemplate.obs
  };
  const docs=getDocs();
  if(state.editingDocId){ const i=docs.findIndex(d=>d.id===state.editingDocId); if(i>=0) docs[i]={...docs[i],...payload,id:state.editingDocId}; }
  else { docs.unshift({id:crypto.randomUUID(), ...payload}); }
  setDocs(docs); renderKPIs(); renderDocs(); toast(`Documento "${payload.title}" salvo.`); generatorModal.close();
}

/* ===== Eventos ===== */
function wireEvents(){
  oneClickLogin.addEventListener('click', login);
  logoutBtn.addEventListener('click', logout);
  navItems.forEach(b=> b.addEventListener('click', ()=> setView(b.dataset.view)));
  btnVoltar.addEventListener('click', ()=> setView('dashboardView'));
  searchBtn.addEventListener('click', doSearch);
  searchInput.addEventListener('keydown', e=>{ if(e.key==='Enter') doSearch(); });
  docsTbody.addEventListener('click', onTableClick);
  allDocsTbody.addEventListener('click', onTableClick);
  listAll.addEventListener('click', ()=>{ renderTable(allDocsTbody,getDocs()); setView('documentsView'); });

  // grid
  document.querySelector('.doc-grid').addEventListener('click', e=>{
    const c=e.target.closest('[data-create]'); const p=e.target.closest('[data-preview]');
    if(c){ const {type}=JSON.parse(c.dataset.create); openGenerator(type,false); }
    if(p){ const {type}=JSON.parse(p.dataset.preview); openGenerator(type,true); }
  });

  // novo doc rápido
  E('newDocType').innerHTML = Object.keys(TYPE_CONFIG).map(t=>`<option value="${t}">${t}</option>`).join('');
  E('quickCreate').addEventListener('click', ()=> E('newDocDialog').showModal());
  E('newDocCancel').addEventListener('click', ()=> E('newDocDialog').close());
  E('newDocConfirm').addEventListener('click', ()=>{ const t=E('newDocType').value; E('newDocDialog').close(); openGenerator(t,false); });

  // tabs
  tabs.forEach(t=> t.addEventListener('click', ()=> switchTab(t.dataset.tab)));
  toDados.addEventListener('click', ()=> switchTab('tabDados'));
  backTipo.addEventListener('click', ()=> switchTab('tabTipo'));
  toPrevia.addEventListener('click', ()=>{ updatePreview(); switchTab('tabPrevia'); });
  backDados.addEventListener('click', ()=> switchTab('tabDados'));

  // gerador
  regen.addEventListener('click', updatePreview);
  genChecklist.addEventListener('change', ()=>{}); // leitura feita em collectFormData
  closeGen.addEventListener('click', ()=> generatorModal.close());
  printGen.addEventListener('click', ()=>{ const w=genPreview.contentWindow; if(w) w.print(); });
  exportGen.addEventListener('click', ()=> exportDocFromPreview(state.currentTemplate.type));
  exportGenDocx.addEventListener('click', exportDocx);
  exportPdf.addEventListener('click', exportPdfFromPreview);
  saveGen.addEventListener('click', saveCurrentDoc);

  // anexos
  wireDropArea();

  // perfil
  saveProfile.addEventListener('click', ()=>{
    state.profile = {...state.profile,
      name:pName.value.trim(), email:pEmail.value.trim(), phone:pPhone.value.trim(),
      role:pRole.value.trim(), segment:pSegment.value.trim(), goals:pGoals.value.trim(),
      pains:pPains.value.trim(), prefs:pPrefs.value.trim()
    };
    set(STORAGE.PROFILE,state.profile); renderSidebarUser(); toast('Perfil atualizado.');
  });
}

/* ===== Perfil form ===== */
function fillProfileForm(){
  const p=state.profile;
  pName.value=p.name; pEmail.value=p.email; pPhone.value=p.phone||''; pRole.value=p.role; pSegment.value=p.segment;
  pGoals.value=p.goals; pPains.value=p.pains; pPrefs.value=p.prefs;
  favModels.innerHTML=(p.favorites||[]).map(f=>`<span class="chip">${f}</span>`).join('');
}

/* ===== Render All / Init ===== */
function renderAll(){ renderSidebarUser(); renderKPIs(); renderDocs(); renderNotifs(); renderDocGrid(); fillProfileForm(); }
function init(){ renderAll(); setView('dashboardView'); wireEvents(); if(!state.user){ appShell.classList.add('hidden'); loginView.classList.remove('hidden'); } }
init();

/* ===== Seeds iniciais ===== */
if(!localStorage.getItem(STORAGE.DOCS)){
  setDocs([
    { id:crypto.randomUUID(), title:'Orçamento — João Silva', type:'Orçamento de Design', status:'Rascunho', updatedAt:Date.now()-3600e3, content:null, sections:['capa','resumo','clausulas'] },
    { id:crypto.randomUUID(), title:'Recibo — Projeto Logo', type:'Recibo', status:'Pronto', updatedAt:Date.now()-2*3600e3, content:null, sections:['capa','clausulas','assinaturas'] },
    { id:crypto.randomUUID(), title:'Contrato — Branding Maria', type:'Contrato de Prestação de Serviços', status:'Pendente de assinatura', updatedAt:Date.now()-3*3600e3, content:null, sections:['capa','clausulas','condicoes','assinaturas'] }
  ]);
}
