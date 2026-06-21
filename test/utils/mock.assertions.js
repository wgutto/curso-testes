import assert from "node:assert";

export function assertMock(mockObjet) {
  return {
    wasCalledWith(argumento) {
      const firstCallFirstArgument = mockObjet.mock.calls[0].arguments[0];

      assert.deepStrictEqual(firstCallFirstArgument, argumento);
    }
  }
}