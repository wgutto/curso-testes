import { describe, test, after } from "node:test";
import request from "supertest";
import conexao from "#db/singleton-connection.js";
import app from "#src/app.js";
import assert from "assert";
import { criarLivro } from "#test/factories/livro.factory.js";

describe('Buscar livro por ID', () => {
  // Fecha a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })

  test('Deve retornar o livro encontrado pelo ID (200)', async () => {
    // arrange
    const livro = await criarLivro({ titulo: 'Livro de Teste' });

    // act
    const livroEncontrado = await request(app).get(`/livros/${livro.id}`).expect(200);

    // assert
    assert.strictEqual(livroEncontrado.body.id, livro.id);
    assert.strictEqual(livroEncontrado.body.titulo, livro.titulo);
    assert.strictEqual(livroEncontrado.body.paginas, livro.paginas);
  })

  test('Deve retornar o type NOT_FOUND caso não encontre o livro pelo ID (404)', async () => {
    await request(app).get('/livros/9999')
      .expect(404)
      .expect((response) => {
        const codigoDeError = response.body.type;

        assert.strictEqual(codigoDeError, 'NOT_FOUND');
      })
  })
})