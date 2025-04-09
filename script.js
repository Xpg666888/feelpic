function generateImage() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) {
    alert("请输入一句话描述你的情绪");
    return;
  }
  document.getElementById("status").innerText = "生成中...";
  document.getElementById("outputImage").style.display = "none";

  // 模拟生成
  setTimeout(() => {
    document.getElementById("status").innerText = "（这是模拟图，后续将接入AI生成）";
    document.getElementById("outputImage").src = "https://placekitten.com/400/300";
    document.getElementById("outputImage").style.display = "block";
  }, 2000);
}
