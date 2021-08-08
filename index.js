console.log("hallo world.");

//glitchからの抜粋
const http = require('http');
const querystring = require('querystring');
const { Client, Intents } = require('discord.js');

require('dotenv').config();//追加

const client = new Client({ intents: [Intents.FLAGS.GUILDS,Intents.FLAGS.GUILD_MESSAGES] });


client.on('ready', message =>{
 console.log('Bot準備完了～');
 client.user.setPresence({ activity: { name: 'げーむ' } });
});

client.on('messageCreate', message =>{
  console.log("ころな");
 if (message.author.id == client.user.id){
   return;
 }
 if(message.mentions.has(client.user)){
   sendReply(message, "呼びましたか？");
   return;
 }
 if (message.content.match(/にゃ～ん|にゃーん/)){
   let text = "にゃ～ん";
   sendMsg(message.channel.id, text);
   return;
 }
 if (message.content.match(/おみくじ/)){
   var min = 1 ;
   var max = 5 ;
   var a = Math.floor( Math.random() * (max + 1 - min) ) + min ;
   switch (a){
     case 1:
       sendMsg(message.channel.id, "大吉だぁぁぁぁ");
       break;
     case 2:
       sendMsg(message.channel.id, "まぁ中吉ということで");
       break;
     case 3:
       sendMsg(message.channel.id, "吉です");
       break;
     case 4:
       sendMsg(message.channel.id, "ラッキーアイテムはプリパラのカード！");
       break;
     default: 
       sendMsg(message.channel.id, "死ぬがよい");
       break;
   }
   return;
 }
});

if(process.env.DISCORD_BOT_TOKEN == undefined){
console.log('DISCORD_BOT_TOKENが設定されていません。');
process.exit(0);
}

console.log(process.env.DISCORD_BOT_TOKEN);
client.login( process.env.DISCORD_BOT_TOKEN );

function sendReply(message, text){
 message.reply(text)
   .then(console.log("リプライ送信: " + text))
   .catch(console.error);
}

function sendMsg(channelId, text, option={}){
 client.channels.fetch(channelId)
   .then(channel => channel.send(text, option))
   .catch(console.error);
}

//抜粋ここまで