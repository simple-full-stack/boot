module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "env": {
        "browser": true,
        "es6": true,
        "amd": true
    },
    "globals": {
        "Promise": true,
        "process": true
    },
    "plugins": [
        "html",
        "babel",
        "import"
    ],
    "settings": {
        "html/html-extensions": [
            ".san",
            ".vue",
            ".atom"
        ]
    },
    "rules": {
        "padded-blocks": "off",
        "indent": [
            2,
            4,
            {
                "SwitchCase": 1
            }
        ],
        "generator-star-spacing": [
            2, {
                "before": false,
                "after": true
            }
        ],
        "babel/new-cap": [
            2, {
                "capIsNewExceptions": [
                    "T",
                    "AddToFavoritesBar"
                ]
            }
        ],
        "array-bracket-spacing": [
            2,
            "never"
        ],
        "babel/object-curly-spacing": [
            2,
            "never"
        ],
        "arrow-parens": [
            2,
            "as-needed"
        ],
        "no-console": process.env.NODE_ENV === "production" ? 1 : 0,
        "no-constant-condition": 1,
        "comma-dangle": 2,
        "no-debugger": 1,
        "no-dupe-keys": 1,
        "no-empty-character-class": 2,
        "no-ex-assign": 2,
        "no-extra-boolean-cast": 1,
        "no-func-assign": 1,
        "no-inner-declarations": 1,
        "no-invalid-regexp": 2,
        "no-negated-in-lhs": 2,
        "no-obj-calls": 2,
        "no-sparse-arrays": 2,
        "no-unreachable": 2,
        "use-isnan": 2,
        "valid-typeof": 2,
        "curly": [
            2,
            "all"
        ],
        "eqeqeq": [
            2,
            "allow-null"
        ],
        "guard-for-in": 1,
        "no-else-return": 1,
        "no-labels": [
            1, {
                "allowLoop": true
            }
        ],
        "no-eval": 1,
        "no-extend-native": 2,
        "no-extra-bind": 1,
        "no-implied-eval": 1,
        "no-iterator": 2,
        "no-irregular-whitespace": 1,
        "no-lone-blocks": 1,
        "no-loop-func": 1,
        "no-multi-str": 1,
        "no-native-reassign": 2,
        "no-new-wrappers": 2,
        "no-octal": 1,
        "no-octal-escape": 1,
        "no-proto": 2,
        "no-redeclare": 1,
        "no-self-compare": 2,
        "no-unneeded-ternary": 2,
        "no-with": 1,
        "radix": 2,
        "wrap-iife": [
            2,
            "any"
        ],
        "no-delete-var": 1,
        "no-dupe-args": 2,
        "no-duplicate-case": 2,
        "no-label-var": 1,
        "no-shadow-restricted-names": 2,
        "no-undef": 2,
        "no-undef-init": 1,
        "no-unused-vars": [
            1, {
                "vars": "local",
                "args": "none"
            }
        ],
        "no-use-before-define": [
            2,
            "nofunc"
        ],
        "brace-style": [
            1,
            "stroustrup", {}
        ],
        "comma-spacing": [
            2, {
                "before": false,
                "after": true
            }
        ],
        "comma-style": [
            2,
            "last"
        ],
        "new-parens": 1,
        "no-array-constructor": 2,
        "no-multi-spaces": [
            2, {
                "exceptions": {
                    "Property": true,
                    "BinaryExpression": true,
                    "VariableDeclarator": true
                }
            }
        ],
        "no-new-object": 2,
        "no-spaced-func": 2,
        "no-trailing-spaces": 2,
        "no-extra-parens": [
            2,
            "functions"
        ],
        "no-mixed-spaces-and-tabs": 2,
        "one-var": [
            2,
            "never"
        ],
        "operator-linebreak": [
            2,
            "before"
        ],
        "quotes": [
            2,
            "single"
        ],
        "semi": [
            2,
            "always"
        ],
        "semi-spacing": 2,
        "keyword-spacing": 2,
        "key-spacing": [
            2, {
                "beforeColon": false,
                "afterColon": true
            }
        ],
        "space-before-function-paren": [
            2, {
                "anonymous": "always",
                "named": "never"
            }
        ],
        "space-before-blocks": [
            2,
            "always"
        ],
        "computed-property-spacing": [
            2,
            "never"
        ],
        "space-in-parens": [
            2,
            "never"
        ],
        "space-unary-ops": 1,
        "spaced-comment": [
            2,
            "always", {
                "exceptions": [
                    "-",
                    "+",
                    "\""
                ],
                "block": {
                    "balanced": true
                }
            }
        ],
        "max-nested-callbacks": [
            1,
            3
        ],
        "max-depth": [
            1,
            6
        ],
        "max-len": [
            2,
            120,
            4, {
                "ignoreUrls": true,
                "ignoreComments": true
            }
        ],
        "max-params": [
            1,
            6
        ],
        "space-infix-ops": 2,
        "dot-notation": [
            2, {
                "allowKeywords": true,
                "allowPattern": "^catch$"
            }
        ],
        "arrow-spacing": 2,
        "constructor-super": 2,
        "no-confusing-arrow": [
            2, {
                "allowParens": true
            }
        ],
        "no-class-assign": 1,
        "no-const-assign": 2,
        "no-dupe-class-members": 1,
        "no-this-before-super": 1,
        "no-var": 1,
        "no-duplicate-imports": 1,
        "prefer-rest-params": 2,
        "unicode-bom": 1,
        "max-statements-per-line": 2,
        "import/no-unresolved": 0,
        "import/named": 2,
        "import/default": 2,
        "import/namespace": 2,
        "import/no-restricted-paths": 0,
        "import/no-absolute-path": 2,
        "import/no-dynamic-require": 1,
        "import/no-internal-modules": 0,
        "import/no-webpack-loader-syntax": 1,
        "import/export": 2,
        "import/no-named-as-default": 0,
        "import/no-named-as-default-member": 2,
        "import/no-deprecated": 2,
        "import/no-extraneous-dependencies": 0,
        "import/no-mutable-exports": 0,
        "import/unambiguous": 2,
        "import/no-commonjs": 1,
        "import/no-amd": 1,
        "import/no-nodejs-modules": 0,
        "import/first": 2,
        "import/no-duplicates": 2,
        "import/no-namespace": 0,
        "import/extensions": [
            2, {
                ".js": "never",
                ".jsx": "never",
                ".es": "never"
            }
        ],
        "import/order": 0,
        "import/newline-after-import": 2,
        "import/prefer-default-export": 0,
        "import/max-dependencies": 0,
        "import/no-unassigned-import": 0,
        "import/no-named-default": 2,
        "no-useless-constructor": 1
    }
}
