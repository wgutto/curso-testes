import criarApp from "#src/app.js";
import { mock } from "node:test";

export function criarAppTeste(dependencias = {
  emailGateway: {
    enviarEmail: mock.fn(),
  },
  estoqueApiGateway: {
    temEstoque: mock.fn(() => Promise.resolve(true)),
  }
}) {
  return criarApp(dependencias);
}