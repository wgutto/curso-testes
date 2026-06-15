import { describe, test, after } from "node:test";
import request from "supertest";
import conexao from "#db/singleton-connection.js";
import app from "#src/app.js";
import assert from "assert";

describe('Cadastrar autor', () => {
  // Fecha a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })

  test('Retorna os dados do autor cadastrado quando os dados são válidos. (201)', async () => {
    // Enviar uma requisição POST para /autores com os dados do autor
    await request(app).post('/autores').send({
      nome: 'João Silva',
      nacionalidade: 'Brasileira',
    })
    // Verificar se a resposta tem status 201
    .expect(201)

    // Verificar se a resposta contém os dados do autor cadastrado
    .expect((response) => {
      const dadosDaResposta = response.body.content;

      assert.strictEqual(typeof dadosDaResposta.id, 'number');
      assert.strictEqual(dadosDaResposta.nome, 'João Silva');
      assert.strictEqual(dadosDaResposta.nacionalidade, 'Brasileira');
    });
  })

  test('Retorna um erro ao tentar cadastrar autores com dados inválidos (400).', async () => {
    // Enviar uma requisição POST para /autores com os dados do autor invalidos (nome e nacionalidade vazios)
    await request(app).post('/autores').send({
      nome: '',
      nacionalidade: '',
    })
    // Verficar se a resposta tem status 400
    .expect(400)

    // Verificar se a resposta contém o código de erro 'INVALID_DATA'
    .expect((response) => {
      const codigoDoErro = response.body.type;

      assert.strictEqual(codigoDoErro, 'INVALID_DATA');
    });
  })
})