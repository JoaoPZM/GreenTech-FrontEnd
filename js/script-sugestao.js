// Adicionando um evento de 'submit' ao formulário
document.getElementById('form-sugestao').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário (recarregamento da página)

    // Coleta os valores dos campos do formulário
    const nome = document.getElementById('nome-ponto').value;
    const bairro = document.getElementById('bairro').value;
    const rua = document.getElementById('rua').value;
    const observacao = document.getElementById('observacao').value;

    // Validação básica para garantir que todos os campos obrigatórios estão preenchidos
    if (!nome || !bairro || !rua) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return; // Interrompe a execução caso algum campo obrigatório esteja vazio
    }

    // Obtém o botão de envio e o desabilita para prevenir múltiplos envios
    const btnEnviar = document.querySelector('.btn'); 
    btnEnviar.disabled = true; // Desabilita o botão
    btnEnviar.innerText = "Enviando..."; // Altera o texto do botão para indicar que o envio está em progresso

    // Envia os dados para o servidor via fetch
    fetch('http://localhost:3000/api/sugestoes', {
        method: 'POST', // Define o método HTTP como POST
        headers: {
            'Content-Type': 'application/json', // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify({
            nome: nome,            // Envia o nome do ponto
            bairro: bairro,        // Envia o bairro
            rua: rua,              // Envia a rua
            observacao: observacao // Envia a observação, que pode estar vazia
        })
    })
    .then(response => {
        if (!response.ok) { // Verifica se a resposta foi bem-sucedida
            throw new Error('Falha ao enviar a sugestão. Tente novamente mais tarde.');
        }
        return response.json(); // Converte a resposta para JSON
    })
    .then(data => {
        // Exibe a mensagem de sucesso ao usuário
        alert(data.message); 

        // Limpa o formulário após o envio
        document.getElementById('form-sugestao').reset(); 

        // Reabilita o botão de envio
        btnEnviar.disabled = false; 
        btnEnviar.innerText = "Enviar Sugestão"; // Restaura o texto do botão
    })
    .catch(error => {
        // Em caso de erro, exibe uma mensagem e reabilita o botão
        alert(`Erro ao enviar sugestão: ${error.message}`);
        console.log(error); // Exibe o erro no console para debugging
        btnEnviar.disabled = false; // Reabilita o botão
        btnEnviar.innerText = "Enviar Sugestão"; // Restaura o texto do botão
    });
});
