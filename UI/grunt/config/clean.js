module.exports = {
    index : [ '<%= config.files.app.index %>' ],
    dev : [ '<%= config.dir.temp %>/*' ],
    dist: [
        '<%= config.dir.temp %>/*',
        '<%= config.dir.dist %>/*',
        '<%= config.dir.reports %>/*'
    ]
};