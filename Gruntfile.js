module.exports = function (grunt) {


  grunt.initConfig({
    clean: ['build/'],

    copy: {
      build: {
        files: [
          { src: 'index.css', dest: 'build/'}
        ] 
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
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', [
    'clean',
    'copy',
    'browserify',
    'uglify'
  ]);

};
