
# Front-End Style Guide

## Folder structure

* `src/app/@core` Services and logic app. Here goes all logic that must be loaded by the entire app. Is only loaded once, on startup.
* `src/app/@modules` All **unique** components, grouped by page.
* `src/app/@shared` Components, pipes, and any element that will be used in **many** pages. They do not need to be loaded on startup.

## Naming conventions

* Folders & files > dash-case
* Variables & functions > camelCase
* Classes & interfaces > TitleCase
* Interfaces start with capital I

## CSS conventions

This project uses [BEM (Block, Element, Modifier)](http://getbem.com/naming/)

* Blocks: Standalone components
```css
.btn {}
```

* Elements: Children of blocks
```css
.btn__icon {}
```

* Modifiers: Change the style of the block
```css
.btn--green {}
.btn--large {}
```

More info: [CSS Tricks guide](https://css-tricks.com/bem-101/)

## Module conventions

* Import core modules in `app/@core/core.module.ts`
* Import shared modules in `app/@shared/shared.module.ts`
* Import feature modules (those under app/@modules) in `app/app.module.ts`
* Import feature stores in their corresponding feature module
