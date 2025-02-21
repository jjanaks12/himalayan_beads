module.exports = {
    apps: [
        {
            name: 'Himalayan beads',
            exec_mode: 'cluster',
            instances: 'max',
            script: './.output/server/index.mjs',
            env: {
                NODE_PORT: "3000",
                NODE_ENV: "development"
            }
        }
    ]
}
