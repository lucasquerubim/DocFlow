async function gerarDocumento() {
    
    let titulo = document.getElementById('fldTitulo').value // titulo do documento
    let prompt = document.getElementById('fldBrief').value // comando de texto
    
    const dados = { // dicionário com dados
        titulo: titulo,
        prompt: prompt,
    };

    try {
        const response = await fetch('http://localhost:5000/api/gerar-documento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dados)
        }); //envia pro backend
        
        const resultado = await response.json();
        console.log('Resposta do backend:', resultado); //respostas no console
        
        if (resultado.success) {
            alert('Documento gerado com sucesso!');
        } else {
            alert('Erro ao gerar documento: ' + resultado.message);
        } //alerta do browser
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro de conexão com o servidor');
    } //erro
}

async function test() {
    const response = await fetch('http://localhost:5000/api/test')
    .then(r => r.json())
    .then(console.log) //função de teste
}