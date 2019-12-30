function getHash(str) {
    var hash = 0, i, chr;
    if (str.length === 0) return hash;
    for (i = 0; i < str.length; i++) {
      chr   = str.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

function generateFileName(key) {
    var hash = Math.abs(getHash(key)) + 123;

    var datetime = new Date();
    var str = `${datetime.getFullYear()}${datetime.getMonth()}${datetime.getDay()}${datetime.getHours()}${datetime.getMinutes()}${datetime.getSeconds()}${datetime.getMilliseconds()}`;

    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < str.length; i++) {
        result += characters.charAt(((str.charCodeAt(i) - 48) * hash) % characters.length)
        result += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return result;
}

function getImagePath(url) {
    if(url == null || url == ''){
        return '';
    }
    index = url.indexOf("images");
    path = "./public/" + url.substring(index, url.length);
    return path;
}

function getArray(str) {
    if (str == null || str == '')
        return [];
    if (typeof str !== 'string')
        return [];
    if (str[0] == '[')
        str = str.substring(1, str.length - 1);

    array = [];
    strArray = str.split(',');
    if(strArray.length == 0){
        return [str];
    }else{
        strArray.forEach(function(strElement){
            array.push(strElement);
        });
        return array;
    }
}

function getOptionArray(str) {
    if (str == null || str == '')
        return [];
    if (typeof str !== 'string')
        return [];
    if (str[0] == '[')
        str = str.substring(1, str.length - 1);

    array = [];
    strArray = str.split('|');
    if(strArray.length == 0){
        return [str];
    }else{
        strArray.forEach(function(strElement){
            array.push(strElement);
        });
        return array;
    }
}

function getPin(){
    var pin = "";
    for(i = 0; i < 6; i ++){
        pin = pin + parseInt(Math.random() * 10);
    }
    return pin;
}

var functions = {
    generateFileName: generateFileName,
    getImagePath: getImagePath,
    getArray: getArray,
    getOptionArray: getOptionArray,
    getPin: getPin
};

module.exports = functions;