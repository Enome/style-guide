module.exports = function (grunt) {

  grunt.initConfig({
    clean: ['build/'],

    copy: {
      build: {
        files: [
          { src: 'index.css', dest: 'build/'},
          { src: 'starter.html', dest: 'build/index.html'},
        ] 
      } 
    },

    concat: {
      build: {
        src: [ 'styles/index.css', 'styles/highlight.css' ],
        dest: 'build/index.css'
      } 
    },

    autoprefixer: {
      build: {
        src: 'build/index.css',
        dest: 'build/index.css'
      }
    },

    browserify: {
      build: {
        options: {
          transform: ['reactify'] 
        },
        files: { 'build/index.js': 'index.js'} 
      } 
    },

    uglify: {
      build: {
        files: { 'build/index.js': 'build/index.js' } 
      } 
    }

  });
 
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'clean',
    'concat',
    'autoprefixer',
    'copy',
    'browserify',
    'uglify'
  ]);

};
