/*
* @Author: chenyawei1227
* @Date:   2018-02-16 22:00:01
 * @Last Modified by: chenyawei
 * @Last Modified time: 2020-04-17 13:32:42
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
		this.bindEvent();
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
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		}, function(errMsg){
			_mm.errorTips(errMsg);
		});
	},	
	bindEvent : function(){
		var _this = this;
		//因为修改用户信息页面是通过js渲染得到的，
		//bindEvent就无法监听到页面里的事件，
		//需要全局监听事件，通过事件冒泡来监听是哪一个元素。
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {			
				phone 	 : $.trim($('#phone').val()),
				email 	 : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer 	 : $.trim($('#answer').val())
			},
			validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				//提交
				_user.updateUserInfo(userInfo, function(res,msg){
					_mm.successTips(msg);
					window.location.href = _mm.getUrlParam('redirect') || './user-center.html';
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				//验证失败，错误提示
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	// 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    }

};

$(function(){
	page.init();
})