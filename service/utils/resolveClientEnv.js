const prefixRegEx = /^(VUE_APP_|HBX_)/

module.exports = function resolveClientEnv(options, raw) {
    const env = {}
    Object.keys(process.env).forEach((key) => {
        if (prefixRegEx.test(key) || key === 'NODE_ENV') {
            env[key] = process.env[key]
        }
    })
    env.PUBLIC_PATH = options.publicPath

    if (raw) {
        return env
    }

    for (const key in env) {
        env[key] = JSON.stringify(env[key])
    }

    console.log({
        env
    });

    return env;
}
