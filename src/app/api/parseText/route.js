
// export async function GET(request) {
//     const { searchParams } = new URL(request.url)
//     console.log("GET request", searchParams.get("name"))
  
//     return new Response(JSON.stringify({ message: "Hello World" }))
//   }
// import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai'

// 発行したAPI Keyを使って設定を定義
const openai = new OpenAI({
    apiKey: process.env["OPENAI_API_KEY"],
    dangerouslyAllowBrowser: true // ***注意*** クライアントサイドの実行を許可
  });
const parseOpenAIResponse = (response) => {
    const jsonString = response.match(/```json([^`]+)```/);
    if (jsonString && jsonString[1]) {
      try {
        return JSON.parse(jsonString[1].trim());
      } catch (error) {
        console.error("Error parsing JSON from OpenAI response:", error);
        return null;
      }
    } else {
      console.error("No JSON found in OpenAI response.");
      return null;
    }
  };

async function ask(content) {
    // メッセージを送信
    const completion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: content }],
        model: "gpt-4o",
    });
    // 回答結果を返却
    const answer = completion.choices[0].message?.content
    console.log(answer);
    return answer
}
export async function POST(request) {
    const { text } = await request.json()
    console.log("POST request", text)
    // const { text } = req.body;
    // return res.status(400).json({ error: 'Text is required' });

    if (!text) {
        return res.status(400).json({ error: 'Text is required' })
    }
    let message = text + "からタイトルと日付、場所、開場時間、開演時間、チケットリンクを抽出してください。@ruri_rba1010以前はアカウント名です。形式は ```json 除外　{ date, location, title, openingTime, startingTime, ticketLinks: string[], account } ";

    try {
        // 設定を諸々のせてAPIとやり取り
        const answer = parseOpenAIResponse(await ask(message))
        // const str = JSON.stringify(answer)
        // GPTの返答を取得
        console.log("GPT Response: ", {test: answer})
        // let response = NextResponse.next()
        return Response.json(answer)// response//new Response(str); //{ date, location, title, openingTime, startingTime, ticketLinks }))
        // res.status(200).json({ result: answer })
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
        console.error(error.response.status, error.response.data);
        res.status(error.response.status).json(error.response.data);
        } else {
        console.error(`Error with OpenAI API request: ${error.message}`);
        res.status(500).json({
            error: {
            message: "An error occurred during your request.",
            },
        });
        }
    }
}
