import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import { vercelPreset } from '@vercel/remix/vite';
import tsconfigPaths from "vite-tsconfig-paths";
import ViteSvgSpriteWrapper from 'vite-svg-sprite-wrapper';

installGlobals();

export default defineConfig({
  plugins: [
    ViteSvgSpriteWrapper({
      icons: "./svg/**/*.svg",
      outputDir: "./public/assets/icon/",
      sprite: {
        shape: {
          transform: [{
            svgo: {
              plugins: [{
                name: 'preset-default',
                params: {
                  overrides: {
                    moveGroupAttrsToElems: false
                  }
                }
              }]
            }
          }]
        }
      },
      generateType: true,
      typeFileName: "IconNames",
      typeOutputDir:"./app/components/"
    }),
    remix({ presets: [vercelPreset()] }),
    tsconfigPaths()],
});
