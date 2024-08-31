

// import OpenAI from 'openai';

// interface AIClient {
//   generateChatCompletion(messages: Array<{ role: string; content: string }>): Promise<string>;
// }

// export class OpenAIClient implements AIClient {
//   private openai: OpenAI;

//   constructor(apiKey: string) {
//     this.openai = new OpenAI({ apiKey });
//   }

//   async generateChatCompletion(messages: Array<{ role: string; content: string }>): Promise<string> {
//     const response = await this.openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages,
//     });

//     return response.choices[0].message.content ?? ''; // Provide a fallback if content is null
//   }
// }

// export class LlamaAIClient implements AIClient {
//   private apiKey: string;

//   constructor(apiKey: string) {
//     this.apiKey = apiKey;
//   }

//   async generateChatCompletion(messages: Array<{ role: string; content: string }>): Promise<string> {
//     const response = await fetch('https://api.llama.ai/v1/chat/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${this.apiKey}`,
//       },
//       body: JSON.stringify({ messages }),
//     });
//     const data = await response.json();
//     return data.choices[0]?.message.content ?? ''; // Provide a fallback if content is null
//   }
// }
