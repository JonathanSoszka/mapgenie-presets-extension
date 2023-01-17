import {buildSync} from "esbuild"
import {copyFileSync} from "fs"
import glob from "tiny-glob"

buildSync({
    entryPoints:["./src/extension/scripts/content-script.tsx"],
    bundle:true,
    outdir: 'src/extension/scripts/dist',
    loader: {'.js': 'jsx'}
})



