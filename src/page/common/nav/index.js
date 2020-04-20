/*
* @Author: chenyawei1227
* @Date:   2017-08-04 15:13:00
 * @Last Modified by: chenyawei
 * @Last Modified time: 2020-04-20 20:05:52
*/

'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var _user= require('service/user-service.js');
var _cart= require('service/cart-service.js');
var nav = {
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;
	},
	bindEvent : function(){
		//登陆 注册 退出 都用事件的方式来写
		//登陆点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
		//退出点击事件
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg); 
			});
		});
	},
	 // 加载用户信息
    loadUserInfo : function(){
        _user.checkLogin(function(res){
            $('.user.not-login').hide().siblings('.user.login').show()
                .find('.username').text(res.username);
        }, function(errMsg){
            // do nothing
        });
    },
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-cont').text(res || 0);
		}, function(errMsg){
			$('.nav .cart-cont').text(0);
		});
	}
};

module.exports = nav.init();  //作为一个模块输出出去