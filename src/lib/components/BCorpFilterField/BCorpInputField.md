```jsx
let x = ''
const handleChange = e => {x = e.target.value}
<BCorpInputField
  filterState={x}
  handleChange={handleChange}
  title={'Optional Title'}
  placeholder={'Placeholder'} />
```
