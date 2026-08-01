import type { ReactElement, ReactNode } from "react";
import { render, type RenderOptions, type RenderResult } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  /** Forced theme preference. Omit to let next-themes resolve from storage/system. */
  theme?: "light" | "dark" | "system";
  /** Initial router entries. Defaults to the landing route. */
  route?: string;
  routes?: string[];
  queryClient?: QueryClient;
}

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

/**
 * Renders `ui` through the production provider stack: the real next-themes
 * ThemeProvider (class attribute, `gsg-theme` storage key) inside a
 * MemoryRouter and a fresh retry-disabled QueryClient.
 */
export function renderWithProviders(
  ui: ReactElement,
  options: RenderWithProvidersOptions = {},
): RenderResult & { queryClient: QueryClient } {
  const { theme, route = "/", routes, queryClient = createTestQueryClient(), ...rest } = options;

  if (theme && theme !== "system") {
    window.localStorage.setItem("gsg-theme", theme);
  }

  const Wrapper = ({ children }: { children: ReactNode }) => (
    <MemoryRouter initialEntries={routes ?? [route]}>
      <ThemeProvider
        attribute="class"
        defaultTheme={theme ?? "system"}
        enableSystem
        storageKey="gsg-theme"
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

  return { ...render(ui, { wrapper: Wrapper, ...rest }), queryClient };
}
