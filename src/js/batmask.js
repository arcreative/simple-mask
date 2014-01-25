require('jquery');

module.exports = {
    defaultDelay: 1000,
    rootElement: 'body',
    mask: doMask,
    maskDelayed: doMaskDelayed,
    unmask: doUnmask
};

function doMask(el, delay) {
    el = el || $(module.exports.rootElement)[0];
    if (el.isMasked) {
        return;
    }
    el.isMasked = true;
    var mask = $('.batmask', el);
    if (mask.length === 0) {
        $(el).append('<div class="batmask"></div>');
        mask = $('.batmask', el);
        if (delay) {
            mask.css('opacity', 0);
            el.maskTimeout = setTimeout(function() {
                mask.animate({
                    opacity: 1
                });
            }, delay);
        }
    }
}

function doMaskDelayed(el) {
    doMask(el, module.exports.defaultDelay);
}

function doUnmask(el) {
    el = el || $(module.exports.rootElement)[0];
    if (!el.isMasked) {
        return;
    }
    el.isMasked = false;
    clearTimeout(el.maskTimeout);
    delete el.maskTimeout;
    var mask = $('.batmask', el);
    if (mask.length > 0) {
//        mask.stop(false);
        mask.animate({
            opacity: 0
        }, {
            complete: function() {
                mask.remove();
            }
        });
    }
}