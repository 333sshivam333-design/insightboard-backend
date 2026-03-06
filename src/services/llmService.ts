import axios from "axios";

export const generateTasksFromTranscript = async (transcript: string) => {
  const prompt = `
Convert the following meeting transcript into tasks.

Return ONLY JSON in this format:

[
  {
    "id": 1,
    "description": "task description",
    "priority": "high | medium | low",
    "dependencies": []
  }
]

Transcript:
${transcript}
`;

  const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

  let response;
  try {
    response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_KEY as string
        }
      }
    );
  } catch (error: any) {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const details = data ? JSON.stringify(data) : error?.message;
    throw new Error(`Gemini API error${status ? ` ${status}` : ""}: ${details}`);
  }

  const text = response?.data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("Empty response from Gemini API");
  }

  const match = text.match(/\[[\s\S]*\]/);
  if (!match) {
    throw new Error("No JSON found in Gemini response");
  }

  return JSON.parse(match[0]);
};
