        // 获取相关元素
        const fontSizeSelect = document.getElementById('font-size');
        const lineHeightSelect = document.getElementById('margin-top');
        const saveSettingsButton = document.getElementById('saved');
        const yournameInput = document.getElementById('yourname');
        const avatarInput = document.getElementById('avatar');
        const restoreDefaultButton = document.getElementById('clear');

        // 保存设置的点击事件处理函数
        saveSettingsButton.addEventListener('click', () => {
            const selectedFontSize = fontSizeSelect.value;
            const selectedLineHeight = lineHeightSelect.value;
            const getyourname = yournameInput.value;
            let getavatar = avatarInput.value;

            if (['cat', 'dog', 'flower'].includes(getavatar)) {
                getavatar = 'image/' + getavatar + '.jpg';
            }
            try {
                localStorage.setItem('font-size', selectedFontSize);
                localStorage.setItem('margin-top', selectedLineHeight);
                localStorage.setItem('p-margin-top', selectedLineHeight);
                localStorage.setItem('yourname', getyourname);
                localStorage.setItem('avatar', getavatar);
                alert('设置已保存！');
            } catch (error) {
                console.error('保存设置时出错:', error);
            }
        });

        // 页面加载时读取存储的设置并应用
        window.addEventListener('load', () => {
            try {
                const savedFontSize = localStorage.getItem('font-size');
                const savedLineHeight = localStorage.getItem('margin-top');
                const savedyourname = localStorage.getItem('yourname');
                const savedavatar = localStorage.getItem('avatar');

                if (savedFontSize) {
                    fontSizeSelect.value = savedFontSize;
                }

                if (savedLineHeight) {
                    lineHeightSelect.value = savedLineHeight;
                }

                if (savedyourname) {
                    yournameInput.value = savedyourname;
                }

                if (savedavatar) {
                    avatarInput.value = savedavatar;
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
                localStorage.removeItem('margin-top');
                localStorage.removeItem('yourname');
                localStorage.removeItem('avatar');
                alert('已恢复默认设置！');
                location.reload();
            } catch (error) {
                console.error('恢复默认设置时出错:', error);
            }
        });