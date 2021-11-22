import { Injectable } from '@nestjs/common';
import {
  Account,
  AccountHttp,
  AggregateTransaction,
  CosignatureSignedTransaction,
  CosignatureTransaction,
  NetworkType,
  PublicAccount,
  TransactionHttp,
} from 'tsjs-xpx-chain-sdk';
import * as AppConfig from './../config.json';
import { writeFileSync } from 'fs';
import { readFileSync } from 'fs';

@Injectable()
export class AppService {
  network_TYPE: NetworkType;
  accountHttp: AccountHttp;
  transactionHttp: TransactionHttp;

  constructor() {
    this.accountHttp = new AccountHttp(AppConfig.api_URL);
    this.transactionHttp = new TransactionHttp(AppConfig.api_URL);
    this.network_TYPE = NetworkType[AppConfig.network_TYPE];
  }

  createSimpleAccount() {
    return this.simpleAccout();
  }

  openSimpleAccount(privateKey: string) {
    return this.openAccount(privateKey);
  }

  simpleAccout() {
    const newAccount = Account.generateNewAccount(this.network_TYPE);
    const address = newAccount.address.plain();
    const publickey = newAccount.publicKey;
    const privatekey = newAccount.privateKey;
    const myAccount = {
      address: address,
      public_key: publickey,
      private_key: privatekey,
    };

    return myAccount;
  }

  openAccount(privateKey: string) {
    const account = Account.createFromPrivateKey(privateKey, this.network_TYPE);

    const address = account.address.plain();
    const publickey = account.publicKey;
    const privatekey = account.privateKey;
    const myAccount = {
      address: address,
      public_key: publickey,
      private_key: privatekey,
    };

    return myAccount;
  }

  async cosignatureSignedTransaction(
    signedAggregateBoundedTransaction: AggregateTransaction,
  ) {
    const account = Account.createFromPrivateKey(
      AppConfig.privateKeyCosign,
      this.network_TYPE,
    );
    const cosignAggregateBondedTransaction = (
      signedAggregateBondedTransaction: AggregateTransaction,
      account: Account,
    ): CosignatureSignedTransaction => {
      const cosignatureTransaction = CosignatureTransaction.create(
        signedAggregateBondedTransaction,
      );
      return account.signCosignatureTransaction(cosignatureTransaction);
    };

    const signedCosignatureTransaction = cosignAggregateBondedTransaction(
      signedAggregateBoundedTransaction,
      account,
    );

    return this.transactionHttp
      .announceAggregateBondedCosignature(signedCosignatureTransaction)
      .toPromise()
      .then((_) => _);
  }

  async getAggregateBondedTransactionsSign() {
    const publicAccount = PublicAccount.createFromPublicKey(
      AppConfig.publicAccountMultsig,
      this.network_TYPE,
    );
    const txnsAggr: AggregateTransaction[] = await this.accountHttp
      .aggregateBondedTransactions(publicAccount)
      .toPromise()
      .catch((err) => {
        console.log(
          'file: app.service.ts ~ line 110 ~ AppService ~ .toPromise ~ err',
          err,
        );
        return [];
      });
    console.log(
      'file: app.service.ts ~ line 106 ~ AppService ~ getAggregateBondedTransactionsSign ~ txnsAggr',
      txnsAggr,
    );
    txnsAggr.map((txn) => this.cosignatureSignedTransaction(txn));
  }

  async setPrivateKey(openAccount) {
    const data = readFileSync('dist/config.json', { encoding: 'utf8' });
    const jsonData = JSON.parse(data);
    jsonData.privateKeyCosign = openAccount;
    const wData = writeFileSync('dist/config.json', JSON.stringify(jsonData));
    console.log('file: app.service.ts ~ line 102 ~ AppService ~ setPrivateKey ~ wData', wData)
    return jsonData.privateKeyCosign;
  }

  async setNodeUrl(url: string) {
    const data = readFileSync('dist/config.json', { encoding: 'utf8' });
    const jsonData = JSON.parse(data);
    jsonData.api_URL = url;
    const wData = writeFileSync('dist/config.json', JSON.stringify(jsonData));
    console.log('file: app.service.ts ~ line 111 ~ AppService ~ setNodeUrl ~ wData', wData)
    return jsonData.api_URL;
  }

  async setNetwork_Type(type: string) {
    const data = readFileSync('dist/config.json', { encoding: 'utf8' });
    const jsonData = JSON.parse(data);
    jsonData.network_TYPE = type;
    const wData = writeFileSync('dist/config.json', JSON.stringify(jsonData));
    console.log('file: app.service.ts ~ line 120 ~ AppService ~ setNetwork_Type ~ wData', wData)
    return jsonData.network_TYPE;
  }
}
