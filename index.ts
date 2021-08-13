// パッケージのインポート
import { Client, Intents, TextBasedChannels, Message, } from 'discord.js'
//この処理何？
require('dotenv').config();;
//この処理何？
const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });

//ターミナル上の起動確認
client.on('ready', _ =>{
  console.log('Bot準備完了～');
  if(client.user == null){
    console.log("error: client.user が null でした");
    return
  }
  client.user.setPresence({ activities: [{ name: 'げーむ' }] });
});
/*
//テストhttps://qiita.com/atticatticattic/items/c9e7d5248fda563d68b5
// make a new stream for each time someone starts to talk
function generateOutputFile(channel:TextBasedChannels, member) {
  // use IDs instead of username cause some people have stupid emojis in their name
  const fileName = `./recordings/${channel.id}-${member.id}-${Date.now()}.pcm`;
  return fs.createWriteStream(fileName);
}
//テストここまで*/

//指定ワードに対する対応
client.on('messageCreate', message =>{
  //音声取得テスト
  /*if (message.content.startsWith(config.prefix+'join')) {
    let [command, ...channelName] = msg.content.split(" ");
    if (!msg.guild) {
        return msg.reply('no private service is available in your area at the moment. Please contact a service representative for more details.');
    }
    const voiceChannel = msg.guild.channels.find("name", channelName.join(" "));
    //console.log(voiceChannel.id);
    if (!voiceChannel || voiceChannel.type !== 'voice') {
        return msg.reply(`I couldn't find the channel ${channelName}. Can you spell?`);
    }
    voiceChannel.join()
      .then(conn => {
        msg.reply('ready!');
        // create our voice receiver
        const receiver = conn.createReceiver();

        conn.on('speaking', (user, speaking) => {
          if (speaking) {
            msg.channel.sendMessage(`I'm listening to ${user}`);
            // this creates a 16-bit signed PCM, stereo 48KHz PCM stream.
            const audioStream = receiver.createPCMStream(user);
            // create an output stream so we can dump our data in a file
            const outputStream = generateOutputFile(voiceChannel, user);
            // pipe our audio data into the file stream
            audioStream.pipe(outputStream);
            outputStream.on("data", console.log);
            // when the stream ends (the user stopped talking) tell the user
            audioStream.on('end', () => {
                msg.channel.sendMessage(`I'm no longer listening to ${user}`);
            });
          }
        });
      })
    .catch(console.log);
  }
  if(msg.content.startsWith(config.prefix+'leave')) {
    let [command, ...channelName] = msg.content.split(" ");
    let voiceChannel = msg.guild.channels.find("name", channelName.join(" "));
    voiceChannel.leave();
  }
  //テストここまで*/

  //Bot側で返すテキスト
  let RepText = "";

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
    console.log("メッセージ送信：" + RepText);
    //おみくじ結果を返信
    sendMsg(message.channel, RepText);
    return;
  }
});

//Botをオンラインにする？
client.login( process.env.DISCORD_BOT_TOKEN );

//Bot側のリプライをターミナル上で表示
function sendReply(message: Message, text: string){
  message.reply(text)
    .then(() => console.log("リプライ送信: " + text))
    .catch(console.error);
}

//この処理何？
function sendMsg(channel:TextBasedChannels, text: string){
  channel.send(text)
}
