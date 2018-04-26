```jsx
let x = ''
const handleChange = e => {x = e.target.value}
<BCorpSearchField
  filterState={x}
  handleSubmit={handleChange}
  title={'Optional Title'} />
```
