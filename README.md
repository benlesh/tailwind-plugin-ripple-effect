# tailwind-plugin-ripple-effect

A Tailwind plugin to add ripple effects when clicking things

**SUPER DUPER ALPHA: USE AT YOUR OWN RISK, WEIRDOS**

## Installation

```sh
npm i -D tailwind-plugin-ripple-effect
```

## Update Tailwind Config

Add the plugin to your `tailwind.config.js` file:

```js
const rippleEffectPlugin = require("tailwind-plugin-ripple-effect");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [rippleEffectPlugin],
};
```

## Start Listening For Ripple Clicks

Then you **MUST** execute `startRippleEffect()` from `tailwind-plugin-ripple-effect/start` somewhere in your application. This is a lightweight event handler that must be wired up. This will most often be done in your root component, but could be done just at the top level when your application loads. Calling `startRippleEffect()` will return a function that can be called to remove the event handler. This can be useful if you want to add and remove the feature during hot reloads, but is generally not required.

NOTE: If you stop using `ripple-effect`, you'll want to remove the call to `startRippleEffect()`. There's no efficient way to dynamically add the required JavaScript just because a class was used.

```ts
import { startRippleEffect } from "tailwind-plugin-ripple-effect/start";

const stop = startRippleEffect();

// If you wanted to stop listening for ripple effect clicks you can do that:
// stop()
```

## API

### ripple-effect

Add this to any clickable element to create the ripple effect on click.

```tsx
<button type="button" class="ripple-effect">
  Click Me
</button>
```

This can be added to any clickable element.

### ripple-color-variant

There are a number of classes to allow you to determine the color used with ripple effect, these are aligned with the colors in your Tailwind theme that exist for backgrounds. For example: `ripple-red-500`, or `ripple-slate-500`, etc. These styles will determine the color of the ripple itself.

```tsx
<button type="button" class="ripple-effect ripple-red-500">
  Click Me
</button>
```

### ripple-bg-color-variant

By default, `ripple-effect` will simply ripple over any existing background color. However, if you want to override that color _during the ripple_. You can use `ripple-bg-color-variant`... for example `ripple-bg-gray-800` or `ripple-bg-red-500`.

```tsx
<button type="button" class="ripple-effect ripple-bg-red-500 ripple-white">
  Click Me
</button>
```

### ripple-stop

If you have a clickable element, like a `<button>` wrapped in another element that has the class `ripple-effect`, clicking the button will fire the `ripple-effect` unless you add `ripple-stop` to that button, or an element between that button and the ancestor with `ripple-effect`, or you `stopPropagation()`.

### ripple-slow

Does a slower-speed ripple effect. You still need `ripple-effect`, this just slows it down. `<button class="ripple-effect ripple-slow">slower ripple</button>`. This is particularly interesting looking on larger areas.

## Known Issues

Currently you cannot trigger more than one ripple effect on click. `<div class="ripple-effect"><button type="button" class="ripple-effect">Click Me</button></div>` will only trigger the ripple in the `button` if you click it, not the `div`. The handler searches for the closest ancestor that is a `ripple-effect` and adds the animation to that, it does not propagate further. I don't know why you'd want to do that, but if you have a good use case, file an issue.

I haven't added a way to change any foreground colors or other styling while the ripple is playing. I'm open to suggestions, it's just not a requirement for me right now.

I don't have time to implement some amazing way to test this in multiple browsers. If you want to do that, **File an issue outlining your plan BEFORE you implement it**. I don't want to cause you a ton of work just to be like, "Nope, I don't want to maintain that thing you wrote". Currently I'm using this in one project that targets Chromium-based browsers only, but it _should_ work in all modern browsers, AFAICT.
