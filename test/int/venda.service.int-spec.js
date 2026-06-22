import test, { after, describe, mock } from 'node:test';
import conexao from '#db/singleton-connection.js'
import { criarLivro } from '#test/factories/livro.factory.js';
import { VendasService } from '#services/vendas.service.js';
import assert from 'node:assert';
import { assertMock } from '#test/utils/mock.assertions.js';
import { criarEditora } from '#test/factories/editora.factory.js';

describe("VendaService", () => {
  after(async () => {
    await conexao.destroy();
  });

  describe("registrarVenda", () => {
    test("Deve registrar uma venda com sucesso e enviar um email para a editora", async () => {
      // arrange
      const emailGatewayMock = {
        enviarEmail: mock.fn(),
      }
      const sut = new VendasService(conexao, emailGatewayMock);
      const editora = await criarEditora({
        email: 'editora@teste.com'
      })
      const livro = await criarLivro({
        titulo: "Livro de Teste",
        editora_id: editora.id,
      })

      // act
      const resposta = await sut.registrarVenda({
        idLivro: livro.id,
        modoPagamento: "PIX",
        valor: 100
      })

      // assert
      assert.strictEqual(resposta.livro_id, livro.id);
      assert.strictEqual(resposta.tipo_pagamento, "PIX");
      assert.strictEqual(resposta.valor, 95);
      assertMock(emailGatewayMock.enviarEmail).wasCalledWith({
        remetente: 'no-reply@livraria.com',
        destinatario: 'editora@teste.com',
        assunto: 'Nova venda registrada',
        mensagem: `Uma nova venda do livro "Livro de Teste" foi registrada com o valor de R$ 95.00.`
      })
    });
  })
});