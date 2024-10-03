## SE-2 Debuggger

### Project structure:

This is a copy-paste of @se-2/nextjs package, with an addition of `bin` folder (entry point where cli lives)

Currently they way cli works is, you call the `se-2-debugger.mjs` from the root hardhat project (it should use `hardhat-deploy` for deployments). Then this cli will will go through the `hardhat-deploy` output and update the `deployedContracts.ts` in nextjs of this app (this work is done by `bin/generateTsAbis.mjs` file)
