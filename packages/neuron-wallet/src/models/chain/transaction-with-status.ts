import { TransactionInterface, Transaction } from './transaction'
import { TxStatusInterface, TxStatus } from './tx-status'

export interface TransactionWithStatusInterface {
  transaction: TransactionInterface
  txStatus: TxStatusInterface
}

export class TransactionWithStatus {
  private _transaction: Transaction
  private _txStatus: TxStatus

  constructor({ transaction, txStatus }: TransactionWithStatusInterface) {
    this._transaction = transaction.constructor.name === 'Object' ? new Transaction(transaction) : (transaction as Transaction)
    this._txStatus = txStatus.constructor.name === 'Object' ? new TxStatus(txStatus) : (txStatus as TxStatus)
  }

  public get transaction(): Transaction {
    return this._transaction
  }

  public get txStatus(): TxStatus {
    return this._txStatus
  }


  public static fromSDK(txWithStatus: CKBComponents.TransactionWithStatus): TransactionWithStatus {
    return new TransactionWithStatus({
      transaction: Transaction.fromSDK(txWithStatus.transaction),
      txStatus: TxStatus.fromSDK(txWithStatus.txStatus)
    })
  }
}
