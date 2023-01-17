import { buildSync } from "esbuild";
import glob from "tiny-glob";

glob("./src/extension/**/*", { filesOnly: true }).then((files) => {
  console.log(files);
  buildSync({
    entryPoints: files,
    bundle: true,
    outdir: "dist",
    loader: { ".js": "jsx", ".png": "copy", ".json": "copy" },
  });
});
