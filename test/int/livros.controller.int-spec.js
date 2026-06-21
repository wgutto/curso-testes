import test, { after, describe, mock } from 'node:test';
import { LivrosController } from '#controllers/livros.controller.js';
import conexao from '#db/singleton-connection.js';
import { criarLivro } from '#test/factories/livro.factory.js';
import { assertMock } from '#test/utils/mock.assertions.js';

describe("LivrosController", () => {
  // SUT é a sigla para "System Under Test", ou seja, o sistema que está sendo testado
  const sut = new LivrosController(conexao);

  after(async () => {
    await conexao.destroy();
  })

  describe("listarLivros", () => {
    test("Deve retornar uma lista de livros", async () => {
      // arrange
      const livro = await criarLivro({
        titulo: "O Senhor dos Anéis",
      });

      const req = {}
      const resSpy = {
        status: mock.fn(() => resSpy),
        json: mock.fn(() => resSpy),
        send: mock.fn(() => resSpy),
      }

      // act
      await sut.listarLivros(req, resSpy)

      // assert
      assertMock(resSpy.status).wasCalledWith(200);

      assertMock(resSpy.send).wasCalledWith([livro])
    })
  })

  describe("pegarPeloId", () => {})

  describe("criar", () => {})
})