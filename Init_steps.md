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

# Linters config files  
Create **.eslintrc** file:
```
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
```
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
```
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
```
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