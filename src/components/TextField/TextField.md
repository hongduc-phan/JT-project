Textbox

```js
const TextField = require('./').default;

<TextField label="Username" />;
```

Textbox with Assistive text

```js
const TextField = require('./').default;

<TextField label="Username" assistiveText="Assistive text" />;
```

Textbox disabled

```js
const TextField = require('./').default;

<TextField disabled={true} label="Username" assistiveText="Assistive text" />;
```

Tall textbox

```js
const TextField = require('./').default;

<TextField label="Username" display="tall" />;
```

Error textbox

```js
const TextField = require('./').default;

<TextField label="Username" assistiveText="Invalid username" error={true} />;
```

Select box

```js
const TextField = require('./').default;
const MenuItem = require('../MenuItem').default;

<TextField label="Country" select={true} value="nKorea">
  <MenuItem value="usa">USA</MenuItem>
  <MenuItem value="russia">Russia</MenuItem>
  <MenuItem value="nKorea">North Korea</MenuItem>
  <MenuItem value="china">China</MenuItem>
</TextField>;
```

Select box disabled

```js
const TextField = require('./').default;
const MenuItem = require('../MenuItem').default;

<TextField label="Country" disabled={true} select={true} value="nKorea">
  <MenuItem value="usa">USA</MenuItem>
  <MenuItem value="russia">Russia</MenuItem>
  <MenuItem value="nKorea">North Korea</MenuItem>
  <MenuItem value="china">China</MenuItem>
</TextField>;
```
