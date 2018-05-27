/*
* @Author: chenyawei1227
* @Date:   2018-01-31 20:58:55
* @Last Modified by:   chenyawei1227
* @Last Modified time: 2018-02-01 00:13:50
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _user  = require('service/user-service.js');
var _mm    = require('util/mm.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(){
		$('.error-item').hide().find('.err-msg').text('');
	}
};

// page 逻辑部分
var page = {
	data : {
		username : '',
		question : '',
		answer 	 : '',
		token    : '',
	},
	//初始化一些信息，并触发事件
	init: function(){
		this.onload();
		this.bindEvent();
	},
	onload : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		//输入用户名称下一步的点击
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			if (username) {
				_user.getQuestion(username,function(res){
					_this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}else{
				//用户名不存在
				formError.show('用户名不存在');
			}
		});
		//输入用户提示问题答案的下一步点击
		$('#submit-answer').click(function(){
			var answer = $.trim($('#answer').val());
			if (answer) {
				//检查密码提示问题答案
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				},function(res){
                    _this.data.answer   = answer;
                    _this.data.token	= res;
                    _this.loadStepPassword();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}else{
				//请输入密码提示问题的答案
				formError.show('请输入密码提示问题的答案');
			}
		});
		//重置密码
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : password,
					forgetToken	 : _this.data.token					
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg){
					formError.show(errMsg);
				});
			}else{
				//请输入新密码
				formError.show('请输入不少于6位的新密码');
			}
		});
	},
	//加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
	//加载输入提示问题答案的一步
	loadStepQuestion : function(){
		//隐藏错误提示
		formError.hide();
		//做容器的切换
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	//加载输入的新密码的一步
	loadStepPassword : function(){
		// 清除错误提示
        formError.hide();
		$('.step-question').hide().siblings('.step-password').show();
	}
};

$(function(){
	page.init();
});
