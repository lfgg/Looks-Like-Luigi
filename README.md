# Looks-Like-Luigi

A Luigi inspired skin for [Jcink Forum Hosting](https://jcink.com/).

## Source Files

See [Skinning on the Jcink.com Wiki](https://jcink.com/main/wiki/jfb-skinning)
for documentation on skinning with Jcink.com Forum Hosting in general.

- `macros.html` - The board macros- basically small modifable HTML snippits
  that are used across the board. See
  [Jcink.com Wiki Macros](https://jcink.com/main/wiki/jfb-skinning-macros)
  for more information.
- `script.ts` - This TypeScript file ends up embedded in the board wrappers
  where the string `<!-- EXTRASCRIPT -->` is located. jQuery is available by
  default on Jcink Forum Hosting, as well as any scripts embedded in the
  Board Wrappers before this script is embedded.
- `stylesheet.scss` - The main stylesheet. See
  [Jcink.com Wiki CSS Guide](https://jcink.com/main/wiki/jfb-skinning-css-guide)
  for more information.
- `wrappers.html` - The board wrappers. See
  [Jcink.com Wiki documentation for Board Wrappers](https://jcink.com/main/wiki/jfb-skinning-board-wrappers)
  for more information.

## How To Build

We're using `node` based tools for this project. Make sure you have `node` as
well as `pnpm` (or `npm`- but be sure to replace all the `pnpm` commands with
`npm`) installed before proceding.

Once you have that run `pnpm install` to get all the dependencies set up so
you can run the build scripts.

### Warnings

Don't include the following strings in your code; the XML importer doesn't
understand when things are CDATA escaped so you'll probably break the XML file:
(also the macros aren't embedded optimally anyway, so that wouldn't fix that).

- `<skin>`, `</skin>` or anything resembling that tag
- `<skinname>`, `</skinname>` or anything resembling that tag
- `<date>`, `</date>` or anything resemblign that tag
- `<stylesheet>`, `</stylesheet>` or anything resemblign that tag
- `<wrappers>`, `</wrappers>` or anything resemblign that tag
- `<macros>`, `</macros>` or anything resemblign that tag
- `<item>`, `</item>` or anything resemblign that tag outside of the
  `macros.html` file
- `<![CDATA[`, `]]>` - CDATA tags are stripped!

### Development Build

`pnpm run watch`

Ideally this would launch a server that you can test the skin out on,
but I don't have any templates downloaded; this is just so you can look at
css/js unminified in case there are issues.

### Production Build

`pnpm run build`

Builds the XML file to import into a Jcink.com Forum Hosting board. The file
ends up in `dist/output.xml`. Once you have that, upload it to your board and
you should be good to go!

## Usage

Don't use the images we're using in this code. They're hosted on our forum and
aren't included in the MIT license these files are distributed with.

We make use of:

- [jQuery](https://jquery.com/)
- [Twemoji](https://github.com/twitter/twemoji)
- [Font Awesome](https://fontawesome.com/)

## Credits

This skin is loosely based on the
[Luigi's Fan Game Gallery site](https://github.com/lfgg/lfgg.github.io) made
by [Keith Pickering](https://github.com/keithpickering).

See [Contributors](https://github.com/lfgg/Looks-Like-Luigi/graphs/contributors)
for more contributors.
