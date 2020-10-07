Example

```js
const Button = require('../Button').default;
const Modal = require('./').default;

initialState = {isOpen: false};

<div>
  <Button variant="primary" onClick={() => setState({isOpen: true})}>
    Open
  </Button>
  <Modal
    open={state.isOpen}
    onRequestClose={() => {
      setState({isOpen: false});
    }}
  >
    <p>Example modal. Click outside the modal can close the modal too!</p>
    <Button variant="secondary" onClick={() => setState({isOpen: false})}>
      Close
    </Button>
  </Modal>
</div>;
```
