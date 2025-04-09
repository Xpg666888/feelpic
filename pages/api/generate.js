export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: '只允许 POST 请求' });
  }

  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ error: '缺少 prompt 参数' });
  }

  try {
    const prediction = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": "Token r8_C92Qickk3rv4absxtrnWPnRLBkopBO03mEPN3",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "f8b4b6ee0c4e64904ed1c13f7736a8b260b8142787844fba5748e5014f2e0382",
        input: { prompt }
      })
    });

    const predictionJson = await prediction.json();
    const statusUrl = predictionJson?.urls?.get;

    if (!statusUrl) {
      return res.status(500).json({ error: 'Replicate 返回失败' });
    }

    // 轮询等待生成完成
    let finalResult;
    for (let i = 0; i < 20; i++) {
      await new Promise(r => setTimeout(r, 2000));
      const checkRes = await fetch(statusUrl, {
        headers: {
          "Authorization": "Token r8_C92Qickk3rv4absxtrnWPnRLBkopBO03mEPN3"
        }
      });
      finalResult = await checkRes.json();
      if (finalResult.status === "succeeded") break;
    }

    if (finalResult?.output?.[0]) {
      res.status(200).json({ image: finalResult.output[0] });
    } else {
      res.status(500).json({ error: "生成失败或超时" });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "服务器错误" });
  }
}
