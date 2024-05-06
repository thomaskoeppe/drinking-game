# Bootstrap 5 + WebPack 5 + jQuery 3 & More = Boilerplate 2.0

Cloned, extended, and modified from [Bootstrap 5 + WebPack 5 = Boilerplate](https://github.com/noreading/bootstrap5-webpack-boilerplate) (Thank you, [Dominik Hanke](https://github.com/noreading)!).

## Updates/Additions

- Updated to Bootstrap 5.3.2
- Added jQuery 3.7.1
- Added [Bootstrap Icons](https://icons.getbootstrap.com/)
- Added [Handlebars.js](https://github.com/pcardune/handlebars-loader) templating
- Pre-built sample pages, preconfigured with a common navbar and footer via Handlbars Partials
- Updated navbar to offcanvas option with dynamically active nav menu items
- Extended [favicons](https://github.com/jantimon/favicons-webpack-plugin) support
- Added robotstxt-webpack-plugin and sitemap-webpack-plugin

Module dependencies added/updated:

```JSON
      {
        "bootstrap": "^5.3.2",
        "favicons": "^7.1.5",
        "favicons-webpack-plugin": "^6.0.1",
        "handlebars-loader": "^1.7.3",
        "jquery": "^3.7.1",
      }
```

All images used in the Carousel and Cards by <a href="https://unsplash.com/@alexshuperart?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Alex Shuper</a> on <a href="https://unsplash.com/photos/a-person-in-a-field-with-a-light-on-their-head-SNliMkZHVig?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>.
  

## Original Readme

This is a professional front-end template for building web apps and sites faster, without having to create the basic
setup on your own, every time you start a new project.

The template is based on the [Bootstrap Framework](http://getbootstrap.com/) in version 5 and
uses [Webpack](https://webpack.js.org/) in version 5 as a flexible and modern module bundler. All common features for
front-end projects (like SCSS compilation, minifying of Assets, etc.) are included out of the box.

In development the [DevServer](https://webpack.js.org/configuration/dev-server/) plugin is used, to serve the page with
hot reloading enabled, so that you can see all changes in your code immediately. When you're done, just run the build
command and upload all files from the `public` folder.

In addition to the basic front-end project setup, I added some cool features like a configurable image resizing command
to make generating responsive images a breeze.

## Table of Contents

1. [Requirements](#1-requirements)
1. [Quick Start](#2-quick-start)
1. [Environment Configuration](#3-environment-configuration)
1. [Adding Google Fonts](#4-adding-google-fonts)
1. [Adding Responsive Images](#5-adding-responsive-images)
1. [Image Credits](#6-image-credits)

## 1. Requirements

The boilerplate needs [Node.js](https://nodejs.org/en/) to be installed on your system. It was tested with version 12
and newer.

## 2. Quick Start

1. Clone the repository into a new folder for your new project.

   ```bash
   git clone git@github.com:jeremycaris/bootstrap5-webpack-boilerplate-2.git my-project
   ```
2. Remove the .git directory to add your own CVS later.

   ```bash
   rm -rf .git
   ```

3. Update the `package.json`.

   ```JSON
      {
        "name": "my-project",
        "description": "A description of my new project",
        "author": "Your Name",
        "license": "MIT"
      }
   ```

4. Enable / Disable bootstrap features in `main.js`.

   ```javascript
   initBootstrap({
     tooltip: true,
     popover: true,
     toasts: true,
   });
   ```

5. Install needed dependencies

   ```bash
   npm install
   ```

6. Run webpack

   The `dev` command will start a dev server and watch for code changes in JS and SCSS files. Hot reloading is enabled, so
   that any change will be visible in your browser as you type.

   ```bash
   npm run dev
   ```

   For production usage, run the `build` command and everything you need gets packed together into the `public`
   directory. You can upload the content to any hosting provider, without further modifications.

   ```bash
   npm run build
   ```

## 3. Environment Configuration

If you use sensitive information in your code, like API keys or encryption tokens, you should never store those in your
code repository. This could lead to a security issue, especially if the repository is public.

Therefore, I included the [dotenv-webpack](https://github.com/mrsteele/dotenv-webpack) plugin in this boilerplate, that
enables you to store all your sensitive information in a `.env` file, that is ignored by git.

The `.env.default` file should contain all the variables that your application needs, but without the real data and
should contain either empty variables or default values that can be used by everyone. The variables will get replaced
during asset compilation so that only those variables are added, that are referenced in your code.

It is a common scheme to use an uppercase syntax for environment variables, as you can see in the example below.
Comments inside of .env files start with a hash.

```
# GOOGLE APIs

GOOGLE_MAPS_API_KEY=vEVmihkWZ2fqedyHQT***************
YOUTUBE_API_KEY=TnJ8YOfVuL9bbFH83T13N****************

# CACHING
CACHE_ENABLED=false
CACHE_TIMEOUT=3600
```

You can test the usage of environment variables by editing the `.envt` file and changing the value of `HELLO`. After
re-compiling the assets you should see a message in the developer console, as soon as you visit the demo page.

**Important:**

After each change of the `.env` file you need to reload Webpack, as the environment is only loaded once per runtime. If
you've got an active `npm run dev` command, you need to stop and re-run it, for the changes to take effect.

## 4. Adding Google Fonts

If you want to add fonts from [fonts.google.com](https://fonts.google.com/), you should follow a few easy steps. The
boilerplate uses the [Roboto](https://fonts.google.com/specimen/Roboto) as an example.

1. Download the required font families as ZIP files from [fonts.google.com](https://fonts.google.com/).
2. Extract the files and copy the folders to `/fonts/` in the theme directory.
3. Generate the formats "eot", "woff" and "woff2" using [transfonter.org](https://transfonter.org/) and save them.
4. Open the file `src/scss/_fonts.scss` and use the mixin `googleFont()` to add the fonts.

The mixin has 4 parameters.

| Name | Type | Description  |
|:-----|:-----|:-------------|
| name | `String` | The name of the font, used as value for `font-family` properties. |
| folder | `String` | The name of the folder, that is extracted from the ZIP file. |
| files | `String` | The first part of font filenames. |
| weights | `List` | The list of weights, that should be loaded. |

Example:

```scss
@include googleFont((
    "name": "IBM Plex Sans",
    "folder": "IBM_Plex_Sans",
    "files": "IBMPlexSans",
    "weights": (300, 400, 700)
));
```

There is also a second mixin, that can handle multiple fonts at once. This reduces the amount of code needed, if your
website or application requires multiple fonts to be loaded.

Example:

```scss
@include googleFonts((
    (
        "name": "Roboto",
        "folder": "Roboto",
        "files": "Roboto",
        "weights": (300, 400, 700)
    ),
    (
        "name": "Besley",
        "folder": "Besley",
        "files": "Besley",
        "weights": (300, 400, 700)
    ),
));
```

## 5. Adding Responsive Images

### 5.1 What is it?

This boilerplate includes a command to resize images based on a configuration file, to get rid of the hassle to care
about the responsive image sizes manually. One of the benefits of this process is that it works on all major operating
systems, without the need to do any manual installations.

If you want to use the resizing feature, please edit the file `images.config.js` in the root directory and change all
settings to your needs. You can add multiple collections with different configurations for greatest flexibility.

In order for this command to work properly you need to have "clean" filenames for your images, that don't match the
patterns used to create the resized filenames automatically. The filenames get a postfix, based on the resizing settings
for the images width and height.

Filenames, that will be recognized as original images, are as follows.

<table>
  <thead>
    <tr>
      <th>Allowed Filename</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>my-image.jpg</td>
      <td>Simple filenames</td>
    </tr>
    <tr>
      <td>my-image-1982-to-2018.jpg</td>
      <td>Filenames including numbers, also at the end.</td>
    </tr>
    <tr>
      <td>my-image-400x200-tablet.jpg</td>
      <td>Filenames including dimensions, but not at the end.</td>
    </tr>
    <tr>
      <td>my-image_400x200.jpg</td>
      <td>Filenames including dimensions, but using an underscore.</td>
    </tr>
  </tbody>
</table>

Filenames, that will **not** be recognized as original images, are as follows.

<table>
  <thead>
    <tr>
      <th>Prohibited Filename</th>
      <th>Description</th>
      <th>Pattern</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>your-image-w200.jpg</td>
      <td>Resized using a fixed width only</td>
      <td>{filename}-w{width}.{extension}</td>
    </tr>
    <tr>
      <td>your-image-h400.jpg</td>
      <td>Resized using a fixed height only</td>
      <td>{filename}-h{height}.{extension}</td>
    </tr>
    <tr>
      <td>your-image-200x400.jpg</td>
      <td>Resized using a fixed width and height</td>
      <td>{filename}-{width}x{height}.{extension}</td>
    </tr>
  </tbody>
</table>

You can use a [test tool](https://regex101.com/r/6f2cEu/4) to check if your filenames will work correctly, by adding one
filename per line into the "Test Strings" field. This helps to ensure that none of your images will be deleted.

You can use the regular expression to test files on your local machine, too. On Linux and Mac operating systems you can
check if any image in a folder would conflict with the resizing tool by using the following command:

```bash
find ./ | grep -E ".*\-([0-9]+x[0-9]+|w[0-9]+|h[0-9]+)\.[a-z]+$"
```

All files that are listed should get renamed, following the rules you can see in the tables above.

---

### 5.2 The Configuration

The responsive image configuration is saved in the `images.config.js` file, located in the root directory of the
project.

#### 5.2.1 Global Settings

The configuration has some global settings, that you should set to your personal preferences.

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>useTrash</td>
      <td>Moves files to the trash instead of deleting them directly, when using the "recreate" or "remove" argument.</td>
      <td>false</td>
    </tr>
  </tbody>
</table>

#### 5.2.2 Collections

The configuration uses **collections** which include a set of configuration options to resize images. This allows you to
define different resizing rules for multiple directories.

Each collection has the following options.

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Description</th>
      <th>Required</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>The name of the collection, to identify it in error messages, etc.</td>
      <td>yes</td>
      <td>-</td>
    </tr>
    <tr>
      <td>source</td>
      <td>The source directory of the image files that should get resized.</td>
      <td>yes</td>
      <td>-</td>
    </tr>
    <tr>
      <td>recursive</td>
      <td>Resize images in subdirectories, too?</td>
      <td>no</td>
      <td>true</td>
    </tr>
    <tr>
      <td>sizes</td>
      <td>The configurations for image sizes that get created.</td>
      <td>yes</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

#### 5.2.3 Sizes

Each collection has the option "sizes" which includes a set of configurations for different image sizes that will be
generated. Width and height are optional, if at least one of them is set.

Each size has the following options.

<table>
  <thead>
    <tr>
      <th>Option</th>
      <th>Type</th>
      <th>Description</th>
      <th>Required</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>name</td>
      <td>{string}</td>
      <td>The name of the size, to identify it in error messages, etc.</td>
      <td>yes</td>
      <td>-</td>
    </tr>
    <tr>
      <td>width</td>
      <td>{number}</td>
      <td>The width of the resized image.</td>
      <td>no</td>
      <td>-</td>
    </tr>
    <tr>
      <td>height</td>
      <td>{number}</td>
      <td>The height of the resized image.</td>
      <td>no</td>
      <td>-</td>
    </tr>
    <tr>
      <td valign="top">fit</td>
      <td valign="top">{string}</td>
      <td valign="top">The method by which the image should fit.<br /><br />
        <code>cover</code><br />Crop to cover both provided dimensions.<br /><br /><code>contain</code><br>Embed within both provided dimensions.<br /><br /><code>file</code><br />Ignore the aspect ratio of the input and stretch to both provided dimensions.<br /><br /><code>inside</code><br />Preserving aspect ratio, resize the image to be as large as possible while ensuring its dimensions are less than or equal to both those specified.<br /><br /><code>outside</code><br />Preserving aspect ratio, resize the image to be as small as possible while ensuring its dimensions are greater than or equal to both those specified.
      </td>
      <td valign="top">no</td>
      <td valign="top">cover</td>
    </tr>
    <tr>
      <td valign="top">position</td>
      <td valign="top">{string}</td>
      <td valign="top">The position When using a fit of "cover" or "contain"<br /><br /><code>left</code>, <code>right</code>, <code>top</code>, <code>bottom</code>, <code>center</code>, <code>left top</code>, <code>right top</code>, <code>left bottom</code>, <code>right bottom</code></td>
      <td valign="top">no</td>
      <td valign="top">center</td>
    </tr>
  </tbody>
</table>

---

### 5.3 The Command Line Arguments

The resizing command supports different arguments to remove resized images, recreate all images, etc.

<table>
  <thead>
    <tr>
      <th>Command</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>npm run images</td>
      <td>Creates all resized versions of a file that are missing.</td>
    </tr>
    <tr>
      <td>npm run images recreate</td>
      <td>Removes the resized versions of all files and recreates them.</td>
    </tr>
    <tr>
      <td>npm run images remove</td>
      <td>Removes the resized versions of all files.</td>
    </tr>
  </tbody>
</table>

**Important:**

The recreation and removal arguments will force the command to remove all images it detects as being resized versions (
by their filename). If you use other tools for your images that add postfixes to the filenames, this might lead to false
positives, so please backup your files before you run this.

```bash
npm run images remove
```

---

## 6. Image Credits

`Image attributions have been revised.`