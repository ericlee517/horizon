        // 获取相关元素
        const fontSizeSelect = document.getElementById('font-size');
        const saveSettingsButton = document.getElementById('saved');
        const restoreDefaultButton = document.getElementById('clear');

        // 保存设置的点击事件处理函数
        saveSettingsButton.addEventListener('click', () => {
            const selectedFontSize = fontSizeSelect.value;

            try {
                localStorage.setItem('font-size', selectedFontSize);
                alert('设置已保存！');
            } catch (error) {
                console.error('保存设置时出错:', error);
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
                console.error('读取存储设置时出错:', error);
            }
        });

        // 恢复默认设置的点击事件处理函数
        restoreDefaultButton.addEventListener('click', () => {
            try {
                // 这里假设只删除特定的设置键
                localStorage.removeItem('font-size');
                alert('已恢复默认设置！');
                location.reload();
            } catch (error) {
                console.error('恢复默认设置时出错:', error);
            }
        });