import Autor from "#models/autor.js"
import assert from "node:assert"
import { after, before, describe, test } from "node:test"
import conexao from "#db/singleton-connection.js"
import { limparBanco } from "#src/commands/limpar-banco.command.js"

describe("Autor", () => {
  // Fecha a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })

  // O before é usado para configurar o ambiente de teste antes de executar os testes, garantindo que a configuração do banco de dados seja feita antes de qualquer teste ser executado
  before(async () => {
    Autor.configurarDB(conexao);
    await limparBanco(); // Limpa o banco de dados antes de cada teste para garantir que os testes sejam independentes e não afetem uns aos outros
  })

  describe("pegarAutores", () => {
    test("Deve retornar uma lista de autores", async () => {
      // arrange
      const autoresEsperados = await conexao('autores').insert([
        { nome: 'Autor 1', nacionalidade: 'Nacionalidade 1' },
        { nome: 'Autor 2', nacionalidade: 'Nacionalidade 2' },
      ]).returning('*')

      // act
      const autores = await Autor.pegarAutores()

      // assert
      assert.deepStrictEqual(autores, autoresEsperados) // o deepStrictEqual é usado para comparar objetos e arrays, verificando se os valores são iguais
    })
  })

  describe("criar", () => {
    test("Deve criar um novo autor no banco de dados", async () => {
      // arrange
      const autor = new Autor({ nome: 'Autor Teste', nacionalidade: 'Nacionalidade Teste' })

      // act
      const autorCriado = await autor.criar()

      // assert
      assert.strictEqual(autorCriado.nome, autor.nome)
      assert.strictEqual(autorCriado.nacionalidade, autor.nacionalidade)
      assert(typeof autorCriado.id === 'number') // verifica se o id é um número

      const autorNoBanco = await conexao('autores').where({ id: autorCriado.id }).first()
      assert.deepStrictEqual(autorNoBanco, autorCriado) // verifica se o autor criado está no banco de dados
    })
  })
})