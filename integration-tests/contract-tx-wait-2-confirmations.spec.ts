import { CONFIGS } from "./config";

CONFIGS().forEach(({ lib, rpc, setup }) => {
  const Tezos = lib;
   describe(`Test tx and waiting for 2 confirmations through contract api using: ${rpc}`, () => {

    beforeEach(async (done) => {
      await setup()
      done()
    })
    test('Verify contract.transfer for 2 XTZ to an address and waits for 2 confirmations', async (done) => {
      const op = await Tezos.contract.transfer({ to: 'tz1ZfrERcALBwmAqwonRXYVQBDT9BjNjBHJu', amount: 2 })
      await op.confirmation()
      expect(op.includedInBlock).toBeLessThan(Number.POSITIVE_INFINITY);
      expect(Number(op.consumedGas)).toBeGreaterThan(0);
      const [first, second] = await Promise.all([op.confirmation(), op.confirmation(2)])
      expect(second - first).toEqual(1)
      // Retrying another time should be instant
      const [first2, second2] = await Promise.all([op.confirmation(), op.confirmation(2)])
      expect(second2 - first2).toEqual(1)
      done();
    })
  });
})
