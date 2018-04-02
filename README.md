## CLI

```bash
$ yarn                                # install dependencies (npm install)
$ yarn styleguide:build               # buld styleguide and documentation for components
$ yarn dev-server                     # run dev server in watch mode (npm run dev-server)
$ yarn lint                           # run linter, check no errors before committing (npm run lint)
$ yarn start:dev                      # run linter, then dev server in watch mode (npm run start:dev)
$ yarn build                          # generate client distribution (npm run build)
```

## API

Make sure to set the api.baseURL property to point to your local installation of bradley.corp

## Styleguide

See [React Styleguidist](https://react-styleguidist.js.org/)
Be sure to document all Components and Props. Component’s PropTypes and documentation comments are parsed into the styleguide by the [react-docgen](https://github.com/reactjs/react-docgen) library
