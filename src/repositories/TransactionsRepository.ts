import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  // "Banco de dados falso"
  private transactions: Transaction[];

  // iniciando uma classe com array vazio para receber dados
  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  // o valor parcial (partial)
  /**
  *Parametros do reduce
  *1- retorna toda a informação salvada no reduce
   2- como se fosse um map, todos os valores do this.
   O partial vai ser o que vai se juntar a todos os dados e
   o transaction é cada transactions dentro do this
  */
  public getBalance(): Balance {
    const { income, outcome } = this.transactions.reduce(
      (partial: Balance, transaction: Transaction) => {
        switch (transaction.type) {
          case 'income':
            partial.income += transaction.value;
            break;
          case 'outcome':
            partial.outcome += transaction.value;
            break;
          default:
            break;
        }

        return partial;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    // pega a informação da models(Transaction) e retorna para transaction
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
