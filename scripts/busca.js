function exibirMensagem(mensagem) {
    var divFade = document.getElementById('fade');
    var divMensagem = document.getElementById('mensagem');
    var p = divMensagem.querySelector('p');
    p.textContent = mensagem; 
    divFade.classList.remove('hide');
    divMensagem.classList.remove('hide');
}

function esconderMensagem() {
    var divFade = document.getElementById('fade');
    var divMensagem = document.getElementById('mensagem');
    divFade.classList.add('hide');
    divMensagem.classList.add('hide');
}

document.getElementById('btn-fechar').addEventListener('click', esconderMensagem);

function toggleLoader() {
    var divFade = document.getElementById('fade');
    var loader = divFade.querySelector('.spinner-border');
    divFade.classList.toggle('hide');
    loader.classList.toggle('hide');
}

function BuscaEndereco() {
    var cep = document.getElementById('cep').value;
    var xhr = new XMLHttpRequest();
    var numeros = /^[0-9]{8}$/; 

    if (!numeros.test(cep)) {
        exibirMensagem('CEP inválido. Por favor, tente novamente.');
        return;
    }

    toggleLoader();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            toggleLoader();
            if (xhr.status === 200) {
                var endereco = JSON.parse(xhr.responseText);
                if (endereco.erro) {
                    exibirMensagem('CEP não encontrado. Por favor, tente novamente.');
                    return;
                }
                document.getElementById('rua').value = endereco.logradouro ;
                document.getElementById('bairro').value = endereco.bairro ;
                document.getElementById('cidade').value = endereco.localidade ;
                document.getElementById('estado').value = endereco.uf;
            } else {
                exibirMensagem('Erro ao buscar o endereço. Por favor, tente novamente.');
            }
        }
    };

    xhr.open('GET', 'https://viacep.com.br/ws/' + cep + '/json/', true);
    xhr.send();
}
