export const THEME_PREFLIGHT_CSS = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

.figma-dark {
  color-scheme: dark;
}

html,
body {
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  color: var(--figma-color-text);
  background-color: var(--figma-color-bg);
  font-family: "Inter", "Helvetica", sans-serif;
  line-height: 16px;
  font-weight: 400;
}

/* Keep rem-based theme tokens anchored to the default 16px root size;
   the 11px Figma UI font-size applies to body content only. */
body {
  font-size: 11px;
}

::selection {
  background-color: var(--figma-color-bg-onselected);
}

div,
span {
  cursor: default;
  user-select: none;
}

h1,
h2,
h3 {
  margin: 0;
  font-weight: inherit;
}

button {
  padding: 0;
  border: 0;
  background-color: transparent;
  font: inherit;
  outline: 0;
}

hr {
  border: 0;
  margin: 0;
}

label {
  display: block;
}

input,
textarea {
  padding: 0;
  margin: 0;
  cursor: default;
  font: inherit;
  outline: 0;
}

svg {
  display: block;
}
` as const;
