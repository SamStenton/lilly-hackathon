var elixir = require('laravel-elixir')
require('laravel-elixir-vue');

elixir(function(mix) {
    mix.webpack('./public/javascripts/app.js', './public/build/app.js')
});

elixir.webpack.mergeConfig({
	resolve: {
	  alias: {
	    'vue': 'vue/dist/vue.js'
	  }
	}
});
elixir.config.assetsPath = "./public";

