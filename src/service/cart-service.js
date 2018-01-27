/*
* @Author: chenyawei1227
* @Date:   2017-08-04 16:14:07
* @Last Modified by:   chenyawei1227
* @Last Modified time: 2017-08-04 16:29:33
*/

'use strict';

var _mm = require('util/mm.js');

var _cort = {
	getcortCount : function(resolve, reject){
		_mm.request({
			url 	: _mm.getServerUrl('/cort/get_cort_product_count.do'),
			success : resolve,
			error 	: reject
		});
	},

};