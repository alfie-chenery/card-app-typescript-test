import { server } from "../src/server"
import Prisma from "../src/db";
import fastify from "fastify";

const app = fastify();

describe("server test", () => {
  it("should assert 1 + 1 is 2", () => {
    expect(1 + 1).toEqual(2);
  });
});