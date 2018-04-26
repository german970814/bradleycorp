```jsx
let x = {
  checkboxes: ['div10','plumbing','janSan'],
  other: {
    checked: false,
    content: 'some other content, this input will be disabled if other is unselected'
  }
}
const handleChange = e => {x = e}

<BCorpCheckboxField
  title={'I Normally Purchase From:'}
  filterState={x}
  handleChange={handleChange}
  options={{
    div10: 'Div 10 Distributor',
    foodService: 'Food Service Distributor',
    plumbing: 'Plumbing Wholesaler',
    safetyIndMRO: 'Safety/Industrial/MRO',
    janSan: 'Jan/San Distributor',
    iAmSpecifier: 'I am a Specifier'
  }}
  showOtherField
/>
```
