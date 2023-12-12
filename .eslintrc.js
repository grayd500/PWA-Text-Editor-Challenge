// .eslintrc.js:
module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2021,
        "sourceType": "module"
    },
    "rules": {
        "no-console": "warn", // Warn about console.log statements
        "eqeqeq": "error",    // Require === and !==
        "strict": "error",    // Require strict mode
        "no-unused-vars": "warn", // Warn about variables that are declared but not used
        "no-undef": "error"   // Disallow the use of undeclared variables
    }
  };
  

