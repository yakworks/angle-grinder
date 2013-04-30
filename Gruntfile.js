'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeoCfg = {
      app: '.',
      dist: 'dist',
      comp: './components',
      vendor: './third-party'
  };

  grunt.initConfig({
    yeoman: yeoCfg,
    cfg:yeoCfg,

    watch: {
        coffee: {
            files: ['<%= yeoman.app %>/scripts/*.coffee'],
            tasks: ['coffee:dist']
        },
        coffeeTest: {
            files: ['test/spec/*.coffee'],
            tasks: ['coffee:test']
        },
        less: {
            files: ['<%= yeoman.app %>/styles/**/*.less'],
            tasks: ['less']
        },
        livereload: {
            files: [
                '<%= yeoman.app %>/*.html',
                '{.tmp,<%= yeoman.app %>}/styles/*.css',
                '{.tmp,<%= yeoman.app %>}/scripts/*.js',
                '{.tmp,<%= yeoman.app %>}/widgets/**/*.js',
                '<%= yeoman.app %>/images/*.{png,jpg,jpeg}'
            ],
            tasks: ['livereload']
        }
    },
    connect: {
      options: { port: 9000 },
      livereload: {
        options: {
          middleware: function (connect) {
            return [ lrSnippet, mountFolder(connect, '.tmp'), mountFolder(connect, 'app')];
          }
        }
      },
      test: {
        options: {
          middleware: function (connect) {
            return [ mountFolder(connect, '.tmp'), mountFolder(connect, 'test') ];
          }
        }
      },
      dist: {
        options: {
          middleware: function (connect) {
            return [ mountFolder(connect, 'dist') ];
          }
        }
      }
    },

    open: { server: { url: 'http://localhost:<%= connect.options.port %>' } },

    clean: {
        dist: ['.tmp', '<%= yeoman.dist %>/*'],
        server: '.tmp'
    },

    jshint: {
        options: {
            jshintrc: '.jshintrc'
        },
        all: [
            'Gruntfile.js',
            '<%= yeoman.app %>/scripts/*.js',
            'test/spec/*.js'
        ]
    },

    mocha: {
        all: {
            options: {
                run: true,
                urls: ['http://localhost:<%= connect.options.port %>/index.html']
            }
        }
    },
    coffee: {
        dist: {
            files: {
                '.tmp/scripts/coffee.js': '<%= yeoman.app %>/scripts/*.coffee'
            }
        },
        test: {
            files: [{
                expand: true,
                cwd: '.tmp/spec',
                src: '*.coffee',
                dest: 'test/spec'
            }]
        }
    },
    less: {
      dist: {
        files: [{
          expand: true,     // Enable dynamic expansion.
          cwd: '<%= yeoman.app %>/styles/',      // Src matches are relative to this path.
          src: ['boot.less'], // ['**/*.less'] Actual pattern(s) to match.
          dest: '<%= yeoman.dist %>/styles/',   // Destination path prefix.
          ext: '.css'   // Dest filepaths will have this extension.
        }],
      }
    },

    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>'
      }
    },
    usemin: {
      html: ['<%= yeoman.dist %>/*.html'],
      css: ['<%= yeoman.dist %>/styles/*.css'],
      options: {
        dirs: ['<%= yeoman.dist %>']
      }
    },

    cssmin: {
      dist: {
        files: {
          '<%= yeoman.dist %>/styles/main.css': [ '.tmp/styles/*.css','<%= yeoman.app %>/styles/*.css']
        }
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,dot: true,
          cwd: '<%= yeoman.app %>', dest: '<%= yeoman.dist %>',
          src: [ '*.{ico,txt}', '.htaccess', 'scripts/*' ]
        }]
      }
    }
  });

  grunt.registerTask('init', 'moving things into place', function() {
    var compDir = '<%= yeoman.app %>/components',
      thirdParty = '<%= yeoman.app %>/third-party'

    grunt.config('copy.third-party.files', [
      { expand:true, flatten: true,
        src: ["<%=cfg.comp%>/font-awesome/font/*"], dest: '<%=cfg.dist%>/font/'
      },

      { expand:true, flatten: true,
        src: ['<%=cfg.comp%>/bootstrapx-clickover/js/*'],
        dest: '<%=cfg.vendor%>/bootstrapx-clickover/js/',
      },

      { expand: true,
          cwd: '<%=cfg.comp%>/jquery-ui-bootstrap/css/custom-theme',
          dest: '<%=cfg.vendor%>/jquery-ui-bootstrap/',
          src: [ 'jquery-ui-1.10.1.custom.css', 'images/*' ]
      },

      { expand: true,
          cwd: '<%=cfg.comp%>/jquery-ui-bootstrap/assets/js',
          dest: '<%=cfg.vendor%>/jquery-ui-bootstrap/',
          src: [ 'jquery-ui-1.10.1.custom.min.js']
      },

      { expand: true,
          cwd: '<%=cfg.comp%>/bootstrap/docs/assets',
          dest: '<%=cfg.vendor%>/bootstrap/',
          src: [ 'css/*', 'js/bootstrap.*']
      },

      { expand: true,
          cwd: '<%=cfg.comp%>/jquery/',
          dest: '<%=cfg.vendor%>/jquery/',
          src: [ 'jquery.js', 'jquery.min.js']
      },

      { expand: true,
          cwd: '<%=cfg.comp%>/spin.js/dist',
          dest: '<%=cfg.vendor%>/spin.js/',
          src: ['*']
      },
      { expand: true,
          cwd: '<%=cfg.comp%>/jqgrid',
          dest: '<%=cfg.vendor%>/jqgrid',
          src: ['js/grid.*','js/jquery.fmatter.js','js/i18n/grid.locale-en.js','css/ui.jqgrid.css','plugins/ui.multiselect.*']
      },
      //ANGULAR, and UI
      { expand: true,
          cwd: '<%=cfg.comp%>',
          dest: '<%=cfg.vendor%>',
          src: ['angular/*.js',"angular-resource/*",'angular-ui/build/*',
                'angular-bootstrap/*',"angular-strap/dist/*","select2/*","select2-bootstrap-css/*"]
      }
    ]);

    //TODO replace the "images" urls for jquery moved css
    grunt.task.run(
      'copy:third-party', 'less:dist'
    );

  });

  grunt.renameTask('regarde', 'watch');
  // remove when mincss task is renamed
  //grunt.renameTask('mincss', 'cssmin');

  grunt.registerTask('server', function (target) {
      if (target === 'dist') {
          return grunt.task.run(['open', 'connect:dist:keepalive']);
      }

      grunt.task.run([
          'clean:server',
          'coffee:dist',
          'less:server',
          'livereload-start',
          'connect:livereload',
          'open',
          'watch'
      ]);
  });

  grunt.registerTask('test', [
      'clean:server',
      'coffee',
      'less',
      'connect:test',
      'mocha'
  ]);

  grunt.registerTask('build', [
      'clean:dist',
      'jshint',
      'test',
      'coffee',
      'less:bundles',
      'useminPrepare',
      'cssmin',
      'concat',
      'uglify',
      'copy',
      'usemin'
  ]);

  grunt.registerTask('default', ['build']);
};
