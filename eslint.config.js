module.exports = [
    require("eslint-config-prettier"),
    {
        "name": "Base ESLint Config",
        "files": [
            "packages/**/*.js",
            "packages/**/*.mjs",
        ],
        "languageOptions": {
            "ecmaVersion": "latest",
            "sourceType": "module"
        },
        "rules": {
            "no-console": "error",
            "no-unused-vars": [
                "warn", {
                    "vars": "all",
                    "args": "none",
                    "ignoreRestSiblings": false
                }
            ],
            "no-var": [
                "error"
            ],
            "prefer-const": [
                "error",
                {
                    "destructuring": "all",
                    "ignoreReadBeforeAssign": false
                }
            ],
            "object-shorthand": ["error", "always"],
            "no-shadow": ["error", { "builtinGlobals": false, "hoist": "functions", "allow": [] }],
        },
        "ignores": [
            ".DS_Store",
            ".vscode",
            ".idea",
            ".env",
            ".env.*",
            "xunit.xml",
            ".nyc_output",
            "coverage",
            "node_modules/",
            "env.json",
            "newrelic_agent.log",
            "package-lock.json",
            ".eslintrc.*",
            "k8s/",
            ".husky/",
            "Dockerfile",
            ".gitlab-ci.*(yml|yaml)",
            "*.json",
            ".*ignore",
        ],
    }
];

