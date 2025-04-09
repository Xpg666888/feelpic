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
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt })
    });

    const result = await response.json();

    if (result?.image) {
      const imageUrl = result.image;
      document.getElementById("status").innerText = "生成成功 ✅";
      const img = document.getElementById("outputImage");
      img.src = imageUrl;
      img.style.display = "block";
      document.getElementById("lockSection").style.display = "block";
      const downloadBtn = document.getElementById("downloadBtn");
      downloadBtn.href = imageUrl;
    } else {
      document.getElementById("status").innerText = "生成失败 ❌";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "请求出错 ❌";
  }
}
