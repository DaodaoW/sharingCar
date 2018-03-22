(function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      document.body.style.height = docEl.clientHeight + 'px';
      if (!clientWidth) return;
      // 根据设备的比例调整初始font-size大小
      if(clientWidth>640) clientWidth = 640;
        docEl.style.fontSize = 28 * (clientWidth / 320) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);