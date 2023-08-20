module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    "jest/globals": true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:jest/recommended",
    "next",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "jest"],
  rules: {
    "react/react-in-jsx-scope": "off", // Not needed for React 17 and above
    "react/prop-types": "off", // Disable if not using prop-types
    // Add any custom rules or overrides here
  },
  settings: {
    react: {
      version: "detect", // Automatically detect the React version
    },
  },
};
