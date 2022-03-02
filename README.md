# Gelato MultiChain Relay SDK monorepo

## Packages
- [Metabox SDK](./packages/metabox-sdk/)
- [Relay SDK](./packages/relay-sdk/)

## Development

### Install
```shell
yarn install # install main project dependencies
yarn bootstrap # install dependencies for all packages
```

### Build
- Build all packages:
```shell
yarn build
```
- Build a specific package:
```shell
yarn workspace @gelatonetwork/relay-sdk build
```

### Publish
- Make sure to have your npm auth token in a `.npmrc` file
- Run `publish:next` command:
```shell
yarn publish:next
```
