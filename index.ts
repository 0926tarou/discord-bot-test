// パッケージのインポート

import { Client, Intents, TextBasedChannels, Message } from 'discord.js'

require('dotenv').config();

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

//Bot側で返すテキスト
let RepText = "";

//ターミナル上の起動確認
client.on('ready', _ =>{
  console.log('Bot準備完了～');
  //起動確認用 sendMsg(message.channels.id, "起きましたぁ");
  if(client.user == null){
    console.log("error: client.user が null でした");
    return
  }
  client.user.setPresence({ activities: [{ name: 'げーむ' }] });
});

//指定ワードに対する返答
client.on('messageCreate', message =>{

  if(client.user == null){
    console.log("error: client.user が null でした");
    return
  }

  //取得したワードがBotからか確認
  if (message.author.id == client.user.id){
    return;
  }else{
    //取得したワードをターミナル上に表示
    console.log("メッセージ受信: " + message.content);
  }

  //Botにリアクションがあった場合
  if(message.mentions.has(client.user)){
    RepText = "呼んだ？";
    sendReply(message, RepText);
    return;
  }
  //対象メッセージに対するリアクション
  if (message.content.match(/にゃ～ん|にゃーん/)){
    sendMsg(message.channel, "にゃ～ん");
    return;
  }

  if (message.content.match(/おみくじ/)){
    const min = 1;
    const max = 5;
    const randomNumber = Math.floor( Math.random() * (max + 1 - min) ) + min;
    switch (randomNumber){
      case 1:RepText="大吉だぁぁぁぁ";break;
      case 2:RepText="まぁ中吉ということで";break;
      case 3:RepText="吉です";break;
      case 4:RepText="ラッキーアイテムはプリパラのカード！";break;
      default:RepText="死ぬがよい";break;
    }
    //Bot側のテキスト送信をターミナル上で表示
    console.log("ランダムNo. " + randomNumber);
    console.log(RepText);
    //おみくじ結果を返信
    sendMsg(message.channel, RepText);
    return;
  }
});

//この処理何？
client.login( process.env.DISCORD_BOT_TOKEN );

//Bot側のリプライをターミナル上で表示
function sendReply(message: Message, text: string){
  message.reply(text)
    .then(() => console.log("リプライ送信: " + text))
    .catch(console.error);
}

//この処理何？
function sendMsg(channel: TextBasedChannels , text: string){
  channel.send(text)
}
