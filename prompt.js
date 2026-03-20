export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY not set." });

  const { topic, paramString } = req.body;
  const prompt = `You are an expert Midjourney prompt engineer for stock photography. Create a highly detailed professional prompt for: "${topic}"

Use natural descriptive language (V7 style). Specify subject, setting, lighting, mood, camera style, composition. Optimise for commercial stock photography.

Return ONLY valid JSON, no markdown:
{"prompt":"detailed prompt here ${paramString}","variations":["variation 1 ${paramString}","variation 2 ${paramString}"],"tips":"one quick tip for best results"}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": apiKey, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: "claude-haiku-4-5-20251001", max_tokens: 2048, messages: [{ role: "user", content: prompt }] })
    });
    const data = await response.json();
    if (data.error) throw new Error(data.error.message);
    const raw = data.content?.[0]?.text || "";
    const match = raw.replace(/```json|```/g, "").trim().match(/\{[\s\S]*\}/);
    if (!match) throw new Error("No valid JSON returned");
    return res.status(200).json(JSON.parse(match[0]));
  } catch (err) {
    return res.status(500).json({ error: err.message || "Unknown error" });
  }
}
