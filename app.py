from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Permite requisições do frontend

@app.route('/api/gerar-documento', methods=['POST'])
def gerar_documento():
    try:
        # Recebe os dados do formulário
        dados = request.get_json()
        
        # Extrai os campos principais baseado no frontend
        titulo = dados.get('titulo', 'Documento Sem Título')
        prompt = dados.get('prompt', '')
        
        print("=== DADOS RECEBIDOS DO FORMULÁRIO ===")
        print(f"Título: {titulo}")
        print(f"Dados: {prompt}")
        print("=====================================")
        
        # retorna uma resposta de sucesso, exibindo no console do browser
        return jsonify({"success": True, "message": f"Documento gerado com sucesso!\n"})
    except Exception as e:
        print(f"Erro ao gerar documento: {e}")
        return jsonify({"success": False, "message": "Erro ao gerar documento."}), 500

@app.route('/api/test', methods=['GET']) # teste
def test():
    return jsonify({"status": "Backend funcionando!"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)