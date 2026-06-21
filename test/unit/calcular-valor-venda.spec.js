import { calcularValorVenda } from "#domain/calcular-valor-venda.js";
import assert from "node:assert";
import test, { describe } from "node:test";

describe("calcular-valor-venda", () => {
  const casosDeTeste = [
    { valor: 100, modoPagamento: "CARTAO_CREDITO", valorEsperado: 105 },
    { valor: 100, modoPagamento: "CARTAO_DEBITO", valorEsperado: 102 },
    { valor: 100, modoPagamento: "BOLETO", valorEsperado: 100 },
    { valor: 100, modoPagamento: "DINHEIRO", valorEsperado: 100 },
    { valor: 100, modoPagamento: "PIX", valorEsperado: 95 },
  ]

  // Testes parametrizados para cada caso de teste (é utilizado quando se tem muitos casos de teste semelhantes)
  casosDeTeste.forEach(({ valor, modoPagamento, valorEsperado }) => {
    test(`Quando o valor é ${valor} e o modo de pagamento é ${modoPagamento}, o valor de venda deve ser ${valorEsperado}`, () => {
      // act
      const valorVenda = calcularValorVenda(valor, modoPagamento);

      // assert
      assert.strictEqual(valorVenda, valorEsperado);
    })
  })

  test("Calcular valor de venda com modo de pagamento inválido", () => {
    // arrange
    const valor = 100;
    const modoPagamento = "CHEQUE";

    // act
    const callbackDoErroLancado = () => calcularValorVenda(valor, modoPagamento);

    // assert
    assert.throws(callbackDoErroLancado, {
      message: "Modo de pagamento inválido: CHEQUE",
    })
  })
})