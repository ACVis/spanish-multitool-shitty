// module.exports = {
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.(js|jsx)$": "babel-jest",
//   },
//   setupFilesAfterEnv: ["@testing-library/jest-dom"],
//   testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
//   moduleNameMapper: {
//     "\\.(css|less|scss|sass)$": "identity-obj-proxy",
//   },
// };

// jest.config.mjs
module.exports = {
  // preset: "@shelf/jest-mongodb",
  verbose: true,
  // collectCoverage: true,
  // collectCoverageFrom: ["./**/*.js"],
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx)$": [
      "babel-jest",
      { presets: ["@babel/preset-react", "@babel/preset-env"] },
    ],
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    // "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/$1",
  },
};

// export default config;
