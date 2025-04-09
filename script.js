function parseVideo() {
    const url = document.getElementById('urlInput').value;
    if (!url) {
        alert("请输入链接");
        return;
    }
    document.getElementById('result').innerText = "模拟解析中...（功能后续开发）";
}
