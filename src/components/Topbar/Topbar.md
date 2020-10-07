```js
const {Provider} = require('react-redux');
const Topbar = require('./').default;
const Logo = require('../Logo').default;
const Typo = require('../Typo').default;
const store = require('../../store').default;
const {TypoVariants, TypoColors, TypoAlignment} = require('../Typo');
const UserNavigationContainer = require('../../containers/UserNavigationContainer')
  .default;

<Provider store={store}>
  <Topbar>
    <Logo
      company="JuzTalent"
      logo="https://juztalent.com/wp-content/uploads/2017/01/cropped-juztalent.png"
    />
    <Typo
      tag="div"
      variant={TypoVariants.h4}
      color={TypoColors.greyDark}
      align={TypoAlignment.middle}
      className="topbar__title"
    >
      JusTalent
    </Typo>
    <UserNavigationContainer />
  </Topbar>
</Provider>;
```
