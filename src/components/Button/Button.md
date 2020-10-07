Button example:

```js
const Button = require('./').default;
<div className="button-row">
  <Button>Borderless</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="primary">Primary</Button>
</div>;
```

Button disabled

```js
const Button = require('./').default;
<div className="button-row">
  <Button disabled={true}>Borderless</Button>
  <Button disabled={true} variant="secondary">
    Secondary
  </Button>
  <Button disabled={true} variant="primary">
    Primary
  </Button>
</div>;
```

Button display size:

```js
const Button = require('./').default;
<div className="button-row">
  <Button variant="secondary" display="big">
    Secondary Big Button
  </Button>
  <Button variant="primary" display="big">
    Primary Big Button
  </Button>
</div>;
```

Button with HREF

```js
const Button = require('./').default;
<div className="button-row">
  <Button
    variant="primary"
    display="big"
    href="https://juztalent.com"
    role="button"
    target="__blank"
    rel="noopener noreferrer"
  >
    Primary Big Button
  </Button>
</div>;
```
