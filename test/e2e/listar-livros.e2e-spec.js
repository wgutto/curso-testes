import { describe, test, after, beforeEach } from "node:test";
import request from "supertest";
import conexao from "#db/singleton-connection.js";
import app from "#src/app.js";
import { criarLivro } from "#test/factories/livro.factory.js";
import assert from "node:assert";

describe('Listar livros', () => {
  // Fecha a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })

  beforeEach(async () => {
    // Limpa a tabela de livros antes de cada teste para garantir um ambiente de teste limpo
    await conexao('livros').delete();
  })

  test('Retorna a lista de livros caso tenha algum cadastrado (200)', async () => {
    // arrange
    const livro1 = await criarLivro({ titulo: 'Livro de Teste 1' });
    const livro2 = await criarLivro({ titulo: 'Livro de Teste 2' });

    // act e assert
    await request(app).get('/livros').expect(200).expect(response => {

      assert.strictEqual(response.body.length, 2);

      const livros1 = response.body[0];
      const livros2 = response.body[1];

      assert.strictEqual(livros1.id, livro1.id);
      assert.strictEqual(livros1.titulo, livro1.titulo);

      assert.strictEqual(livros2.id, livro2.id);
      assert.strictEqual(livros2.titulo, livro2.titulo);
    })
  })

  test('Retorna uma lista vazia caso não tenha nenhum livro cadastrado (200)', async () => {
    await request(app).get('/livros')
      .expect(200)
      .expect([])
  })
})