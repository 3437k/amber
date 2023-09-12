import { serve } from "std/server";

serve(async (req) => {
  const { text } = await req.json();

  const botToken = Deno.env.get("BOT_TOKEN");
  const chatId = Deno.env.get("CHAT_ID");

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendmessage?chat_id=${chatId}&text=${text}`;

  // Request: 텔레그렘 봇
  const response = fetch(apiUrl, {
    method: "POST",
  });

  const responseResult = new Response(
    JSON.stringify({
      text: `${text})`,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  console.log(responseResult);

  return responseResult;
});
