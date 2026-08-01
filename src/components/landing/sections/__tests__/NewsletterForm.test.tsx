import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

import NewsletterForm from "@/components/landing/sections/NewsletterForm";
import { renderWithProviders } from "@/test/renderWithProviders";
import {
  fromMock,
  insertMock,
  mockInsertDuplicate,
  mockInsertError,
  mockInsertPending,
  mockInsertSuccess,
  resetSupabaseMock,
} from "@/test/supabaseMock";

/**
 * Newsletter subscription behaviour (Requirements 8.1–8.7, 18.6).
 *
 * The form imports the Supabase client lazily *inside* the mutation, so the
 * module mock has to be registered before the submit happens — `vi.mock` is
 * hoisted, which covers the dynamic `import()` too. The `fromMock` assertions
 * below double as proof that the mock really intercepts that dynamic import
 * rather than the real client being constructed from env values.
 */

vi.mock("@/integrations/supabase/client", async () => {
  const { createSupabaseClientMock } = await import("@/test/supabaseMock");
  return createSupabaseClientMock();
});

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

beforeEach(() => {
  resetSupabaseMock();
});

describe("NewsletterForm", () => {
  it("inserts the trimmed address and replaces the form with a confirmation", async () => {
    mockInsertSuccess();
    const { input, submit } = renderForm();

    type(input, "  You@Example.com  ");
    fireEvent.click(submit());

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(/subscribed/i);

    // Mock really intercepted the lazy import.
    expect(fromMock).toHaveBeenCalledWith("waitlist");
    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(insertMock).toHaveBeenCalledWith({ email: "You@Example.com" });

    // The form is gone once the confirmation shows.
    expect(screen.queryByLabelText("Email address")).toBeNull();
  });

  it("reports invalid input against the field, keeps the value, and sends nothing", async () => {
    const { input, submit } = renderForm();

    type(input, "not-an-email");
    fireEvent.click(submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/email address/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAttribute("aria-describedby", alert.id);

    // Requirement 8.4 — what the visitor typed survives the failed submit.
    expect(input.value).toBe("not-an-email");
    expect(insertMock).not.toHaveBeenCalled();
    expect(screen.queryByRole("status")).toBeNull();
  });

  it("shows an error and keeps the submit control usable when the insert fails", async () => {
    mockInsertError();
    const { input, submit } = renderForm();

    type(input, "you@example.com");
    fireEvent.click(submit());

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/could not save your email/i);

    expect(insertMock).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("status")).toBeNull();
    // Retry must remain possible.
    expect(submit()).toBeEnabled();
    expect(submit()).not.toHaveAttribute("aria-busy", "true");
  });

  it("treats a duplicate-key violation as a successful subscription", async () => {
    mockInsertDuplicate();
    const { input, submit } = renderForm();

    type(input, "already@example.com");
    fireEvent.click(submit());

    const status = await screen.findByRole("status");
    expect(status).toHaveTextContent(/subscribed/i);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("disables the submit control with aria-busy while the request is in flight", async () => {
    const pending = mockInsertPending();
    const { input, submit } = renderForm();

    type(input, "you@example.com");
    fireEvent.click(submit());

    await waitFor(() => {
      expect(submit()).toBeDisabled();
    });
    expect(submit()).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByRole("status")).toBeNull();

    await act(async () => {
      pending.resolve();
    });

    await waitFor(() => {
      expect(screen.getByRole("status")).toBeInTheDocument();
    });
  });
});
