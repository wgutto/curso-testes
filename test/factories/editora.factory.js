import conexao from "#db/singleton-connection.js";

export async function criarEditora(dadosParciais = {}) {
  const [editora] = await conexao('editoras').insert({
    nome: 'Editora de Teste',
    email: 'editorateste@gmail.com',
    cidade: 'São Paulo',
    ...dadosParciais
  }).returning('*');

  return editora;
}