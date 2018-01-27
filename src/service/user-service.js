/*
* @Author: chenyawei1227
* @Date:   2017-08-04 15:53:51
* @Last Modified by:   chenyawei1227
* @Last Modified time: 2017-08-04 16:29:22
*/

'use strict';

var _mm = require('util/mm.js');

var _user = {
	//登出
	logout : function(resolve, reject){
		_mm.request({
			url 	: _mm.getServerUrl('/user/logout.do'),
			method  : 'POST',
			success : resolve,
			error   : reject
		});
	},
	//检查登陆状态
	checkLogin : function(resolve, reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	}
}

module.exports = _user;