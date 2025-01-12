import Discord, { TextChannel } from "discord.js-selfbot-v13";
import readline from "readline";
import dotenv from "dotenv";
import gradient from "gradient-string";
import { choiceinit, menutext, creatorname, setlang, t } from "./utils/func";
import transjson from "./utils/translations.json";
dotenv.config();

export const client = new Discord.Client({
  checkUpdate: false,
  partials: [],
});

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const token = process.env.TOKEN;
function loading2() {
  let ponto = 0;
  return setInterval(() => {
    process.stdout.write(
      `\r${gradient(["purple", "pink"])(`Connecting${".".repeat(ponto)}`)}`
    );
    ponto = (ponto + 1) % 4;
  }, 500);
}
const loading = loading2();
client.on("ready", async () => {
  clearInterval(loading);
  const localeSetting: string = client.settings.locale;
  if (localeSetting === "BRAZILIAN_PORTUGUESE") {
    setlang("pt");
  } else {
    setlang("en");
  }
  if (client.guilds.cache.get("1308599261977514079")) {
    if (
      client.guilds.cache
        .get("1308599261977514079")
        .channels.cache.get("1308825784529584192")
    ) {
      (
        client.guilds.cache
          .get("1308599261977514079")
          .channels.cache.get("1308825784529584192") as TextChannel
      )
        .send({ content: "Hello world" })
        .catch((error) => {});
    } else {
      console.log("...");
    }
  } else {
    console.log(gradient(["red", "orange"])(t("nosvr")));
    process.exit(1);
  }
  menutext(client);
  choiceinit(client);
  const r = new Discord.RichPresence()
    .setApplicationId("1137916019810254890")
    .setType("PLAYING")
    .setURL("https://discord.gg/s6mHzn6VYT")
    .setName("☣ King Community")
    .setState("🛠 Running Cloner...")
    .setDetails("The best server about selfbots and bots")
    .setAssetsLargeImage(
      "https://media.discordapp.net/attachments/1314784730499125380/1314820502673686528/46aP2QbqUqBqq1FvyEinJVAsuax5BruULRhesaYXVVCwq6PGujRgrWjb7rWPZ6xtq4LxDzPL36dXnZdWNfCVZ5W73Nxm.gif.0d37461a13e395c186d4a8f1a18ddf20.gif?ex=67552984&is=6753d804&hm=f0312b22f9f7c9c8c715e0d44d31d7883bedab5bca832386bb63bec31251b145&="
    )
    .setAssetsLargeText("King Community")
    .setStartTimestamp(new Date(1677642874 * 1000))
    .addButton(t("join"), "https://discord.gg/s6mHzn6VYT");
  client.user.setActivity(r);
  client.user.setPresence({ status: "idle" });
});

client.once("finish", (_event) => {
  client.user.setActivity();
});

if (!token) {
  console.clear();
  creatorname();
  clearInterval(loading);
  rl.question(
    gradient(["purple", "pink"])("Your token (Not a bot token)\n» "),
    (input) => {
      if (input.trim() === "") {
        console.log(gradient(["red", "orange"])("this token is empty"));
        process.kill(1);
      } else {
        client.login(input).catch((error) => {
          if (error.message === "An invalid token was provided.") {
            console.clear();
            console.log(gradient(["red", "orange"])("Invalid token"));
          } else {
            console.clear();
            console.error(
              gradient(["red", "orange"])(
                `Erro ao fazer login: ${error.message}`
              )
            );
          }
        });
      }
    }
  );
} else {
  console.clear();
  client.login(token).catch((error) => {
    console.clear();
    if (error.message === "An invalid token was provided.") {
      console.log(gradient(["red", "orange"])("Invalid token"));
    } else {
      console.clear();
      console.error(gradient(["red", "orange"])(error.message));
    }
  });
}

export type Translations = {
  en: { [key: string]: string };
  pt: { [key: string]: string };
};
export const translations: Partial<Translations> = transjson;
