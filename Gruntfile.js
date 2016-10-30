module.exports = function(grunt) {

    // 1. Общая конфигурация
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            // 2. Настройки для склеивания файлов
            js: {
                src: [
                    'node_modules/jquery/dist/jquery.min.js',
                    'web/js/app/*.js' // Все js-файлы в директории libs,
                ],
                dest: 'web/js/dest/main.js'
            },
            // 2. Настройки для склеивания файлов
            css: {
                src: [
                    'web/css/app/*.css' // Все js-файлы в директории libs,
                ],
                dest: 'web/css/dest/main.css'
            }
        },
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')(),
                    require('cssnext')(),
                    require('precss')(),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'web/css/dest/main.css',
                dest: 'web/css/dest/main.min.css'
            }
        }

    });

    // 3. Сообщаем, какие плагины мы собираемся использовать
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-postcss');


    // 4. Определяем задачу по умолчанию, которая будет выполняться при запуске команды grunt в терминале.
    grunt.registerTask('default', ['concat', 'postcss']);

};