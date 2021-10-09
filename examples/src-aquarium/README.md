# aquarium

## Building assets

`spritesheet-js` doesn't quite work right with globs containing `**`, so we have to run the command below from an interactive shell. This way, the shell expands the globs for us.

```
yarn spritesheet-js -f pixi.js --padding 2 -p public/assets/aquarium --powerOfTwo src-aquarium/assets/aquarium/**/*.png
```
