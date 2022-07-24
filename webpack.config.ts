import path from "path";
import os from "os";
import webpack, { Configuration } from "webpack";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserJSPlugin from "terser-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import purgecss from "@fullhuman/postcss-purgecss";
import PurgeCSSPlugin from "purgecss-webpack-plugin";
import glob from "glob";

function resolve(...dir: string[]) {
  return path.resolve(__dirname, ...dir);
}

function getStyleLoaders(isDev: boolean, module?: boolean) {
  const styleLoaders: webpack.RuleSetUseItem[] = [];

  styleLoaders.push(isDev ? "style-loader" : MiniCssExtractPlugin.loader, {
    loader: "css-loader",
    options: module ? {
      sourceMap: true,
      esModule: true,
      importLoaders: 2,
      modules: {
        localIdentName: isDev ? "[path][name]__[local]--[hash:base64:5]" : "[hash:base64:8]",
        localIdentContext: resolve("src")
      }
    } : {
      importLoaders: 2,
    },
  }, {
    loader: "postcss-loader",
    options: {
      sourceMap: isDev,
      postcssOptions: {
        plugins: [
          "postcss-preset-env",
          // 对css进行tree shaking
          // purgecss({
          //   content: glob.sync("src/**/*.{ts,tsx}", { nodir: true })
          // })
        ]
      }
    }
  }, {
    loader: "less-loader",
    options: {
      sourceMap: isDev
    }
  });

  return styleLoaders;
}

function getWebpackPlugins(isDev: boolean) {
  const plugins: webpack.WebpackPluginInstance[] = [
    new HtmlWebpackPlugin({
      templateContent: () => {
        return `
        <!DOCTYPE html>
        <html>
          <body>
            <div id="root"></div>
          </body>
        </html>
        `;
      },
      inject: "body"
    }),
    new PurgeCSSPlugin({
      paths: glob.sync("src/**/*.{ts,tsx}", { nodir: true }),
    })
  ];

  if (!isDev) {
    plugins.push(new MiniCssExtractPlugin({
      filename: isDev ? "css/style.[fullhash:4].css" : "css/style.[contenthash].css",
      chunkFilename: isDev ? "css/style.[fullhash:4].[id].css" : "css/style.[contenthash].[id].css",
    }));
  } else {
    plugins.push(
      new CleanWebpackPlugin()
    );
  }

  return plugins;
}

export function getWebpackConfig(env = process.env.NODE_ENV as Configuration["mode"]) {
  const isDev = env === "development";
  return {
    mode: env,
    entry: {
      index: resolve("src", "index.tsx")
    },
    devServer: {
      historyApiFallback: true,
      port: 4000
    },
    output: {
      publicPath: "/",
      path: resolve("dist"),
      filename: isDev ? "js/[name].[fullhash:4].js" : "js/[name].[contenthash].js",
      chunkFilename: isDev ? "js/[name].[fullhash:4].js" : "js/[name].[contenthash].js",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".less"],
      symlinks: true,
    },
    performance: isDev ? {
      hints: false,
    } : false,
    optimization: {
      runtimeChunk: {
        name: "runtime"
      },
      splitChunks: {
        chunks: "all", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
        minSize: 30000, // 模块超过30k自动被抽离成公共模块
        minChunks: 1, // 模块被引用>=1次，便分割
        cacheGroups: {
          default: { // 模块缓存规则，设置为false，默认缓存组将禁用
            minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
            priority: -20, // 优先级
            reuseExistingChunk: true, // 默认使用已有的模块
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendor",
            priority: -10,// 确定模块打入的优先级
            reuseExistingChunk: true,// 使用复用已经存在的模块
            enforce: true,
          }
        }
      },
      minimize: !isDev,
      minimizer: !isDev ? [
        new TerserJSPlugin({ // 多进程压缩
          // 设置缓存目录
          parallel: os.cpus().length - 1,// 开启多进程压缩
          // sourceMap,
          terserOptions: {
            compress: {
              // 删除所有的 `console` 语句
              drop_console: true,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ] : [],
    },
    devtool: isDev ? "eval-cheap-module-source-map" : "source-map",
    module: {
      rules: [{
        test: /\.tsx?$/,
        exclude: [/node_modules/, /__tests__/, /\.(spec|test)\.tsx?$/],
        include: [resolve("src")],
        use: [{
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // 开启缓存,
          }
        }]
      }, {
        test: /\.less$/,
        exclude: [/node_modules/, /\.module\.less$/],
        include: [resolve("src")],
        use: getStyleLoaders(isDev),
      }, {
        test: /\.module\.less$/,
        exclude: [/node_modules/],
        include: [resolve("src")],
        use: getStyleLoaders(isDev, true),
      }]
    },
    plugins: getWebpackPlugins(isDev),
  } as Configuration;
}

export default getWebpackConfig();