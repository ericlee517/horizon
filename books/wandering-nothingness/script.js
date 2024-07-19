/* book_id 验证和目录相关 */
const app = Vue.createApp({
    data() {
        return {
            currentBook: null,
            books: []
        };
    },
    created() {
        fetch('../../json/books.json')
          .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 错误！状态: ${response.status}`);
                }
                return response.json();
            })
          .then(data => {
                this.books = data;

                const currentUrl = window.location.href;
                const params = new URLSearchParams(currentUrl.split('?')[1]);
                const bookId = params.get('id');

                if (bookId) { 
                    for (const book of this.books) {
                        if (book.book_id === bookId) {
                            this.currentBook = book;
                            // 保存到 localStorage
                            localStorage.setItem('currentBook', JSON.stringify(book));
                            break;
                        }
                    }
                } else {
                    console.warn('warning: The id parameter is empty, and the directory information cannot be obtained.');
                }
            })
          .catch(error => {
                console.error('error: ', error);
            });
    },
    mounted() {
        // 在页面挂载时尝试从 localStorage 恢复数据
        const savedCurrentBook = JSON.parse(localStorage.getItem('currentBook'));
        if (savedCurrentBook) {
            this.currentBook = savedCurrentBook;
        }
    }
});

app.mount('#app');



/* URL参数相关 */


// 获取当前查询参数中的 chapter 值
const queryParams = new URLSearchParams(window.location.search);
let currentChapter = queryParams.get('chapter');

// 定义获取上一章和下一章章节名的函数
function getPrevChapter(current) {
    let num = parseInt(current.split('-')[1]);
    if (num > 1) {
        return `chapter-${num - 1}`;
    } else {
        return null;
    }
}

/* 章节处理相关 */

function getNextChapter(current) {
    let num = parseInt(current.split('-')[1]);
    let next = `chapter-${num + 1}`;
    // 检查下一章是否存在
    return fetch(next + '.md')
        .then(response => {
            if (response.ok) {
                return next;
            } else {
                return null;
            }
        });
}

// 初始获取并显示当前章节内容
if (currentChapter) {
    fetch(currentChapter + '.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('文件未找到');
            }
            return response.text();
        })
        .then(markdownContent => {
            // 使用 marked 解析 Markdown 为 HTML
            // 将内容输出到控制台，作为测试使用
            var tokens = marked.lexer(markdownContent);
            const html = marked.parse(markdownContent);
            document.getElementById('output').innerHTML = html;
        })
        .catch(error => {
            // 文件未找到时的处理
            document.getElementById('output').innerHTML = '<p><b>[Error] </b>Cannot find the chapter <b>' + currentChapter + '</b></p>';
        });

    // 获取并显示下一章信息
    getNextChapter(currentChapter).then(next => {
        if (next) {
            fetch(next + '.md')
                .then(response => {
                    if (response.ok) {
                        return response.text();
                    } else {
                        throw new Error('文件未找到');
                    }
                })
                .then(markdownContent => {
                    // 提取下一章的第一个标题
                    const lines = markdownContent.split('\n');
                    let firstTitle = '';
                    for (const line of lines) {
                        if (line.startsWith('# ')) {
                            firstTitle = line.slice(2);
                            break;
                        }
                    }
                    const link = `<a href="?chapter=${next}">${firstTitle}</a>`;
                    document.getElementById('next_chapter').innerHTML = link;
                })
                .catch(error => {
                    document.getElementById('next_chapter').innerHTML = '已经是最后一章啦';
                });
        } else {
            document.getElementById('next_chapter').innerHTML = '已经是最后一章啦';
        }
    });

    // 获取并显示上一章信息
    const prev = getPrevChapter(currentChapter);
    if (prev) {
        fetch(prev + '.md')
            .then(response => {
                if (response.ok) {
                    return response.text();
                } else {
                    throw new Error('文件未找到');
                }
            })
            .then(markdownContent => {
                // 提取上一章的第一个标题
                const lines = markdownContent.split('\n');
                let firstTitle = '';
                for (const line of lines) {
                    if (line.startsWith('# ')) {
                        firstTitle = line.slice(2);
                        break;
                    }
                }
                const link = `<a href="?chapter=${prev}">${firstTitle}</a>`;
                document.getElementById('prev_chapter').innerHTML = link;
            })
            .catch(error => {
                document.getElementById('prev_chapter').innerHTML = '已经是第一章啦';
            });
    } else {
        document.getElementById('prev_chapter').innerHTML = '已经是第一章啦';
    }
} else {
    // 没有指定 chapter 参数时的处理
    document.getElementById('output').innerHTML = '<p><b>[Error] </b>parameter "chapter" is not define.</p>';
}

window.addEventListener('DOMContentLoaded', () => {
    const getLocalStorageValue = (key, defaultValue) => {
        const value = localStorage.getItem(key);
        if (value && !isNaN(parseFloat(value))) {
            return parseFloat(value);
        }
        return defaultValue;
    };

    const fontSize = getLocalStorageValue('font-size', 16);

    const Article = document.getElementById('article');
    Article.style.fontSize = fontSize + 'px';

});

// 获取当前页面的 URL 对象
var currentUrl = new URL(window.location.href);

// 定义需要检查的参数名和指定的值
var parameterName = 'chapter';
var specifiedValue = 'chapter-1';

// 检查参数是否存在
if (!currentUrl.searchParams.has(parameterName)) {
    // 构建带有指定参数的新 URL
    var newUrl = currentUrl.origin + currentUrl.pathname + '?' + parameterName + '=' + specifiedValue;
    // 跳转到新的 URL
    window.location.href = newUrl;
    console.log('参数存在');
}