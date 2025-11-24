import { jsPDF } from "jsPDF";

async function gerarDocumento() {
    
    let titulo = document.getElementById('fldTitulo').value // titulo do documento
    let responsavel = document.getElementById('fldResponsavel').value // responsavel
    let prompt = document.getElementById('fldBrief').value // comando de texto
    let partesnomes = document.getElementById("fldPartes").value
    let data = document.getElementById("fldData").value

    let doc = jsPDF();
    
    const dados = { // dicionário com dados
        titulo: titulo,
        responsavel: responsavel,
        prompt: prompt,
        partesnomes: partesnomes,
        data: data
    };

    try {
        const response = await fetch('http://localhost:5500/api/gerar-documento', {
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
            doc.text(resultado,10,10)
            doc.save("teste.pdf");
        } else {
            alert('Erro ao gerar documento: ' + resultado.message);
        } //alerta do browser
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro de conexão com o servidor');
    } //erro
}

async function test() {
    const response = await fetch('http://localhost:5500/api/test')
    .then(r => r.json())
    .then(console.log) //função de teste
}