import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MobileMenu } from "./mobile-menu";

const items = [
  { href: "/about", label: "About" },
  { href: "/music", label: "Music" },
];

// Unmount between tests so each test starts with a clean DOM
afterEach(cleanup);

describe("MobileMenu", () => {
  it("starts closed", () => {
    render(<MobileMenu items={items} />);
    expect(screen.getByRole("button", { name: "Open menu" }).getAttribute("aria-expanded")).toBe("false");
    expect(screen.queryByRole("link", { name: "About" })).toBeNull();
  });

  it("opens, shows the links, and closes when a link is clicked", () => {
    render(<MobileMenu items={items} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("button", { name: "Close menu" }).getAttribute("aria-expanded")).toBe("true");
    fireEvent.click(screen.getByRole("link", { name: "About" }));

    expect(screen.queryByRole("link", { name: "About" })).toBeNull();
  });
});
