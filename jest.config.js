module.exports = {
  // 超过一个测试文件运行时，是否需要展示每个测试用例测试通过的情况
  verbose: true,
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": "ts-jest",
  },
  roots: ["<rootDir>/src"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts"
  ],
  coverageDirectory: ".coverage",
  globals: {
    "__DEV__": true,
    "ts-jest": {
      // 使用babel配置来编译
      babelConfig: true,
    }
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"]
}