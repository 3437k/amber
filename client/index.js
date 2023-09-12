require("dotenv").config();
const os = require("os");

const args = process.argv.slice(2) 
const argMessage = args.length > 0 ? args[0] : "";

const sendMessage = async () => {
  // Public API Key
  const anonKey = process.env.ANNO_KEY;

  // URL
  const basrUrl =
    "https://nertqmyxhuifoogrxbdf.supabase.co/functions/v1/handle-telegrambot-and-log";

  // Message to target user
  const text =
    `${os.hostname} ${os.machine}\n${os.userInfo().username}\n` +
    new Date() +
    ` ${argMessage}`;

  // Send Message
  try {
    const response = await fetch(basrUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `${text}`,
      }),
    });
    const result = await response.json();

    console.log(`메세지 전송 완료\n${result.text}`);
  } catch (error) {
    console.error(error);
  }
};

sendMessage();
