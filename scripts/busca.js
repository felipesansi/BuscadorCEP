function buscaEndereco(){
    var cep = document.getElementById('cep').value;
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4 && xhr.status ===200){
            var endereco = JSON.parse(xhr.responseText);
            document.getElementById('endereco').innerHTML =
            endereco.logradouro +', ' + endereco.bairro + ', ' +
            endereco.localidade + ', ' + endereco.uf;
        }
    };
    xhr.open('GET', 'https://viacep.com.br/ws//' + cep + '/json/',true);
    xhr.send();
}