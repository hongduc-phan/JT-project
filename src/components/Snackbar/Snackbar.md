Example

```js
const Snackbar = require('./').default;
const {Error} = require('../Icons');

<div>
  <div className="snackbar-row">
    <Snackbar>Company information saved</Snackbar>
  </div>
  <div className="snackbar-row">
    <Snackbar renderIcon={<Error />} variant="error">
      Unable to save company information. Please check your internet connection.
    </Snackbar>
  </div>
</div>;
```
