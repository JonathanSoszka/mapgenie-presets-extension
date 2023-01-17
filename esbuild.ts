import {buildSync} from "esbuild"
import {copyFileSync} from "fs"
import glob from "tiny-glob"

buildSync({
    entryPoints:["./src/chrome/scripts/content-script.tsx"],
    bundle:true,
    outdir: 'src/chrome/scripts/dist',
    loader: {'.js': 'jsx'}
})



