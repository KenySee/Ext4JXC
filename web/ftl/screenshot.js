/**
 * phantomJs 脚本
 */
var page = require('webpage').create(), system = require('system'), address, output, size;

if (system.args.length < 3 || system.args.length > 5) {
    phantom.exit(1);
} else {
    address = system.args[1];
    output = system.args[2];
    //定义宽高
    page.viewportSize = {
        width : 610,
        height : 960
    };
    page.open(address, function(status) {
        if (status !== 'success') {
            console.log('Unable to post!');
        } else {
            // var bb = page.evaluate(function() {
            //     return document.getElementsByClassName('share-bg')[0].getBoundingClientRect();
            // });
            // page.clipRect = {
            //     top : bb.top,
            //     left : bb.left,
            //     width : bb.width,
            //     height : bb.height
            // };
            page.render(output);
            page.close();
        }
        phantom.exit();
        // window.setTimeout(function() {
        //     page.render(output);
        //     page.close();
        //     console.log('渲染成功...');
        // }, 1000);
    });
}