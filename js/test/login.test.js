import { loginUser } from "../entry/login.js";

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue([{ token: "12345", name: "tokle" }]),
});

global.fetch = mockFetchSuccess;

describe("loginUser", () => {
  it("returns token from api, and stores it in local storage", async () => {
    const data = await loginUser();
    expect(data).toMatchObject({ token: "12345", name: "tokle" });
  });
});
