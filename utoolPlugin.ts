import { PluginOption } from "vite";
import { readJSONSync, writeJsonSync, writeJSONSync } from "fs-extra";
import path from "path";

export default function utoolPlugin(): PluginOption {
  return {
    name: "utool-plugin",
    writeBundle(options) {
      const outputDir = options.dir || path.dirname(options.file);
      const pluginJsonPath = path.join(outputDir, "./plugin.json");
      const plugin = readJSONSync(pluginJsonPath);

      plugin.main = "./index.html";
      writeJsonSync(pluginJsonPath, plugin);
    },
  };
}
