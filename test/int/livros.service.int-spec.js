import { LivrosService } from "#src/services/livros.service.js";
import test, { after, beforeEach, describe } from "node:test";
import conexao from "#db/singleton-connection.js"
import assert from "node:assert";
import { criarLivro } from "#test/factories/livro.factory.js";

describe("LivrosService", () => {
  // SUT é a sigla para "System Under Test", ou seja, o sistema que está sendo testado
  const sut = new LivrosService(conexao);

  // Limpa a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })
  
  // O before é executado apenas uma vez antes de todos os testes, enquanto o beforeEach é executado antes de cada teste individualmente
  beforeEach(async () => {
    // Limpa a tabela de livros antes de cada teste para garantir que os testes sejam independentes e não afetem uns aos outros
    await conexao('livros').delete()
  })

  describe("listarLivros", () => {
    test("Deve retornar uma lista de livros", async () => {
      // arrange
      const livro1 = await criarLivro({
        titulo: "O Senhor dos Anéis",
      })
      const livro2 = await criarLivro({
        titulo: "Harry Potter",
      })

      // act
      const resultadoEsperado = await sut.listarLivros();

      // assert
      assert.deepStrictEqual(resultadoEsperado, [livro1, livro2])
    })

    test("Deve retornar uma lista vazia se não houver livros cadastrados", async () => {
      // arrange
      const resultadoEsperado = await sut.listarLivros();

      // assert
      assert.deepStrictEqual(resultadoEsperado, []) // o deepStrictEqual é usado para comparar objetos e arrays, garantindo que eles sejam iguais em estrutura e conteúdo
    })
  })

  describe("buscarLivroPorId", () => {
    test("Deve retornar um livro pelo ID", async () => {
      // arrange
      const livro = await criarLivro({
        titulo: "O Hobbit",
      })

      // act
      const resultadoEsperado = await sut.buscarLivroPorId(livro.id);

      // assert
      assert.deepStrictEqual(resultadoEsperado, livro)
    })

    test("Deve retornar UNDEFINED se o livro não for encontrado", async () => {
      // arrange
      const resultadoEsperado = await sut.buscarLivroPorId(9999);

      // assert
      assert.strictEqual(resultadoEsperado, undefined)
    })
  })
})