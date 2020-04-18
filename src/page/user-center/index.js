/*
* @Author: chenyawei1227
* @Date:   2018-02-16 21:52:16
 * @Last Modified by: chenyawei
 * @Last Modified time: 2020-04-18 22:45:58
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user  = require('service/user-service.js');
var templateIndex = require('./index.string');

navSide.init({
	name : 'user-center'
});

//page 逻辑部分
var page = {
	init: function(){
		this.onload();
	},
	onload : function(){
		//初始化个人信息
		navSide.init({
			name : 'user-center'
		});
		//初始化左侧菜单
		this.loadUserInfo();
	},
	//加载用户信息
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res, msg){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
            _mm.errorTips(errMsg);
        });
	}
};

$(function(){
	page.init();
})




