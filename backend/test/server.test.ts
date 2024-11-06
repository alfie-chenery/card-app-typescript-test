import Prisma from "../src/db";
import { server } from "../src/server";

beforeAll(async () => {
  await server.ready();
  await Prisma.entry.deleteMany();
});

afterEach(async () => {
  await Prisma.entry.deleteMany();
});

afterAll(async () => {
  await server.close();
  await Prisma.$disconnect();
});

describe("Server API tests", () => {
  
  describe("GET /get/", () => {
    it("should retrieve all entries (none)", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/get/",
      });

      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data).toHaveLength(0);
    });

    it("should retrieve all entries (one)", async () => {
      await Prisma.entry.create({
        data: { title: "Test Entry", description: "This is a test", created_at: new Date(), due_at: new Date() },
      });

      const response = await server.inject({
        method: "GET",
        url: "/get/",
      });

      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data).toHaveLength(1);
      expect(data[0].title).toBe("Test Entry");
      expect(data[0].description).toBe("This is a test");
    });

    it("should retrieve all entries (many)", async () => {
      for(let i=0; i<17; i++){
        await Prisma.entry.create({
          data: { title: `Test Entry #${i}`, description: "This is a test", created_at: new Date(), due_at: new Date() },
        });
      }

      const response = await server.inject({
        method: "GET",
        url: "/get/",
      });

      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data).toHaveLength(17);
      expect(data[0].title).toBe("Test Entry #0");
      expect(data[0].description).toBe("This is a test");
      expect(data[8].title).toBe("Test Entry #8");
      expect(data[8].description).toBe("This is a test");
      expect(data[16].title).toBe("Test Entry #16");
      expect(data[0].description).toBe("This is a test");
    });
  });

  describe("GET /get/:id", () => {
    it("should retrieve a specific entry by ID", async () => {
      const entry = await Prisma.entry.create({
        data: { title: "Single Entry", description: "This one right here", created_at: new Date(), due_at: new Date() },
      });

      const response = await server.inject({
        method: "GET",
        url: `/get/${entry.id}`,
      });

      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.id).toBe(entry.id);
      expect(data.title).toBe("Single Entry");
      expect(data.description).toBe("This one right here");
    });

    it("should return 500 if entry is not found", async () => {
      const response = await server.inject({
        method: "GET",
        url: "/get/non-existent-id",
      });

      expect(response.statusCode).toBe(500);
      expect(response.json()).toEqual({ msg: "Error finding entry with id non-existent-id" });
    });
  });

  describe("POST /create/", () => {
    it("should create a new entry", async () => {
      const newEntry = { title: "New Entry", description: "Created via test", created_at: new Date(), due_at: new Date() };

      const response = await server.inject({
        method: "POST",
        url: "/create/",
        payload: newEntry,
      });

      expect(response.statusCode).toBe(200);
      const data = response.json();
      expect(data.title).toBe(newEntry.title);
      expect(data.description).toBe(newEntry.description);
      expect(new Date(data.created_at)).toEqual(newEntry.created_at);
      expect(new Date(data.due_at)).toEqual(newEntry.due_at);
    });

    it("should return 500 on creation error", async () => {
      const badEntry = { title: "Bad Entry" }; // Missing required fields

      const response = await server.inject({
        method: "POST",
        url: "/create/",
        payload: badEntry,
      });

      expect(response.statusCode).toBe(500);
      expect(response.json()).toEqual({ msg: "Error creating entry" });
    });
  });

  describe("DELETE /delete/:id", () => {
    it("should delete an entry by ID", async () => {
      const entry = await Prisma.entry.create({
        data: { title: "Entry to Delete", description: "This will be deleted", created_at: new Date(), due_at: new Date() },
      });

      const response = await server.inject({
        method: "DELETE",
        url: `/delete/${entry.id}`,
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ msg: "Deleted successfully" });
      
      const checkEntry = await Prisma.entry.findUnique({ where: { id: entry.id } });
      expect(checkEntry).toBeNull();
    });

    it("should return 500 if deletion fails", async () => {
      const response = await server.inject({
        method: "DELETE",
        url: "/delete/non-existent-id",
      });

      expect(response.statusCode).toBe(500);
      expect(response.json()).toEqual({ msg: "Error deleting entry" });
    });
  });

  describe("PUT /update/:id", () => {
    it("should update an existing entry", async () => {
      const entry = await Prisma.entry.create({
        data: { title: "Initial Title", description: "Initial description", created_at: new Date(), due_at: new Date() },
      });

      const updatedData = { ...entry, title: "Updated Title", description: "Updated description" };

      const response = await server.inject({
        method: "PUT",
        url: `/update/${entry.id}`,
        payload: updatedData,
      });

      expect(response.statusCode).toBe(200);
      expect(response.json()).toEqual({ msg: "Updated successfully" });

      const updatedEntry = await Prisma.entry.findUnique({ where: { id: entry.id } });
      expect(updatedEntry?.title).toBe("Updated Title");
      expect(updatedEntry?.description).toBe("Updated description");
    });

    it("should return 500 if update fails", async () => {
      const response = await server.inject({
        method: "PUT",
        url: "/update/non-existent-id",
        payload: { title: "Update Failure Test", description: "This should fail" },
      });

      expect(response.statusCode).toBe(500);
      expect(response.json()).toEqual({ msg: "Error updating" });
    });
  });
});