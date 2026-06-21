import { describe, test, after } from "node:test";
import request from "supertest";
import conexao from "#db/singleton-connection.js";
import app from "#src/app.js";
import assert from "assert";
import { criarLivro } from "../factories/livro.factory";

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