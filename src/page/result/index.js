/*
* @Author: chenyawei1227
* @Date:   2018-01-27 14:18:25
* @Last Modified by:   chenyawei1227
* @Last Modified time: 2018-01-27 20:45:04
*/
'sue strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
    var type        = _mm.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
        //显示对应的提示
        $element.show();
})