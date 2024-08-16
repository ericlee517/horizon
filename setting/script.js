        // 获取相关元素
        const fontSizeSelect = document.getElementById('font-size');
        const saveSettingsButton = document.getElementById('saved');
        const restoreDefaultButton = document.getElementById('clear');

        // 保存设置的点击事件处理函数
        saveSettingsButton.addEventListener('click', () => {
            const selectedFontSize = fontSizeSelect.value;

            try {
                localStorage.setItem('font-size', selectedFontSize);
                Toastify({
                    text: "已保存设置！",
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "rgb(39,117,182)",
                    }
                }).showToast();
            } catch (error) {
               console.error(error);
               Toastify({
                    text: "保存失败，请尝试刷新本页面。",
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "rgb(240,75,34)",
                    }
                }).showToast();
            }
        });

        // 页面加载时读取存储的设置并应用
        window.addEventListener('load', () => {
            try {
                const savedFontSize = localStorage.getItem('font-size');

                if (savedFontSize) {
                    fontSizeSelect.value = savedFontSize;
                }
            } catch (error) {
                console.error(error);
                Toastify({
                    text: "载入数据时出错。",
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "rgb(240,75,34)",
                    }
                }).showToast();
                
        
            }
        });

        // 恢复默认设置的点击事件处理函数
        restoreDefaultButton.addEventListener('click', () => {
            try {
                // 这里假设只删除特定的设置键
                localStorage.removeItem('font-size');
                Toastify({
                    text: "已恢复默认设置！",
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "rgb(39,117,182)",
                    }
                }).showToast();
            } catch (error) {
                console.error(error);
                Toastify({
                    text: "恢复默认设置时出错。",
                    duration: 3000,
                    newWindow: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                        background: "rgb(240,75,34)",
                    }
                }).showToast();
            }
        });