/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeAll, vi } from "vitest";

beforeAll(() => {
  vi.stubGlobal("getComputedStyle", () => ({
    getPropertyValue: () => "",
    getPropertyPriority: () => "",
  }));

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: any) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  // Mock ResizeObserver for Recharts
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock IntersectionObserver for other components that might need it
  global.IntersectionObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

  // Mock Recharts components globally
  vi.mock("recharts", () => ({
    ResponsiveContainer: ({ children }: any) => React.createElement('div', { 'data-testid': 'responsive-container' }, children),
    BarChart: ({ children }: any) => React.createElement('div', { 'data-testid': 'bar-chart' }, children),
    LineChart: ({ children }: any) => React.createElement('div', { 'data-testid': 'line-chart' }, children),
    PieChart: ({ children }: any) => React.createElement('div', { 'data-testid': 'pie-chart' }, children),
    CartesianGrid: () => React.createElement('div', { 'data-testid': 'cartesian-grid' }),
    XAxis: () => React.createElement('div', { 'data-testid': 'x-axis' }),
    YAxis: () => React.createElement('div', { 'data-testid': 'y-axis' }),
    Tooltip: () => React.createElement('div', { 'data-testid': 'tooltip' }),
    Legend: () => React.createElement('div', { 'data-testid': 'legend' }),
    Bar: () => React.createElement('div', { 'data-testid': 'bar' }),
    Line: () => React.createElement('div', { 'data-testid': 'line' }),
    Pie: () => React.createElement('div', { 'data-testid': 'pie' }),
    Cell: () => React.createElement('div', { 'data-testid': 'cell' }),
  }));

  // Mock axios API to prevent any real network calls
  vi.mock("../shared/libs/src/axios/api", () => ({
    api: {
      get: vi.fn(() => Promise.resolve({ data: {} })),
      post: vi.fn(() => Promise.resolve({ data: {} })),
      put: vi.fn(() => Promise.resolve({ data: {} })),
      delete: vi.fn(() => Promise.resolve({ data: {} })),
    }
  }));
});

afterEach(() => {
  cleanup();
});
