# Frontend Testing Guide

This document outlines the comprehensive testing strategy implemented for the Najm Course frontend dashboard functionality.

## Test Structure

### 📁 Test Organization

```
├── shared/apis/src/admin/__tests__/
│   ├── __mocks__/
│   │   ├── dashboard-data.ts          # Mock data for testing
│   │   └── api-responses.ts           # Mock API responses
│   ├── api.test.ts                    # API function tests
│   └── schema.test.ts                 # Zod schema validation tests
├── shared/hooks/src/admin/__tests__/
│   └── use-get-dashboard-stats.test.tsx # React Query hook tests
├── apps/backoffice/src/app/(protected)/dashboard/__tests__/
│   ├── test-utils.tsx                 # Test utilities and providers
│   ├── dashboard.test.tsx             # Component unit tests
│   └── dashboard.integration.test.tsx # Integration tests
└── apps/backoffice-e2e/src/
    └── dashboard.spec.ts              # E2E tests with Playwright
```

## Test Categories

### 🧪 Unit Tests

#### **API Layer Tests** (`shared/apis/src/admin/__tests__/api.test.ts`)
- Request configuration validation
- Response transformation
- Schema validation testing  
- Error response handling
- Network failure scenarios

#### **Schema Validation Tests** (`shared/apis/src/admin/__tests__/schema.test.ts`)
- Valid data schema validation
- Invalid data rejection
- Edge cases handling
- Type transformation testing

#### **React Hook Tests** (`shared/hooks/src/admin/__tests__/use-get-dashboard-stats.test.tsx`)
- Successful data fetching
- Error handling
- Loading states
- Refetch interval behavior
- Cache behavior
- Query key validation

#### **Component Tests** (`apps/backoffice/src/app/(protected)/dashboard/__tests__/dashboard.test.tsx`)
- Loading state rendering
- Error state handling
- Successful data display
- Chart rendering validation
- Statistics cards display
- Responsive behavior

### 🔄 Integration Tests (`dashboard.integration.test.tsx`)
- Full data loading cycle
- Error recovery flow
- User interactions
- Chart interactions
- Data refresh scenarios
- Performance testing

### 🌐 E2E Tests (`apps/backoffice-e2e/src/dashboard.spec.ts`)
- Complete user journey
- Authentication flow
- Error handling
- Responsive design
- Visual regression testing
- Cross-browser compatibility
- Performance metrics

## Running Tests

### Prerequisites

```bash
# Install dependencies
npm install
```

### Unit Tests

```bash
# Run all tests
npm run test

# Run specific app tests
npm run backoffice:test

# Run with coverage
npm run test:coverage

# Run specific test file
nx vite:test backoffice src/app/(protected)/dashboard/__tests__/dashboard.test.tsx

# Run tests in watch mode
nx vite:test backoffice --watch
```

### Integration Tests

```bash
# Run integration tests specifically
nx vite:test backoffice src/app/(protected)/dashboard/__tests__/dashboard.integration.test.tsx

# Run with MSW server logging
DEBUG=msw npm run backoffice:test
```

### E2E Tests

```bash
# Run E2E tests
nx e2e backoffice-e2e

# Run specific E2E test file
nx e2e backoffice-e2e --spec=dashboard.spec.ts

# Run E2E tests in headed mode (see browser)
nx e2e backoffice-e2e --headed

# Run E2E tests with specific browser
nx e2e backoffice-e2e --project=chromium
nx e2e backoffice-e2e --project=firefox
nx e2e backoffice-e2e --project=webkit

# Generate E2E test report
nx e2e backoffice-e2e --reporter=html
```

## Test Configuration

### Vitest Configuration

Tests use Vitest with the following key configurations:

```typescript
// vitest.config.ts
{
  test: {
    environment: 'jsdom',
    setupFiles: ['../../vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  }
}
```

### Playwright Configuration

E2E tests use Playwright with:

```typescript
// playwright.config.ts
{
  testDir: './src',
  timeout: 30000,
  expect: { timeout: 5000 },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ]
}
```

## Mock Data

### Dashboard Stats Mock Data

```typescript
// Comprehensive mock with all dashboard statistics
export const mockDashboardStats: TAdminDashboardStatsResponse = {
  data: {
    userStats: { totalUsers: 1250, activeUsers: 1200, ... },
    examinationStats: { totalTests: 85, totalSessions: 25, ... },
    performanceStats: { averageScore: 78.5, completionRate: 85.2, ... },
    contentStats: { totalQuestions: 2450, totalOptions: 9800, ... },
    systemStats: { dataIntegrityScore: 95.8, userGrowthRate: 15.5, ... }
  },
  message: "Admin dashboard statistics retrieved successfully"
}
```

### Error Response Mocks

```typescript
// Various error scenarios covered
export const mockNotFoundResponse = { status: 404, ... };
export const mockUnauthorizedResponse = { status: 401, ... };
export const mockServerErrorResponse = { status: 500, ... };
export const mockNetworkErrorResponse = { code: 'NETWORK_ERROR', ... };
```

## Test Utilities

### Custom Render Function

```typescript
// Renders components with all necessary providers
renderWithProviders(<Component />, {
  queryClient: testQueryClient,
  session: mockAdminSession,
  sessionStatus: "authenticated"
});
```

### Helper Functions

- `expectStatisticCard()` - Assert statistics card values
- `expectErrorState()` - Assert error states
- `expectLoadingState()` - Assert loading states
- `waitForLoadingToFinish()` - Wait for async operations

## Coverage Goals

- **Component Coverage**: >95%
- **Hook Coverage**: >98%  
- **API Coverage**: >95%
- **Integration Coverage**: >85%
- **E2E Coverage**: Critical user paths

## Best Practices

### Writing Tests

1. **AAA Pattern**: Arrange, Act, Assert
2. **Descriptive test names**: `should handle API errors gracefully`
3. **Mock external dependencies**: APIs, timers, components
4. **Test error cases**: Not just happy paths
5. **Clean up**: Reset mocks and clear queries

### Mock Strategy

1. **Unit level**: Mock external dependencies only
2. **Integration level**: Use MSW for API mocking
3. **E2E level**: Mock network responses
4. **Consistent data**: Reuse mock data across test levels

### Performance Testing

```typescript
// Example performance assertion
test('should load dashboard within 3 seconds', async () => {
  const startTime = Date.now();
  await renderDashboard();
  const loadTime = Date.now() - startTime;
  expect(loadTime).toBeLessThan(3000);
});
```

## Debugging Tests

### Common Issues

1. **Async operations**: Use `waitFor()` for async state changes
2. **Timer-based tests**: Use `vi.useFakeTimers()` and `vi.advanceTimersByTime()`
3. **React Query**: Disable retries in test client
4. **Chart components**: Mock Recharts for simpler testing

### Debug Commands

```bash
# Run tests with debug output
DEBUG=* npm run test

# Run single test with console logs
nx vite:test backoffice --reporter=verbose

# Run E2E tests with debug
DEBUG=pw:api nx e2e backoffice-e2e
```

## Continuous Integration

Tests are configured to run in CI/CD with:

```yaml
# Example GitHub Actions
- name: Run Unit Tests
  run: npm run test:coverage

- name: Run E2E Tests  
  run: npm run e2e:ci

- name: Upload Coverage
  uses: codecov/codecov-action@v3
```

## Monitoring and Metrics

Track testing metrics:

- Test execution time
- Coverage percentages
- Flaky test rates
- E2E test success rates

This comprehensive testing strategy ensures the dashboard functionality is robust, reliable, and maintainable across all layers of the application.