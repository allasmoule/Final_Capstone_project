// OpenAI API integration utility for legal assistant chatbot

interface OpenAIResponse {
  text: string;
  error?: string;
}

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const LEGAL_SYSTEM_PROMPT = `You are a Bangladeshi legal assistant AI. Your job is to provide accurate, helpful, and easy-to-understand information about Bangladeshi law.

CRITICAL LANGUAGE RULE (MUST FOLLOW):
- DETECT the language of the user's message carefully.
- If the user's message contains Bangla script (বাংলা অক্ষর), respond ONLY in Bangla.
- If the user's message is in English (Latin alphabet), respond ONLY in English.
- NEVER mix languages. If input is "Property Issue" or "Criminal Case" (English words), respond in English.
- If input is "সম্পত্তি" or "ফৌজদারি মামলা" (Bangla words), respond in Bangla.

IMPORTANT RESPONSE RULE:
- DO NOT ask clarifying questions. Instead, provide comprehensive information covering all common aspects of the topic.
- When user asks about a broad topic (like "criminal case", "property", "divorce"), give a detailed overview covering:
  - Definition and types
  - Legal process and steps
  - Required documents
  - Time frames
  - Costs involved
  - Important tips
- Be proactive and informative. Assume the user wants to learn everything about the topic.

Your responsibilities:
1. Family Law (marriage, divorce, child custody, maintenance)
2. Property Law (land, deeds, inheritance, registration)
3. Criminal Law (crimes, bail, FIR, charge sheet, trial process)
4. Business Law (company, contracts, trademarks)
5. Labor Law (employment, wages, workplace rights)
6. Cyber Law (online crimes, digital security)

Additional Rules:
- Provide legal guidance but clarify that this is general information; for actual legal advice, consult a lawyer
- Explain complex topics in simple language
- Mention relevant legal sections and acts when applicable
- In emergencies, advise to call 999 or the hotline
- Give practical, actionable information that users can use immediately`;

export async function generateHealthResponse(
  userMessage: string,
  context: string = "",
): Promise<string> {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: context || LEGAL_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "API request failed");
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content ||
      "দুঃখিত, উত্তর তৈরি করতে সমস্যা হয়েছে।"
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

export async function analyzeImage(
  file: File,
  context: string = "",
): Promise<string> {
  try {
    // Convert image to base64
    const base64Image = await fileToBase64(file);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: context || LEGAL_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "এই ছবিটি বিশ্লেষণ করুন এবং এর সাথে সম্পর্কিত আইনি তথ্য বা পরামর্শ দিন। যদি এটি কোনো আইনি দলিল হয়, তাহলে এর বিষয়বস্তু ব্যাখ্যা করুন।",
              },
              {
                type: "image_url",
                image_url: {
                  url: `data:${file.type};base64,${base64Image}`,
                },
              },
            ],
          },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Image analysis failed");
    }

    const data = await response.json();
    return (
      data.choices[0]?.message?.content ||
      "দুঃখিত, ছবি বিশ্লেষণ করতে সমস্যা হয়েছে।"
    );
  } catch (error) {
    console.error("OpenAI Image Analysis Error:", error);
    throw error;
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(",")[1];
      resolve(base64);
    };
    reader.onerror = (error) => reject(error);
  });
}

// Main function for the chatbot to use
export async function askOpenAI(userPrompt: string): Promise<OpenAIResponse> {
  try {
    const text = await generateHealthResponse(userPrompt, LEGAL_SYSTEM_PROMPT);
    return { text };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return {
      text: "দুঃখিত, এই মুহূর্তে আমি আপনার প্রশ্নের উত্তর দিতে পারছি না। অনুগ্রহ করে আবার চেষ্টা করুন বা আমাদের হটলাইন ০১৮৪৪-৪৪৪৪৪৪ এ যোগাযোগ করুন।",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// Re-export the legal context analyzer from geminiApi for compatibility
export { analyzeLegalContext } from "./geminiApi";
