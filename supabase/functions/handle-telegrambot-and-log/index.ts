import { serve } from "std/server";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

serve(async (req) => {
  const { text } = await req.json();

  const supabaseUrl = Deno.env.get("SBASE_URL");
  const supabaseKey = Deno.env.get("SBASE_ANON_KEY");
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });

  const botToken = Deno.env.get("BOT_TOKEN");
  const chatId = Deno.env.get("CHAT_ID");

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendmessage?chat_id=${chatId}&text=${text}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
    });

    const { ok, result } = await response.json();

    let isSent = 0;
    if (ok) {
      isSent = 1;
    }

    const { error } = await supabase.from("telegram_messages").insert({
      sender_id: result?.from?.id,
      message_id: result.message_id,
      sender_username: result?.from?.username,
      recipient_id: result?.chat?.id,
      recipient_username: result?.chat?.username,
      message_text: result?.text,
      is_sent: isSent,
      sent_at: result?.date,
    });
    console.error(`INSERT ERROR: ${error}`);
  } catch (error) {
    console.error(error);
  }

  return new Response(
    JSON.stringify({
      text: `${text}`,
    }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
});
