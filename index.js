(function () {
    // 入口函数
    function init() {
        function $(sele) {
            return document.querySelector(sele);
        }

        function $$(sele) {
            return document.querySelectorAll(sele);
        }

        // 定义默认的抽奖次数
        var num = 5;

        // 定义位置的索引
        var curIndex = 0;
        // 定义定时器
        var timer = null;



        var drawBtn = $('.draw-box-btn');
        var items = $$('.prize-item');
        var prizeNum = $('.prize-num');
        var prompt = $('.prompt');
        var promptContent = $('.prompt-content');
        var close = $('.close');
        var promptBut = $('.prompt-but');

        prizeNum.innerHTML = num;

        function bindEven() {
            drawBtn.addEventListener('click', startPrompt);
            close.addEventListener('click', closeOnClick);
            promptBut.addEventListener('click', promptOnClick);
        }
        bindEven();

        // 开始抽奖按钮点击事件
        function startPrompt() {

            if (num === 0) {
                showPrompt();
                return;
            }

            if (!timer) {
                num--;
                // 定义所转的时间
                var times = 2000 + Math.floor(Math.random() * 200);
                // 定义记录的时间
                var stopTime = times;
                timer = setInterval(function () {
                    stopTime -= 200;
                    if (stopTime <= 0) {
                        clearInterval(timer);
                        timer = null;
                        showPrompt(curIndex);
                    }

                    if (curIndex !== 0) {
                        items[curIndex - 1].classList.remove('active');
                    }
                    items[curIndex].classList.add('active');
                    curIndex++;

                    if (curIndex >= items.length) {
                        items[curIndex - 1].classList.remove('active');
                        curIndex = 0;
                    }
                }, 150);
            }
            return;
        }

        // 抽奖结束提示框弹出函数
        function showPrompt(i) {
            if (num === 0) {
                promptContent.innerHTML = '您的抽奖次数已用完';
                prizeNum.innerHTML = num;
                prompt.style.display = 'block';
                return;
            }
            var str = items[i].querySelector('span').innerHTML;
            promptContent.innerHTML = '恭喜您获得' + str;
            prizeNum.innerHTML = num;
            prompt.style.display = 'block';
        }

        // 提示框关闭按钮点击事件
        function closeOnClick() {
            prompt.style.display = 'none';
        }

        // 提示框再来一次按钮点击事件
        function promptOnClick() {
            prompt.style.display = 'none';
            startPrompt();
        }
    }

    init();
})();