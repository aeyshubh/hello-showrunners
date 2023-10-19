import { Inject, Service } from 'typedi';
import { Logger } from 'winston';
import { PushAPI } from '@pushprotocol/restapi'
import config from '../../config';
import { EPNSChannel } from '../../helpers/epnschannel';
import { mockMessages } from './messages';
import keys from "./helloWorldKeys.json";
import { ethers,Wallet } from 'ethers';
@Service()
export default class HelloWorldChannel extends EPNSChannel {
  constructor(@Inject('logger') public logger: Logger) {
    super(logger, {
      networkToMonitor: config.web3MainnetNetwork,
      dirname: __dirname,
      name: 'Hello World',
      url: 'https://epns.io/',
      useOffChain: true,
    });
  }
  // Checks for profile Expiration and Sends notification to users
  // Whose Profile is about to be expired`
  async helloWorld(simulate) {
    try {
      this.logInfo('Sending notification to evidence provider');
      const provider = new ethers.providers.JsonRpcProvider("https://ethereum-goerli.publicnode.com");
      const signer = new Wallet(keys.PRIVATE_KEY_NEW_STANDARD.PK,provider)
      const userAlice = await PushAPI.initialize( signer, { env: 'staging' })

      const pushChannelAdress = '0x82a7A0828fa8EB902f0508620Ee305b08634318A';

      // creates channel settings
/* const createChannelSettingRes = userAlice.channel.setting([  

  {
    type: 2, // Slider type
    default: 12,
    description: 'I am Greater than 5',
    data: { upper: 20, lower: 11, ticker: 16 },
  },
]) */
let i =1;

  const aliceSubscriptions = await userAlice.notification.subscriptions({page:3})
this.logInfo(`Subs : ${JSON.stringify(aliceSubscriptions)}`)

const res = await userAlice.channel.subscribers();
this.logInfo(`Subs are : ${JSON.stringify(res)}`)


/* const sendNotifRes = await userAlice.channel.send(['*'], {
  notification: { title: 'testing Notification', body: 'test test 5' },
})  */

      return { success: true };
    } catch (error) {
      this.logError(error);
    }
  }

  /**
   * The method responsible for handling webhook payload
   * @param payload
   */
  public async webhookPayloadHandler(payload: any, simulate: any) {
    const { Message } = payload;

    // do something with the payload
  }
}