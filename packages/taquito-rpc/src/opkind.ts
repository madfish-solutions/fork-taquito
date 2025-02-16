export enum OpKind {
  ORIGINATION = 'origination',
  DELEGATION = 'delegation',
  REVEAL = 'reveal',
  TRANSACTION = 'transaction',
  ACTIVATION = 'activate_account',
  ENDORSEMENT = 'endorsement',
  PREENDORSEMENT = 'preendorsement',
  SET_DEPOSITS_LIMIT = 'set_deposits_limit',
  DOUBLE_PREENDORSEMENT_EVIDENCE = 'double_preendorsement_evidence',
  ENDORSEMENT_WITH_SLOT = 'endorsement_with_slot',
  SEED_NONCE_REVELATION = 'seed_nonce_revelation',
  DOUBLE_ENDORSEMENT_EVIDENCE = 'double_endorsement_evidence',
  DOUBLE_BAKING_EVIDENCE = 'double_baking_evidence',
  PROPOSALS = 'proposals',
  BALLOT = 'ballot',
  FAILING_NOOP = 'failing_noop',
  REGISTER_GLOBAL_CONSTANT = 'register_global_constant',
  TX_ROLLUP_ORIGINATION = 'tx_rollup_origination',
  TX_ROLLUP_SUBMIT_BATCH = 'tx_rollup_submit_batch',
  TX_ROLLUP_COMMIT = 'tx_rollup_commit',
  TX_ROLLUP_RETURN_BOND = 'tx_rollup_return_bond',
  TX_ROLLUP_FINALIZE_COMMITMENT = 'tx_rollup_finalize_commitment',
  TX_ROLLUP_REMOVE_COMMITMENT = 'tx_rollup_remove_commitment',
  TX_ROLLUP_REJECTION = 'tx_rollup_rejection',
  TX_ROLLUP_DISPATCH_TICKETS = 'tx_rollup_dispatch_tickets',
  TRANSFER_TICKET = 'transfer_ticket',
  INCREASE_PAID_STORAGE = 'increase_paid_storage',
  VDF_REVELATION = 'vdf_revelation',
  EVENT = 'event',
}
