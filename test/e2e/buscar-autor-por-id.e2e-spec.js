import { describe, test, after } from "node:test";
import request from "supertest";
import conexao from "#db/singleton-connection.js";
import assert from "assert";
import { criarAppTeste } from "#test/utils/create-test-app.js";

describe('Buscar autor por ID', () => {
  const app = criarAppTeste();

  // Fecha a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })

  // O todo é usado para marcar o teste como pendente, indicando que ele ainda precisa ser implementado
  test('Retorna os dados do autor encontrado por ID. (200)', async () => {
    const autorCriado = await request(app).post('/autores').send({
      nome: 'Autor Teste',
      nacionalidade: 'Brasileira',
    }).expect(201);

    const idDoAutorCriado = autorCriado.body.content.id;

    await request(app).get(`/autores/${idDoAutorCriado}`)
      .expect(200)
      .expect((response) => {
        const autorEncontrado = response.body;

        assert.strictEqual(autorEncontrado.id, idDoAutorCriado);
        assert.strictEqual(autorEncontrado.nome, 'Autor Teste');
        assert.strictEqual(autorEncontrado.nacionalidade, 'Brasileira');
      })
  })

  test('Retorna um erro ao não encontrar o autor por ID. (404)', async () => {
    await request(app).get('/autores/9999')
      .expect(404)
      .expect((response) => {
        const codigoDeError = response.body.type;

        assert.strictEqual(codigoDeError, 'NOT_FOUND');
      })
  })
})