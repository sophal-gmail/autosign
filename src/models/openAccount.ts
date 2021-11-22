import { ApiProperty } from '@nestjs/swagger';
import { AggregateTransaction } from 'tsjs-xpx-chain-sdk';

export class OpenAccount {
    @ApiProperty({ example: 'process.env.PRIVATE_KEY as string' })
    privateKey: string;
}

export class NodeUrl {
    @ApiProperty({ example: 'https://bctestnet1.brimstone.xpxsirius.io' })
    url: string;
}

export class Network_Type {
    @ApiProperty({ example: 'TEST_NET' })
    network_TYPE: string;
}

export class SignedAggBounded {
    @ApiProperty({ description: 'AggregateTransaction' })
    signedAggBoundedTxn: AggregateTransaction;
}
