import { vi } from "vitest";

export interface SupabaseError {
  code?: string;
  message?: string;
  details?: string;
}

export interface SupabaseInsertResult {
  error: SupabaseError | null;
}

/**
 * The single insert mock shared by the mocked client module. Configure it per
 * test with the helpers below, then assert on its calls.
 */
export const insertMock = vi.fn<(payload: unknown) => Promise<SupabaseInsertResult>>(() =>
  Promise.resolve({ error: null }),
);

export const fromMock = vi.fn((_table: string) => ({ insert: insertMock }));

export const supabaseMock = { from: fromMock };

/**
 * Module shape for `vi.mock('@/integrations/supabase/client')`, so
 * `createClient` never runs and no `VITE_SUPABASE_*` env values are needed.
 *
 * ```ts
 * vi.mock("@/integrations/supabase/client", async () => {
 *   const { createSupabaseClientMock } = await import("@/test/supabaseMock");
 *   return createSupabaseClientMock();
 * });
 * ```
 */
export function createSupabaseClientMock() {
  return { supabase: supabaseMock };
}

export function resetSupabaseMock() {
  insertMock.mockReset();
  fromMock.mockClear();
  insertMock.mockImplementation(() => Promise.resolve({ error: null }));
  fromMock.mockImplementation((_table: string) => ({ insert: insertMock }));
}

export function mockInsertSuccess() {
  insertMock.mockResolvedValue({ error: null });
}

/** Unique-constraint violation, i.e. the address is already subscribed. */
export function mockInsertDuplicate() {
  insertMock.mockResolvedValue({ error: { code: "23505", message: "duplicate key value" } });
}

export function mockInsertError(message = "Internal error", code = "500") {
  insertMock.mockResolvedValue({ error: { code, message } });
}

/** Leaves the insert unresolved so pending/`aria-busy` states can be asserted. */
export function mockInsertPending(): { resolve: (result?: SupabaseInsertResult) => void } {
  let release!: (result: SupabaseInsertResult) => void;
  const pending = new Promise<SupabaseInsertResult>((resolvePromise) => {
    release = resolvePromise;
  });
  insertMock.mockReturnValue(pending);
  return { resolve: (result = { error: null }) => release(result) };
}
