module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true,
        "es6": true,
        "jest/globals": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest",
        "react-hooks"
    ],
    "settings": {
        "react": {
          "version": "latest"
        }
    },
    "rules": {
        "react/react-in-jsx-scope": "off",
        "react/prop-types": "off"
    }
};
