const app = Vue.createApp({
    data() {
        return {
            books: []
        };
    },
    created() {
        fetch('json/books.json') // 将 'your_json_file.json' 替换为实际的 JSON 文件路径
            .then(response => response.json())
            .then(data => {
                this.books = data;
            })
            .catch(error => console.error('error: ', error));
    }
});

app.mount('#app');


window.addEventListener('beforeinstallprompt', (e) => {
  // 存储事件，以便稍后使用
  window.deferredPrompt = e;
});

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  window.deferredPrompt = e;
});

document.getElementById('install').addEventListener('click', () => {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受了安装提示');
        alert('测试')
        // 在这里可以存储安装状态，以便下次不再提示
      } else {
        console.log('用户拒绝了安装提示');
      }
      window.deferredPrompt = null;
    });
  }
});