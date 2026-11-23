import { beforeEach, describe, expect, it, vi, afterEach } from "vitest";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import NewsletterForm from "@/components/landing/sections/NewsletterForm";
import { renderWithProviders } from "@/test/renderWithProviders";

function renderForm() {
  renderWithProviders(<NewsletterForm />, { theme: "light" });
  return {
    input: screen.getByLabelText("Email address") as HTMLInputElement,
    submit: () => screen.getByRole("button", { name: /subscrib/i }),
  };
}

function type(input: HTMLInputElement, value: string) {
  fireEvent.change(input, { target: { value } });
}

describe("NewsletterForm", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("inserts the trimmed address and replaces the form with a confirmation", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    });
    vi.stubGlobal("fetch", fetchMock);

    // Mock Date.now so human time elapsed > 800ms
    const startTime = 1000000;
    vi.spyOn(Date, "now").mockReturnValueOnce(startTime).mockReturnValue(startTime + 2000);

    const { input, submit } = renderForm();

    type(input, "  user@gupshupgo.com  ");
    fireEvent.click(submit());

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(/subscribed/i);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.web3forms.com/submit",
      expect.objectContaining({
        method: "POST",
        body: expect.stringContaining('"email":"user@gupshupgo.com"'),
      }),
    );

    // The form is gone once the confirmation shows.
    expect(screen.queryByLabelText("Email address")).toBeNull();
  });

  it("reports invalid input against the field, keeps the value, and sends nothing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { input, submit } = renderForm();

    type(input, "not-an-email");
    fireEvent.click(submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/email address/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", alert.id);

    expect(input.value).toBe("not-an-email");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows an error and keeps the submit control usable when the request fails", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: false }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const startTime = 1000000;
    vi.spyOn(Date, "now").mockReturnValueOnce(startTime).mockReturnValue(startTime + 2000);

    const { input, submit } = renderForm();

    type(input, "realuser@gupshupgo.com");
    fireEvent.click(submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/could not save your email/i);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("status")).toBeNull();
    // Retry must remain possible.
    expect(submit()).toBeEnabled();
    expect(submit()).not.toHaveAttribute("aria-busy", "true");
  });

  it("suppresses bot dummy domains with fake success without consuming API quota", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const { input, submit } = renderForm();

    // Spambots send you@example.com or already@example.com
    type(input, "you@example.com");
    fireEvent.click(submit());

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(/subscribed/i);
    expect(screen.queryByRole("alert")).toBeNull();

    // Never touched Web3Forms API!
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("disables the submit control with aria-busy while the request is in flight", async () => {
    let resolvePromise: (value: unknown) => void;
    const pendingPromise = new Promise((resolve) => {
      resolvePromise = resolve;
    });

    const fetchMock = vi.fn().mockReturnValue(pendingPromise);
    vi.stubGlobal("fetch", fetchMock);

    const startTime = 1000000;
    vi.spyOn(Date, "now").mockReturnValueOnce(startTime).mockReturnValue(startTime + 2000);

    const { input, submit } = renderForm();

    type(input, "someone@gupshupgo.com");
    fireEvent.click(submit());

    await waitFor(() => {
      expect(submit()).toBeDisabled();
    });
    expect(submit()).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByRole("status")).toBeNull();

    await act(async () => {
      resolvePromise!({
        ok: true,
        json: async () => ({ success: true }),
      });
    });

    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
