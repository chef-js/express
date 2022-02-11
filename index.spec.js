"use strict";

describe("GIVEN chef is provided", () => {
  it("THEN requiring the library does not throw an error", () => {
    require(".");
  });

  describe("WHEN it is instantiated", () => {
    it("THEN it should initialize without throwing error", () => {
      const startChef = require(".");

      expect(() => startChef({ folder: "demo", port: 3001 })).not.toThrow();
    });

    it("THEN initialization should return a truthy instance", async () => {
      const startChef = require(".");

      expect(await startChef({ folder: "demo", port: 3002 })).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized in debug mode", () => {
    it("THEN it should not throw error", async () => {
      const startChef = require(".");
      const api = await startChef({ debug: true, folder: "demo", port: 3003 });

      expect(api).toBeTruthy();
    });
  });

  describe("WHEN chef.serve is run on demo folder", () => {
    it("THEN it should not throw error", async () => {
      const startChef = require(".");
      const test = async () =>
        await startChef({ debug: true, folder: "demo", port: 3004 });

      expect(test).not.toThrow();
    });
  });

  describe("WHEN chef is initialized on specified port", () => {
    it("THEN it should start without error", async () => {
      const startChef = require(".");
      const server = await startChef({ folder: "demo", port: 8080 });

      expect(server).toBeTruthy();
    });
  });
});
