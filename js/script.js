const app = Vue.createApp({
      data() {
        return {
          books: []
        };
      },
      created() {
        fetch('json/books.json')  // 将 'your_json_file.json' 替换为实际的 JSON 文件路径
         .then(response => response.json())
         .then(data => {
            this.books = data;
          })
         .catch(error => console.error('error: ', error));
      }
    });

    app.mount('#app');