function mostrar(etapa) {
  document.getElementById("step1").classList.add("hidden");
  document.getElementById("step2").classList.add("hidden");
  document.getElementById("step3").classList.add("hidden");

  document.getElementById("step" + etapa).classList.remove("hidden");
}

function voltar(etapa) {
  mostrar(etapa);
}

/* Etapa 1 – Enviar código */
function enviarCodigo() {
  const email = document.getElementById("emailReset").value.trim();

  if (!email) {
    alert("Digite seu e-mail!");
    return;
  }

  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem("codigo_recuperacao", codigo);
  localStorage.setItem("email_recuperacao", email);

  alert("Código enviado! (simulação)\nCódigo: " + codigo);

  mostrar(2);
}

/* Etapa 2 – Validar código */
function validarCodigo() {
  const digitado = document.getElementById("codigoReset").value.trim();
  const correto  = localStorage.getItem("codigo_recuperacao");

  if (digitado !== correto) {
    alert("Código incorreto!");
    return;
  }

  mostrar(3);
}

/* Etapa 3 – Salvar nova senha */
function salvarSenha() {
  const s1 = document.getElementById("novaSenha").value.trim();
  const s2 = document.getElementById("novaSenha2").value.trim();

  if (!s1 || !s2) {
    alert("Preencha todos os campos!");
    return;
  }
  if (s1 !== s2) {
    alert("As senhas não coincidem!");
    return;
  }

  const email = localStorage.getItem("email_recuperacao");

  const dados = {
    email: email,
    senha: s1
  };

  localStorage.setItem("doc_user", JSON.stringify(dados));

  alert("Senha redefinida com sucesso!");

  window.location.href = "login.html";
}
