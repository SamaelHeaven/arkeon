import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { deleteSync } from "del";
import typescript from "rollup-plugin-typescript2";

export default {
    input: "src/index.ts",
    output: {
        file: "build/index.js",
        format: "esm",
        name: "arkeon"
    },
    plugins: [
        {
            name: "clean-folders",
            buildStart() {
                deleteSync(["build", "types"]);
            }
        },
        resolve(),
        commonjs(),
        typescript({
            useTsconfigDeclarationDir: true
        })
    ]
};
