# BCorp Filter Fields

The idea of the filter fields is that they are reusable input fields which implement a default Bradley style for each respective input type.

## The fields are designed to not manage their own state.

The state for a field should be stored somewhere higher in the tree, and a function for updating it should be passed as props to the field.

This gives maximum flexibility for us to combine the different fields in various ways, to create either a form or page filters, and keep all that state in one place.

## All fields are 'controlled components'.

@see https://reactjs.org/docs/forms.html#controlled-components

Note for each input field we make sure that it will always receive a defined value from react. This is to make sure that the react state is always the single source of truth, not the actual html elements own internal state.
