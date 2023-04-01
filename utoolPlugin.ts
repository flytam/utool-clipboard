import { PluginOption, ResolvedConfig } from "vite";
import {
  readJSONSync,
  writeJsonSync,
  ensureDirSync,
  copyFileSync,
} from "fs-extra";
import path, { join, resolve } from "path";
import {
  InputOptions,
  OutputOptions,
  rollup,
  RollupBuild,
  watch,
} from "rollup";
import globals from "rollup-plugin-node-globals";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

async function bundleUtoolPreload(isDevelopment = false) {
  const inputOptions: InputOptions = {
    input: path.join(__dirname, "./preload/preload.ts"),
    plugins: [
      // builtins(),
      globals(),
      typescript({
        // tsconfig: "tsconfig.preload.json"
        tsconfig: false,
        target: "ESNext",
        importHelpers: false,
        include: ["preload/**/*.ts", "src/global.d.ts"],
      }),
      nodeResolve(),
      commonjs(),
    ],
    external: ["electron"],
  };

  const outputOptions: OutputOptions = {
    format: "commonjs",
    file: path.join(__dirname, "./dist", "preload.js"),
  };

  if (isDevelopment) {
    watch({
      ...inputOptions,
      output: outputOptions,
    }).on("event", (event) => {
      if (event.code === "START") {
        console.log("Starting preload build...");
      } else if (event.code === "BUNDLE_END") {
        console.log(`Preload build complete in ${event.duration}ms.`);
      } else if (event.code === "ERROR") {
        console.error("Error during preload build:", event.error);
      }
    });
  } else {
    let bundle: RollupBuild;
    bundle = await rollup(inputOptions);

    await bundle.write(outputOptions);
  }
}

export default function utoolPlugin(): PluginOption {
  let config: ResolvedConfig;
  return {
    name: "utool-plugin",

    async writeBundle(options) {
      const outputDir = options.dir || path.dirname(options.file);
      const pluginJsonPath = path.join(outputDir, "./plugin.json");
      const plugin = readJSONSync(pluginJsonPath);

      plugin.main = "./index.html";
      plugin.preload = "./preload.js";
      writeJsonSync(pluginJsonPath, plugin);
      await bundleUtoolPreload(false);
    },
    configResolved(resolvedConfig) {
      config = resolvedConfig;
    },
    async buildStart(options) {
      if (config.command === "serve") {
        bundleUtoolPreload(true);
        const files = ["logo.png", "plugin.json"];
        ensureDirSync(join(__dirname, "./dist"));
        files.forEach((file) => {
          copyFileSync(
            join(__dirname, `./public/${file}`),
            join(__dirname, `./dist/${file}`)
          );
        });
      }
    },
  };
}
