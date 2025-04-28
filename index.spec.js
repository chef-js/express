"use strict";

describe("GIVEN chef is provided", () => {
  it("THEN requiring the library does not throw an error", () => {
    require(".");
  });

  describe("WHEN it is instantiated", () => {
    it("THEN it should initialize without throwing error", () => {
      const { cook } = require(".");

      expect(() => cook({ folder: "demo", port: 3001 })).not.toThrow();
    });

    it("THEN initialization should return a truthy instance", async () => {
      const { cook } = require(".");

      expect(await cook({ folder: "demo", port: 3002 })).toBeTruthy();
    });
  });

  describe("WHEN it is started", () => {
    it("THEN it should have some props of original server", () => {
      const { cook } = require(".");

      expect(
        () => cook({ type: "uws", folder: "demo", port: 3012 }).__proto__.head,
      ).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized in ssl mode", () => {
    it("THEN it should not throw error", async () => {
      const { cook } = require(".");
      const api = await cook({
        debug: true,
        ssl: {
          key: "node_modules/chef-core/ssl/example.key",
          cert: "node_modules/chef-core/ssl/example.crt",
        },
        folder: "demo",
        port: 3010,
      });

      expect(api).toBeTruthy();
    });
  });

  describe("WHEN chef is initialized in debug mode", () => {
    it("THEN it should not throw error", async () => {
      const { cook } = require(".");
      const api = await cook({ debug: true, folder: "demo", port: 3003 });

      expect(api).toBeTruthy();
    });
  });

  describe("WHEN chef.serve is run on demo folder", () => {
    it("THEN it should not throw error", async () => {
      const { cook } = require(".");
      const test = async () =>
        await cook({ debug: true, folder: "demo", port: 3004 });

      expect(test).not.toThrow();
    });
  });

  describe("WHEN chef is initialized on specified port", () => {
    it("THEN it should start without error", async () => {
      const { cook } = require(".");
      const server = await cook({ folder: "demo", port: 8080 });

      expect(server).toBeTruthy();
    });
  });
});
