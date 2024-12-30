import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";
import { fileURLToPath } from "url";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
    mode: "production",
    entry: path.resolve(dirname, "src/index.ts"),
    output: {
        path: path.resolve(dirname, "build"),
        filename: "index.js",
        library: {
            type: "module"
        },
        clean: true
    },
    resolve: {
        extensions: [".ts", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(dirname, "build/*"),
                path.resolve(dirname, "types/*")
            ]
        })
    ],
    experiments: {
        outputModule: true
    },
    target: "web"
};
