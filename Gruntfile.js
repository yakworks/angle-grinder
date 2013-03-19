'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
      app: '.',
      dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

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

  grunt.registerTask('vendor-setup', 'moving things into place', function() {
    grunt.config('copy.font-awesome.files', [
      { expand:true, flatten: true, src: ['<%= yeoman.app %>/components/font-awesome/font/*'], dest: '<%= yeoman.dist %>/font/', }
    ]);

    grunt.config('copy.bootstrapx-clickover.files', [
      { expand:true, flatten: true,
        src: ['<%= yeoman.app %>/components/bootstrapx-clickover/js/*'],
        dest: '<%= yeoman.app %>/third-party/bootstrapx-clickover/js/', }
    ]);

    grunt.config('copy.jq-ui-boot.files', [
      { expand: true,dot: true,
          cwd: '<%= yeoman.app %>/components/jquery-ui-bootstrap/css/custom-theme',
          dest: '<%= yeoman.app %>/third-party/jquery-ui-bootstrap/',
          src: [ 'jquery-ui-1.10.1.custom.css', 'images/*' ]
      },
      { expand: true,dot: true,
          cwd: '<%= yeoman.app %>/components/jquery-ui-bootstrap/assets/js',
          dest: '<%= yeoman.app %>/third-party/jquery-ui-bootstrap/',
          src: [ 'jquery-ui-1.10.1.custom.min.js']
      }
    ]);
    grunt.config('copy.bootstrap.files', [
      { expand: true,
          cwd: '<%= yeoman.app %>/components/bootstrap/docs/assets',
          dest: '<%= yeoman.app %>/third-party/bootstrap/',
          src: [ 'css/*', 'js/bootstrap.*']
      }
    ]);
    grunt.config('copy.jquery-core.files', [
      { expand: true,
          cwd: '<%= yeoman.app %>/components/jquery/',
          dest: '<%= yeoman.app %>/third-party/jquery/',
          src: [ 'jquery.js', 'jquery.min.js']
      }
    ]);
    //TODO replace the "images" urls for jquery moved css
    grunt.task.run(
      'copy:font-awesome','copy:jq-ui-boot','copy:bootstrap',
      'copy:jquery-core', 'copy:bootstrapx-clickover' , 'less:dist'
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
