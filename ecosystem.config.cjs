module.exports = {
    apps: [{
        name: 'Himalayan Beads',
        port: 3000,
        exec_mode: 'cluster',
        instances: 'max',
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
    }]
}