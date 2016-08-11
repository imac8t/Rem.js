;
(function(psd_w, _min, _max) {
    if (!-[1, ]) {
        return 0;
    };
    var html = document.getElementsByTagName('html')[0];
    var win = window;
    var doc = document;
    var dpr = window.devicePixelRatio || 1;
    //手机宽高比
    var screen = win.screen;
    var ratio = Math.min(screen.width, screen.height) / Math.max(screen.width, screen.height);
    win.FreeUi = win.FreeUi || {};
    FreeUi['Rem'] = _rem;

    function _rem(psd_w, _min, _max) {
        var win = window;
        //设计稿宽
        var psd_w = Number(psd_w) || 640;
        //手机实际物理像素宽
        var win_w = win.innerWidth;
        var orientation = win.orientation || 0;
        if (orientation == 90 || orientation == -90) {
            //横屏
            win_w = win_w * ratio;
        }

        //去除宽杂质像素,排除实际像素影响(UC浏览器)
        var impurity = 0;
        if (window.innerWidth != window.screen.width && (window.screen.width / dpr) != window.innerWidth) {

            var val1 = (window.screen.width - window.innerWidth);
            var val2 = (window.screen.width / dpr - window.innerWidth);
            impurity = val2 > 0 ? val2 : val1;
        };
        if (impurity > 1 && impurity <= 100) {
            win_w += impurity
        };

        var size = 100 / (psd_w / win_w);
        var _min = Number(_min) || 50;
        var _max = Number(_max) || 100;
        size = size >= _max ? _max : size;
        size = size <= _min ? _min : size;
        html.style.fontSize = size + 'px';
        return size;
    };
    //立即执行
    var size = _rem();
    //某些低性能安卓机延迟0.3s执行
    setTimeout(function() {
        _rem();
    }, 300);
    //非手机端窗口改变
    var event = 'orientation' in win ? 'orientationchange' : 'resize';
    win.addEventListener(event, function() {
        setTimeout(function() {
            _rem();
        }, 100);
    }, false);
    //窗口显示
    win.addEventListener('pageshow', function() {
        _rem();
    }, false);
    //文档加载完成
    if ("complete" === doc.readyState) {
        _rem();
    };
    doc.addEventListener("DOMContentLoaded", function() {
        _rem();
    }, false);
})();
