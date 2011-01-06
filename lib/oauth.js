function generateNonce(length) {
	var nonceChars = "0123456789abcdefghijklmnopqrstuwvxyzABCDEFGHIJKLMNOPQRSTUWVXYZ";
	var length = length || 32;
	var result = "";
	for (var i = 0; i < length; i++) {
	    result += nonceChars.charAt(Math.floor(Math.random() * nonceChars.length));
	}
	return result;
}

function encode(toEncode){
 if( toEncode == null || toEncode == "" ) return "";
 else {
    var result= encodeURIComponent(toEncode);
    // Fix the mismatch between OAuth's  RFC3986's and Javascript's beliefs in what is right and wrong ;)
    return result.replace(/\!/g, "%21")
                 .replace(/\'/g, "%27")
                 .replace(/\(/g, "%28")
                 .replace(/\)/g, "%29")
                 .replace(/\*/g, "%2A");
 };
}

function signature(httpMethod, uri, params){
	var s = httpMethod + '&';
	s += encode(uri) + '&';
	var p = [];
	for (var k in params){
		p.push(encode(k) + '%3D' + encode(params[k].toString()));
	}
 	s += p.sort().join("%26");
	return s;
}

function serializeHeader(params){
	var p = [];
	for (var k in params){
		p.push(k.toString() + '="' + encode(params[k].toString())+'"');
	}
 	return p.sort().join(", ");
};

function serialize(obj) {
  var s = [];
  for(var p in obj)
     s.push(p + "=" + encode(obj[p]));
  return s.join("&");
};