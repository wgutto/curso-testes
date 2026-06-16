import Autor from "#models/autor.js"
import assert from "node:assert"
import { describe, test } from "node:test"

describe("Autor", () => {
  describe("constructor", () => {
    test("Cria uma instância de Autor com todos os campos", () => {
    // arrange
    const dadosDoAutor = {
      id: 1,
      nome: "João Silva",
      nacionalidade: "Brasileira",
      created_at: "2024-06-01T12:00:00Z",
      updated_at: "2024-06-01T12:00:00Z",
    }

    // act
    const autor = new Autor(dadosDoAutor)

    // assert
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
})