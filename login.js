document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const senha = document.getElementById('senha').value.trim();

  if (email && senha) {
    // Simula usuário autenticado
    const fakeUser = { email: email };
    const fakeProfile = {
      name: "Usuário DocFlow",
      email: email,
      role: "Usuário",
      segment: "Geral",
      avatar: "https://via.placeholder.com/100"
    };

    // Salva no mesmo formato usado pelo app.js
    localStorage.setItem('doc_user', JSON.stringify(fakeUser));
    localStorage.setItem('doc_profile', JSON.stringify(fakeProfile));

    // Redireciona diretamente para a página principal
    window.location.href = "home.html";
  } else {
    alert("Preencha todos os campos antes de continuar.");
  }
});

