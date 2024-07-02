/* 获取作品信息 */
fetch('../json/books.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP 错误！状态: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (Array.isArray(data)) {
            for (let i = 0; i < data.length; i++) {
                const book = data[i];
                const targetDivId = `${book.book_id}`;
                const outputDiv = document.getElementById(targetDivId);

                if (outputDiv) {
                    const bookInfo = `<div class="book-info">
                            <p><strong>书名:</strong> ${book.book_name}</p>
                            <p><strong>作者:</strong> ${book.book_writer}</p>
                            <p><strong>书籍 ID:</strong> ${book.book_id}</p>
                            <p><strong>字数:</strong> ${book.book_number}</p>
                            <p><strong>章节数:</strong> ${book.book_chapter}</p>
                            <p><strong>出版时间:</strong> ${book.book_time}</p>
                            <p><strong>完结时间:</strong> ${book.book_ending_time}</p>
                            <p><strong>链接:</strong> <a href="${book.book_link}">${book.book_link}</a></p>
                          </div>`;
                    outputDiv.innerHTML += bookInfo;
                } else {
                    null
                }
            }
        } else {
            console.error('获取到的数据不是数组');
        }
    })
    .catch(error => {
        console.error('获取数据时出错:', error);
    });

/* 轮播图 */
var swiper = new Swiper(".mySwiper", {
    pagination: {
        el: ".swiper-pagination",
        dynamicBullets: true,
    },
});

window.addEventListener('load', () => {
    const yourname = localStorage.getItem('yourname');
    const avatar = localStorage.getItem('avatar');
    const name = document.getElementById('name');
    const avatarImg = document.getElementById('avatar');  // 假设这是您的 img 元素的 id

    if (yourname) {
        document.getElementById('name').innerHTML = yourname;
    }

    if (avatar) {
        avatarImg.src = avatar;  // 设置 img 的 src 属性
    }
});

function addTimestampToImgSrc(imgSrc) {
  const timestamp = new Date().getTime();
  return imgSrc + '?timestamp=' + timestamp.toString();
}

// 获取图片元素
const avatar = document.getElementById('avatar'); 
// 获取原始的图片链接
const originalAvatarSrc = avatar.src; 
// 设置添加时间戳后的图片链接
avatar.src = addTimestampToImgSrc(originalAvatarSrc);