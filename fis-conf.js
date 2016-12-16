//fis.match('::packager', {
//  postpackager: fis.plugin('loader', {
//    :
//    allInOne: true
//  })
//});
//
//fis.match('*.{less}', {
//  parser: fis.plugin('less'),
//  rExt: '.css'
//});

//vi foo/index.js
//var fis = module.exports = require('fis3');
//fis.require.prefixes.unshift('foo');
//fis.cli.name = 'foo';
//fis.cli.info = require('./package.json');


var appurl={
  from: "./web/page/",
  out: "./webout"
};



fis.hook('amd');
fis.hook('relative');

fis.match(appurl.from+'*', {
  release: '/static/$0', // 所有资源发布时产出到 /static 目录下
  useHash:false
});

// 启用插件 
 
fis.match('**', {
  relative: true
})


// 所有js, css 加 hash
fis.match('*.{js,css,less}', {
  relative: './',  
  useHash: false
});

// 所有图片加 hash
fis.match('image', {
  relative: './',
  useHash: false
});

// fis-parser-less
fis.match('*.less', {
  parser: fis.plugin('less'),
  rExt: '.css'
});

//fis.match('*.js', {
//  optimizer: fis.plugin('uglify-js')
//});

fis.match('*.{css,less}', {
  relative: './',
  optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
  relative: './',
  optimizer: fis.plugin('png-compressor')
});

fis.match('widget/*.{js,css}', {
  isMod: true,
  release: '/static/$0'
});


// 让所有文件，都使用相对路径。 


  

fis.match('::package', {
  spriter: fis.plugin('csssprites'),
  postpackager: fis.plugin('loader', {
    allInOne: {
      js: function (file) {
        return "./static/js/" + file.filename + "_aio.js";
      },
      css: function (file) {
        return "./static/css/" + file.filename + "_aio.css";
      }
    },
    include: './widget/**.js',
    resourceType: 'amd',
    useInlineMap: true, // 资源映射表内嵌
    includeAsyncs :true //包含异步依赖
  })
});




