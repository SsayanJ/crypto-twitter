# Create new Solidity Project
## Needed packages
- Install Node.js  
- Install npm (Node Package manager)  
- Install truffle
## Initialise project
```npm init```  
Accept default values  
It should create a **package.json** file.   
<br>
```truffle init```  
Will create *contracts, migrations* and *test* folders and a **truffle-config.js** file.  
## Install packages
Chai - test framework : ```npm install --save-dev chai```  
.ENV - store private variables : ```npm install dotenv```  
solc - Solidity compiler : ```npm install solc```  
solidity-docgen : ```npm install solidity-docgen```  
@truffle/hdwallet-provider - connect your wallet to truffle project : ```npm install @truffle/hdwallet-provider ```  
@openzeppelin/test-helpers - Used for unit tests: ```npm install --save-dev @openzeppelin/test-helpers```  
prettier - helps with formatting : ```npm install --save-dev --save-exact prettier```  
solidity-coverage - test coverage : ```npm install --save-dev solidity-coverage```  
ESLint - Linter : ```npm install eslint --save-dev```
@openzeppelin/contracts : ```npm install @openzeppelin/contracts```
truffle-assertions - used for tests : ```npm install --save-dev truffle-assertions``` 

# Linters config files  
Create **.eslintrc** file:
```json
{
    "extends": ["plugin:prettier/recommended"],
    "plugins": ["prettier"],
    "parserOptions": {
        "ecmaVersion": 2017,
        "reauireConfigFile": false 
    }
}
```

And **.prettierrc.js** file:
```js
module.exports = {
    printWidth: 80,
    // tabWidth: 4,
    useTabs: true,
    semi: true,
    trailingComma: "es5",
    bracketSpacing: true,
    jsxBracketSameLine: false,
    arrowParens: "always",
    proseWrap: "never",
    htmlWhitespaceSensitivity: "strict",
    endOfLine: "lf",
    [yaml]:{
        useTabs = false
    }

    };
```
And **.soliumrc.json** file:
```json
{
    "extends": "solium:recommended",
    "plugins": ["security"],
    "rules": {
    "quotes": ["warning", "double"],
    "indentation": ["warning", "tab"]
    }
}
```
And **.vscode/settings.json** file:
```json
{
    "editor.formatOnSave": true,
    "editor.tabSize": 4,
    "[yaml]": {
        "editor.insertSpaces": true,
        "editor.tabSize": 2,
        "editor.autoIndent": "none"
    },
}
```

# Truffle config
Add this code at the beginning of the **truffle-config.js** file to use **.env** info to connect to network:

```js
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider")

// Please set your mnemonic and ropsten_infura_apikey variables in a .env file

// 12 mnemonic words that represents the account that will own the contract (got in Metamask)
const ropsten_mnemonic = process.env.ropsten_mnemonic;
const main_mnemonic = process.env.main_mnemonic;

// Infura API key (project ID)
const ropsten_infura_apikey = process.env.ropsten_infura_apikey;
const main_infura_apikey = process.env.main_infura_apikey;
```

Modify compilers to use latest version:  
```js
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.4",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  },
```

Add solidity coverage plugin at the end of the list:
```js
plugins: ["solidity-coverage"],
```

Configure connection to networks:  
```js
		development: {
			host: process.env.host || "localhost",
			port: 8545,
			network_id: "*", // Match any network id,
			gas: 6721975,
		},
		ropsten: {
			provider: () =>
				new HDWalletProvider(
					ropsten_mnemonic,
					"https://ropsten.infura.io/v3/" + ropsten_infura_apikey
				),
			network_id: "3",
			gas: 8000000,
		},
		mainnet: {
			provider: () =>
				new HDWalletProvider(
					main_mnemonic,
					"https://mainnet.infura.io/v3/" + main_infura_apikey
				),
			network_id: "1",
			gas: 8000000,
		},
		coverage: {
			host: process.env.host || "localhost",
			network_id: "*",
			port: 8555, // <-- If you change this, also set the port option in .solcover.js.
			gas: 0xfffffffffff, // <-- Use this high gas value
			gasPrice: 0x01, // <-- Use this low gas price
		},
```