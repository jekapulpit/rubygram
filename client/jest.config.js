module.exports = {
    setupFiles: [
        "./test/jestsetup.js"
    ],
    collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],
    testMatch: ["<rootDir>/test/components/*.{js,jsx,mjs}"],
    transform: {
        "^.+\\.(js|jsx|mjs)$": "<rootDir>/jest-transformer.js"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
    moduleNameMapper:{
        "\\.(css|less|sass|scss)$": "identity-obj-proxy",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js"
    },
    snapshotSerializers: [
        "<rootDir>/node_modules/enzyme-to-json/serializer"
    ]
};
