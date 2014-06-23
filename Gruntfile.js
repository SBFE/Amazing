var banner = '/* \r\n <%=pkg.name%> \r\n @author <%=pkg.author.name%> [<%=pkg.author.email%>] \r\n @fileoverview <%=pkg.description%> \r\n @vserion <%=pkg.version%> \r\n */\r\n';
module.exports = function(grunt) {
    grunt.initConfig({
        pkg:grunt.file.readJSON('package.json'),
        uglify:{
            options:{
                banner:banner
            },
            files:{
                src:'amazing.js',
                dest:'amazing.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};

