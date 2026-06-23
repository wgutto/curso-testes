import { describe, test, after, beforeEach } from "node:test";
import request from "supertest";
import conexao from "#db/singleton-connection.js";
import { criarAppTeste } from "#test/utils/create-test-app.js";

describe('Listar autores', () => {
  const app = criarAppTeste();

  // Fecha a conexão com o banco de dados após os testes para evitar conexões pendentes
  after(async () => {
    await conexao.destroy();
  })

  beforeEach(async () => {
    // Limpa a tabela de autores antes de cada teste para garantir um ambiente de teste limpo
    await conexao('autores').delete();
  })

  test('Retorna a lista de autores se houver ao menos 1. (200)', async () => {

    const autor1 = await request(app).post('/autores').send({
      nome: 'Autor 1',
      nacionalidade: 'Nacionalidade 1'
    })
      .expect(201)
      .then(res => res.body.content);

    const autor2 = await request(app).post('/autores').send({
      nome: 'Autor 2',
      nacionalidade: 'Nacionalidade 2'
    })
      .expect(201)
      .then(res => res.body.content);

    await request(app).get('/autores')
      .expect(200)
      .expect([autor1, autor2])
  })

  test('Retorna uma lista vazia caso não haja autores. (200)', async () => {

    await request(app).get('/autores')
      .expect(200)
      .expect([])
  })
})