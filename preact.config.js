const netlifyPlugin = require("preact-cli-plugin-netlify");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const imageminMozjpeg = require("imagemin-mozjpeg");

module.exports = (config, env, helpers) => {
  netlifyPlugin(config);

  const purgecss = require("@fullhuman/postcss-purgecss")({
    // Specify the paths to all the template files in your project
    content: ["./src/**/*.js"],
  });

  const postCssLoaders = helpers.getLoadersByName(config, "postcss-loader");
  postCssLoaders.forEach(({ loader }) => {
    const plugins = loader.options.postcssOptions.plugins;

    // Add tailwind css at the top.
    plugins.unshift(require("tailwindcss"));

    // Add PurgeCSS only in production.
    if (env.production) {
      plugins.push(purgecss);
    }
  });

  env.production &&
    !env.ssr &&
    config.plugins.push(
      new ImageminPlugin({
        from: "./build/assets/**",
        pngquant: {
          quality: "60",
        },
        plugins: [
          imageminMozjpeg({
            quality: 50,
            progressive: true,
          }),
        ],
      })
    );
  return config;
};
