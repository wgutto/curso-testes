import { describe, test, after } from "node:test";
import request from "supertest";
import conexao from "#db/singleton-connection.js";
import app from "#src/app.js";
import assert from "assert";

describe('Registrar venda', () => {
  // Fecha a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })

  test('Registra uma venda via Boleto (201)', async () => {
    // arrange
    const livro = await criarLivro({ titulo: 'Livro de Teste' });

    // act
    const response = await request(app).post('/vendas').send({
      idLivro: livro.id,
      modoPagamento: 'BOLETO',
      valor: 100
    }).expect(201).then(response => response.body.content);

    // assert
    assert.strictEqual(response.idLivro, livro.id);
    assert.strictEqual(response.modoPagamento, 'BOLETO');
    assert.strictEqual(response.valor, 100);
  })
})

async function criarLivro(dadosParciais = {}) {
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