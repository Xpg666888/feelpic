async function generateImage() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) {
    alert("请输入一句描述，例如：一个人在星空下骑自行车");
    return;
  }

  document.getElementById("status").innerText = "AI正在生成插画，请稍等...";
  document.getElementById("outputImage").style.display = "none";
  document.getElementById("downloadBtn").style.display = "none";

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": "Token r8_你的Token", // ⬅️ 替换为你的真实 Token
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "f8b4b6ee0c4e64904ed1c13f7736a8b260b8142787844fba5748e5014f2e0382",
        input: { prompt: prompt }
      })
    });

    const result = await response.json();

    if (result?.urls?.get) {
      let final;
      for (let i = 0; i < 20; i++) {
        await new Promise(r => setTimeout(r, 2000));
        const statusRes = await fetch(result.urls.get, {
          headers: {
            "Authorization": "Token r8_你的Token" // ⬅️ 替换为你的 Token
          }
        });
        final = await statusRes.json();
        if (final.status === "succeeded") break;
      }

      if (final.output && final.output[0]) {
        const imageUrl = final.output[0];
        document.getElementById("status").innerText = "生成成功 ✅";
        const img = document.getElementById("outputImage");
        img.src = imageUrl;
        img.style.display = "block";

        const downloadBtn = document.getElementById("downloadBtn");
        downloadBtn.href = imageUrl;
        downloadBtn.style.display = "inline-block";
      } else {
        document.getElementById("status").innerText = "生成失败 ❌";
      }
    } else {
      document.getElementById("status").innerText = "模型调用失败 ❌";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "请求出错 ❌";
  }
}
