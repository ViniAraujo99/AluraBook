const cep = document.getElementById('cep');

async function buscaCEP(cep)
{
    let mensagemErro = document.querySelector('[data-container-mensagem-erro]');
    mensagemErro.innerHTML = '';

    let endereco = document.getElementById('endereco');
    let bairro = document.getElementById('bairro');
    let cidade = document.getElementById('cidade');
    let uf = document.getElementById('estado');

    try
    {
        const requisicao = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const requisicaoConvertida = await requisicao.json();

        console.log(requisicaoConvertida);

        endereco.value = requisicaoConvertida.logradouro;
        bairro.value = requisicaoConvertida.bairro;
        cidade.value = requisicaoConvertida.localidade;
        uf.value = requisicaoConvertida.uf;

        if (requisicaoConvertida.erro)
        {
            mensagemErro.innerHTML = `<p class="incorreto">O CEP '${cep}' não existe, 
                                            por favor insira um CEP existente e tente novamente!</p>`;
            endereco.value = '';
            bairro.value = '';
            cidade.value = '';
            uf.value = '';
            cep.value = '';
        }

        return requisicaoConvertida;
    }
    catch (erro)
    {
        mensagemErro.innerHTML += `<p class="incorreto">CEP inválido, tente novamente</p>`
        endereco.value = '';
        bairro.value = '';
        cidade.value = '';
        uf.value = '';
        cep.value = '';
    }
}

cep.addEventListener('focusout', () =>
{
    buscaCEP(cep.value);

});

cep.addEventListener('focusin', () =>
{
    endereco.value = '';
    bairro.value = '';
    cidade.value = '';
    uf.value = '';
})