export class EstoqueApiGateway {
  async temEstoque(idLivro) {
    const resposta = await fetch(`http://livraria.com/api/livros/${idLivro}/estoque`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const sucesso = resposta.ok;

    return sucesso;
  }
}