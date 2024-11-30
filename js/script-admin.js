// Aguardar o carregamento completo da página antes de executar o código
document.addEventListener("DOMContentLoaded", function() {
    // Função para carregar as sugestões do backend
    fetch('http://localhost:3000/api/sugestoes')
        .then(response => {
            // Verifica se a resposta foi bem sucedida
            if (!response.ok) {
                throw new Error('Falha ao carregar as sugestões');
            }
            return response.json(); // Converte a resposta para JSON
        })
        .then(data => {
            const tbody = document.querySelector('#sugestoes tbody'); // Seleciona o corpo da tabela
            data.forEach(sugestao => {
                // Cria uma nova linha para cada sugestão
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${sugestao.nome}</td>
                    <td>${sugestao.bairro}</td>
                    <td>${sugestao.rua}</td>
                `;
                tbody.appendChild(tr); // Adiciona a linha na tabela
            });
        })
        .catch(error => {
            // Exibe um erro amigável se algo der errado com a requisição
            alert('Erro ao carregar as sugestões. Tente novamente mais tarde.');
            console.error('Erro ao carregar sugestões:', error); // Loga o erro no console para debug
        });
});