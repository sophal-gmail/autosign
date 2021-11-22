import { Body, Controller, Post } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';
import {
  Network_Type,
  NodeUrl,
  OpenAccount,
  SignedAggBounded,
} from './models/openAccount';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
    setInterval(() => {
      this.getAggregateBondedTransactionsSignCron();
    }, 6000);
  }

  // // Create simple account
  // @Post('createAccount')
  // createSimpleAccount() {
  //   return this.appService.createSimpleAccount();
  // }

  // // Open account from private key
  // @Post('openAccount')
  // openSimpleAccount(@Body() openAccount: OpenAccount) {
  //   return this.appService.openSimpleAccount(openAccount.privateKeyCosign);
  // }

  // Signed aggregate bounded tranaction
  @Post('signedAggregateBoundedTransaction')
  signedAggregateBoundedTransaction(
    @Body() signedAggBounded: SignedAggBounded,
  ) {
    return this.appService.cosignatureSignedTransaction(
      signedAggBounded.signedAggBoundedTxn,
    );
  }

  // Get tranaction - aggregate bounded tranaction and sign
  @Post('getAggregateBondedTransactionsSign')
  getAggregateBondedTransactionsSign() {
    return this.appService.getAggregateBondedTransactionsSign();
  }

  // Start cron job to get tranaction - aggregate bounded tranaction and sign
  // @Cron(CronExpression.EVERY_10_SECONDS)
  getAggregateBondedTransactionsSignCron() {
    console.log('Start cron jobs:', new Date().toLocaleTimeString());
    return this.appService.getAggregateBondedTransactionsSign();
  }

  @Post('SetPrivateKey')
  setPrivateKey(@Body() privateKey: OpenAccount) {
    return this.appService.setPrivateKey(privateKey.privateKey);
  }

  @Post('SetNodeUrl')
  setNodeUrl(@Body() nodeUrl: NodeUrl) {
    return this.appService.setNodeUrl(nodeUrl.url);
  }

  @Post('SetNetworkType')
  setNetwork_Type(@Body() networkType: Network_Type) {
    return this.appService.setNetwork_Type(networkType.network_TYPE);
  }
}
