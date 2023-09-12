# Notification with Telegram Bot using Supabase Edge Function

This project focuses on making HTTP POST request fromm client to invoke Supabase Edge function, which, in turn, sends message via a Telegram bot and create records in a postgreSQL database.

## overview

- Utilizes a Supabase database and an Edge Function.

- Initiates HTTP POST requests from the client application.

- Does not involve transactions and telegram webhook

## Clinet example code

```javascript
const sendMessage = async () => {
  // URL
  const basrUrl =
    "https://<PROJECT_ID>.supabase.co/functions/v1/<FUNCTION_NAME>";

  const text = "hello";

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

    console.log(`${result.text}`);
  } catch (error) {
    console.error(error);
  }
};
```

## Server example code

```javascript
serve(async (req) => {
  const { text } = await req.json();
  const supabase = createClient(supabaseUrl, supabaseKey);

  const apiUrl = `https://api.telegram.org/bot${botToken}/sendmessage?chat_id=${chatId}&text=${text}`;

   try {
    // Telegram
    const response = await fetch(apiUrl, {
      method: "POST",
    });

    // DB
    const { error } = await supabase.from("telegram_messages").insert({
    });
     } catch (error) {
       console.error(error);
     }

  return new Response()
}

```

## References

- https://core.telegram.org/bots/api

- https://supabase.com
