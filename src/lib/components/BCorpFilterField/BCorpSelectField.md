```jsx
let x = ''
const handleChange = e => {x = e.target.value}

<BCorpSelectField
  defaultOptionId={0}
  defaultOptionName={'Default'}
  options={{
    1: 'option 1',
    2: 'option 2',
    3: 'option 3',
    4: 'etc...'
  }}
  filterState={x}
  handleChange={handleChange}
  title={'Optional Title'}
 />
```
