var args = jsArguments;

/* -------------------------- */
// Console colors

colors = {
  reset: "\x1B[0m",

  grey:    "\x1B[0;30m",
  red:     "\x1B[0;31m",
  green:   "\x1B[0;32m",
  yellow:  "\x1B[0;33m",
  blue:    "\x1B[0;34m",
  magenta: "\x1B[0;35m",
  cyan:    "\x1B[0;36m",
  white:   "\x1B[0;37m",

  bold: {
    grey:    "\x1B[1;30m",
    red:     "\x1B[1;31m",
    green:   "\x1B[1;32m",
    yellow:  "\x1B[1;33m",
    blue:    "\x1B[1;34m",
    magenta: "\x1B[1;35m",
    cyan:    "\x1B[1;36m",
    white:   "\x1B[1;37m",
  }
};

for(var c in colors){
	String.prototype[c] = (function(c){
		if (system.getKey){ // windows' prompt doesn't support colors
		  return function(){ return this; };
		} else {
		  return function(bold){
  			var color = bold ? colors.bold[c] : colors[c];
  			return color + this + colors.reset;
  		};
  	}
	})(c);
}

/* -------------------------- */
// Prints objects nicely

function prettyPrint(o){
  write(
    JSON.stringify(o, null, 2)
      .replace(/(\w+)("?)\:/g, colors.yellow+'$1'+colors.reset+'$2:')
      .replace(/([{("')}])/g, colors.magenta+'$1'+colors.reset) +
      '\n'
  );
};

/* -------------------------- */
// Returns relative time string

var timeStrings = {
  pt: {
    s: 'segundo',
    m: 'minuto',
    h: 'hora',
    d: 'day',
    m : 'mese'
  },
  en: {
    s: 'second',
    m: 'minute',
    h: 'hour',
    d: 'day',
    m : 'month'
  }
};

function relativeTime(dat){
	var s = ~~( (+new Date-Date.parse(dat)) / 1000 );
	// unidade de tempo
	var un = (s<60) ? timeStrings[LANG].s
		: (s /= 60)<60 ? timeStrings[LANG].m
		: (s /= 60)<24 ? timeStrings[LANG].h
		: (s /= 24)<30.4 ? timeStrings[LANG].d
		: (s /= 30.4)<365 ? timeStrings[LANG].m
		: 'ano';
	un += (s=~~s)>1 ? 's' : '';
	
	if (LANG == 'pt')
	  return 'há ' + s + ' ' + un.replace(mese, 'mês'); // facilita o plural
	else
	  return s + ' ' + un + ' ago';
};

/* -------------------------- */
// Detect system language (awkwardly)
// Portuguese + English for now

var d = new Date('09/01/2000');
var LANG = /Out/.test(d.toLocaleString()) ? 'pt' : 'en';

if (LANG == 'pt'){
	var ERROR_NODATA = '\nErro ao carregar dados. Você precisa autorizar o aplicativo via OAuth.'.red(1)+'\n';
	var ERROR_API = '\nErro na API do Twitter. Foi mal.\n';
	var ERROR_NOSUCHMETHOD = ('\nMétodos suportados: \n'+
	  ':get [n]             -- tweets mais recentes \n'+
	  ':search [n] [string] -- buscar pelos termos \n'+
	  ':post [text]         -- postar tweet \n'+
	  ':data                -- exibir tokens oauth \n\n').replace(/:(\w+)/g, '$1'.yellow()).replace(/(\[\w+\])/g,'$1'.magenta());
	var ERROR_AUTH = '\nErro ao fazer autorização OAuth. PIN errado?\n'.red(1);
	
} else {
	var ERROR_NODATA = '\nError loading data. You need to authorize the app first via OAuth.'.red(1)+'\n';
	var ERROR_API = '\nSomething went wrong with the request. Sorry.\n';
	var ERROR_NOSUCHMETHOD = ('\nSupported methods: \n'+
	  ':get [n]             -- get most recent tweets \n'+
	  ':search [n] [string] -- search for the specified terms \n'+
	  ':post [text]         -- post tweet \n'+
	  ':data                -- display oauth tokens \n\n').replace(/:(\w+)/g, ' $1'.yellow()).replace(/(\[\w+\])/g,'$1'.magenta());
	var ERROR_AUTH = '\nError authorizing app via OAuth. Wrong PIN?\n'.red(1);
}