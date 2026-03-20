export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "ANTHROPIC_API_KEY not set." });

  const { category } = req.body;
  const prompt = `You are a stock photography market research expert. Analyze current demand for the "${category}" category on Adobe Stock, Shutterstock, Getty Images in 2026.

Return ONLY valid JSON, no markdown:
{
  "trending": [
    {"subject":"specific photo subject","demand":"high|medium|rising","why":"one sentence why this sells now","tags":["tag1","tag2","tag3"]}
  ],
  "insights": "2-3 sentence market insight about this category",
  "avoid": ["oversaturated concept 1","oversaturated concept 2","oversaturated concept 3"]
}

Return exactly 8 trending subjects. Be very specific. Focus on 2026 demand.`;

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
