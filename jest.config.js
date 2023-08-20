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
const config = {
  testEnvironment: "node",
  transform: {
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

export default config;
