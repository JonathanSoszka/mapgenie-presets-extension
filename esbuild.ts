import {buildSync} from "esbuild"
import {copyFileSync} from "fs"
import glob from "tiny-glob"

buildSync({
    entryPoints:["./src/chrome/scripts/content-script.ts"],
    bundle:true,
    outdir: 'src/chrome/scripts/dist'
})



