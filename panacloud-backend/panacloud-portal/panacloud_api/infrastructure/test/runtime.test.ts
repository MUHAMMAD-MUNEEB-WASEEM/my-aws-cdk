const sample_events = require("./test_events");
/**
 * https://stackoverflow.com/questions/48033841/test-process-env-with-jest
 * Can also use jest's setupFiles which ar e loaded before each test
 */
describe("Test environmental variables", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });

  test("createApi should throw error if masterTable not found in env", async () => {
    const { handler } = require("../../runtime/lambda/createApi.js");
    await expect(() => handler(sample_events.sample_event)).rejects.toThrow(
      "TENANT_TABLE Not found in env"
    );
  });

  test("createDevApi should throw error if masterTable not found in env", async () => {
    const { handler } = require("../../runtime/lambda/createDevApi.js");
    await expect(() => handler(sample_events.sample_event)).rejects.toThrow(
      "TENANT_TABLE Not found in env"
    );
  });

  test("subscribeToApi should throw error if masterTable not found in env", async () => {
    const { handler } = require("../../runtime/lambda/subscribeToApi.js");
    await expect(() => handler(sample_events.sample_event)).rejects.toThrow(
      "TENANT_TABLE Not found in env"
    );
  });

  test("publishApi should throw error if masterTable not found in env", async () => {
    const { handler } = require("../../runtime/lambda/publishApi.js");
    await expect(() => handler(sample_events.sample_event)).rejects.toThrow(
      "TENANT_TABLE Not found in env"
    );
  });
});

describe("createDevApi Tests", () => {
  test.todo("if it throws when devId doesnt exist in db");
  test.todo(
    "if it actually creates the item in the DB if the devId is provided correctly"
  );
});

describe("subscribeToApi Tests", () => {
  test.todo("if it throws when devId doesnt exist in db");
  test.todo("if it throws when apiId doesnt exist in db");
  test.todo(
    "if it actually creates the item in the DB if devId and apiId are provided correctly"
  );
});

describe("publishApi Tests", () => {
  test.todo("if it throws when apiId doesnt exist in db");
});
