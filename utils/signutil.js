var app = getApp();
//项目URL相同部分，减轻代码量，同时方便项目迁移
//这里因为我是本地调试，所以host不规范，实际上应该是你备案的域名信息
var api_code = "e41cb9758974db0c5e102a655de20783";
var api_secret = "cb952c169b3a08dabfcb69570d09c04a";


var utilMd5 = require('md5.js');

// object-->string
function raw(args) {
  var keys = Object.keys(args)
  keys = keys.sort()
  var newArgs = {}
  keys.forEach(function (key) {
    newArgs[key] = args[key]
  })
  var string = ''
  for (var k in newArgs) {
    string += '&' + k + '=' + newArgs[k]
  }
  string = string.substr(1)
  return string
}

// 没有参数接口加密获取sign
function getOneParamSign(time_stamp) {
  var ret = {
    api_code: api_code,
    time_stamp: time_stamp,
  }
  var string = raw(ret)
  string = string + '&AppSecret=' + api_secret
  console.log(string)

  return utilMd5.hexMD5(utf8(string)).toUpperCase();
}

//banner 
function getbannerSign(sign) {
 
  var string = raw(sign)
  string = string + '&AppSecret=' + api_secret
  console.log(string)

  return utilMd5.hexMD5(utf8(string)).toUpperCase();
}
// login参数接口加密获取sign
function getLoginSign(tel, verification, phonetype, wxpingzheng, us_idcard, time_stamp) {
  var ret = {
    api_code: api_code,
    tel: tel,
    verification: verification,
    phonetype: phonetype,
    wxpingzheng: wxpingzheng,
    us_idcard: us_idcard,
    time_stamp: time_stamp
  }
  var string = raw(ret)
  string = string + '&AppSecret=' + api_secret
  console.log(string)

  return utilMd5.hexMD5(utf8(string)).toUpperCase();
}



function utf8(inputStr) { //将中文转为UTF8
  var outputStr = "";
  for (var i = 0; i < inputStr.length; i++) {
    var temp = inputStr.charCodeAt(i);
    //0xxxxxxx
    if (temp < 128) {
      outputStr += String.fromCharCode(temp);
    }
    //110xxxxx 10xxxxxx
    else if (temp < 2048) {
      outputStr += String.fromCharCode((temp >> 6) | 192);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
    //1110xxxx 10xxxxxx 10xxxxxx
    else if (temp < 65536) {
      outputStr += String.fromCharCode((temp >> 12) | 224);
      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
    //11110xxx 10xxxxxx 10xxxxxx 10xxxxxx
    else {
      outputStr += String.fromCharCode((temp >> 18) | 240);
      outputStr += String.fromCharCode(((temp >> 12) & 63) | 128);
      outputStr += String.fromCharCode(((temp >> 6) & 63) | 128);
      outputStr += String.fromCharCode((temp & 63) | 128);
    }
  }
  return outputStr;
}


/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
module.exports.getOneParamSign = getOneParamSign;
module.exports.getLoginSign = getLoginSign;
module.exports.getbannerSign = getbannerSign;