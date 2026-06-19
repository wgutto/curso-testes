import Autor from "#models/autor.js"
import assert from "node:assert"
import { describe, test } from "node:test"

describe("Autor", () => {
  describe("constructor", () => {
    test("Cria uma instância de Autor com todos os campos", () => {
    // arrange = preparação dos dados para o teste
    const dadosDoAutor = {
      id: 1,
      nome: "João Silva",
      nacionalidade: "Brasileira",
      created_at: "2024-06-01T12:00:00Z",
      updated_at: "2024-06-01T12:00:00Z",
    }

    // act = ação de criar a instância do autor
    const autor = new Autor(dadosDoAutor)

    // assert = verificação se os dados do autor foram atribuídos corretamente
    assert.strictEqual(autor.id, dadosDoAutor.id)
    assert.strictEqual(autor.nome, dadosDoAutor.nome)
    assert.strictEqual(autor.nacionalidade, dadosDoAutor.nacionalidade)
    assert.strictEqual(autor.created_at, dadosDoAutor.created_at)
    assert.strictEqual(autor.updated_at, dadosDoAutor.updated_at)
  })

  test("Cria uma instância de Autor com os campos opcionais", () => {
    // arrange
    const dadosDoAutor = {
      id: 2,
      nome: "Maria Souza",
      nacionalidade: "Portuguesa",
    }

    // act
    const autor = new Autor(dadosDoAutor)

    // assert
    assert.strictEqual(autor.id, dadosDoAutor.id)
    assert.strictEqual(autor.nome, dadosDoAutor.nome)
    assert.strictEqual(autor.nacionalidade, dadosDoAutor.nacionalidade)
    assert(typeof autor.created_at === "string")
    assert(typeof autor.updated_at === "string")
  })
  })

  describe("pegarAutores", () => {
    test("Deve retornar uma lista de autores", async () => {
      // arrange
      const autoresEsperados = [
        { id: 1, nome: "João Silva", nacionalidade: "Brasileira", created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
      ]

      const dbMock = {
        select: () => {
          return {
            from: () => Promise.resolve(autoresEsperados) // o Promise.resolve é usado para simular uma função assíncrona que retorna uma promessa resolvida com os autores esperados
          }
        }
      }
      Autor.configurarDB(dbMock)

      // act
      const autores = await Autor.pegarAutores()

      // assert
      assert.deepStrictEqual(autores, autoresEsperados) // o deepStrictEqual é usado para comparar objetos e arrays, verificando se os valores são iguais
    })
  })
})