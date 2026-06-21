import conexao from "#db/singleton-connection.js";

export async function criarLivro(dadosParciais = {}) {
  const [autor] = await conexao('autores').insert({
    nome: 'Autor de Teste',
    nacionalidade: 'Brasileira',
  }).returning('*');

  const [editora] = await conexao('editoras').insert({
    nome: 'Editora de Teste',
    email: 'editorateste@gmail.com',
    cidade: 'São Paulo',
  }).returning('*');

  const dadosLivro = {
    titulo: 'Livro de Teste',
    paginas: 200,
    autor_id: autor.id,
    editora_id: editora.id,
    ...dadosParciais
  }

  const [livro] = await conexao('livros').insert(dadosLivro).returning('*');

  return livro;
}