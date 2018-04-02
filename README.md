## CLI

```bash
$ yarn                                # install dependencies (npm install)
$ yarn styleguide:build               # buld styleguide and documentation for components
$ yarn lint                           # run linter, check no errors before committing (npm run lint)
$ yarn flow                           # run flow and check for type errors pre runtime
$ yarn flow:stop                      # stop flow server
$ yarn dev-server                     # run dev server in watch mode on port 8080 (npm run dev-server)
$ yarn dev-server:washfountain        # run washfountain dev server in watch mode on port 8081
$ yarn dev-server:bimrevit            # run bimrevit dev server in watch mode on port 8082
$ yarn precommit                      # run linter then flow to check for errors
$ yarn start:dev                      # run precommit, then dev server in watch mode (npm run start:dev)
$ yarn start:dev:washfountain         # as above but runs washfountain
$ yarn start:dev:bimrevit             # as above but runs bimrevit
$ yarn build                          # generate client distribution (npm run build)
```

## API

Make sure to set the api.baseURL property to point to your local installation of bradley.corp

## Styleguide

See [React Styleguidist](https://react-styleguidist.js.org/)
Be sure to document all Components and Props. Component’s PropTypes and documentation comments are parsed into the styleguide by the [react-docgen](https://github.com/reactjs/react-docgen) library
