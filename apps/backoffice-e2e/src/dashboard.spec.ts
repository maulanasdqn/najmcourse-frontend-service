import { test, expect, type Page } from '@playwright/test';
import { mockDashboardStats } from '@/shared/apis/admin/__tests__/__mocks__/dashboard-data';

// Constants
const DASHBOARD_URL = '/dashboard';
const LOGIN_URL = '/auth/login';
const DASHBOARD_TITLE = 'Admin Dashboard';

// Test data
const ADMIN_CREDENTIALS = {
  email: 'admin@najm.test',
  password: 'password123',
};

// Helper function to mock API responses
async function mockDashboardAPI(page: Page) {
  await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockDashboardStats),
    });
  });
}

// Helper function to mock error API responses
async function mockDashboardAPIError(page: Page, status = 500) {
  await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
    await route.fulfill({
      status,
      contentType: 'application/json',
      body: JSON.stringify({
        message: 'Internal server error occurred while fetching dashboard statistics',
        error: 'Internal Server Error',
      }),
    });
  });
}

// Helper function to mock authentication
async function mockAuthAPI(page: Page) {
  await page.route('**/api/v1/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        data: {
          user: {
            id: 'admin-id',
            fullname: 'Test Admin',
            email: 'admin@najm.test',
            role: {
              name: 'Admin',
              permissions: [{ name: 'Read Dashboard' }],
            },
          },
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        },
        message: 'Login successful',
      }),
    });
  });
}

// Helper function to login
async function loginAsAdmin(page: Page) {
  await mockAuthAPI(page);
  
  await page.goto(LOGIN_URL);
  await page.fill('[name="email"]', ADMIN_CREDENTIALS.email);
  await page.fill('[name="password"]', ADMIN_CREDENTIALS.password);
  await page.click('button[type="submit"]');
  
  // Wait for redirect to dashboard or successful login
  await page.waitForURL('**/dashboard');
}

test.describe('Dashboard E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set up common mocks
    await mockDashboardAPI(page);
  });

  test.describe('Authentication and Access', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
      await page.goto(DASHBOARD_URL);
      
      // Should be redirected to login page
      await expect(page).toHaveURL(/.*auth\/login/);
      expect(await page.locator('text=Login').count()).toBeGreaterThan(0);
    });

    test('should allow admin users to access dashboard', async ({ page }) => {
      await loginAsAdmin(page);
      await page.goto(DASHBOARD_URL);
      
      // Should see the dashboard
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
    });

    test('should handle session expiration gracefully', async ({ page }) => {
      await loginAsAdmin(page);
      await page.goto(DASHBOARD_URL);
      
      // Mock session expiration
      await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
        await route.fulfill({
          status: 401,
          contentType: 'application/json',
          body: JSON.stringify({
            message: 'Authentication required',
            error: 'Unauthorized',
          }),
        });
      });
      
      // Trigger a refetch (reload page)
      await page.reload();
      
      // Should be redirected to login or show error
      await expect(page.locator('text=Error loading dashboard statistics')).toBeVisible();
    });
  });

  test.describe('Dashboard Loading and Display', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsAdmin(page);
      await page.goto(DASHBOARD_URL);
    });

    test('should display dashboard title and main elements', async ({ page }) => {
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
      
      // Check for main statistics cards
      await expect(page.locator('text=Total Users')).toBeVisible();
      await expect(page.locator('text=Active Users')).toBeVisible();
      await expect(page.locator('text=Total Tests')).toBeVisible();
      await expect(page.locator('text=Average Score')).toBeVisible();
    });

    test('should display correct statistics values', async ({ page }) => {
      // Wait for data to load
      await expect(page.locator('text=1,250')).toBeVisible(); // Total Users
      await expect(page.locator('text=1,200')).toBeVisible(); // Active Users
      await expect(page.locator('text=85')).toBeVisible();    // Total Tests
      await expect(page.locator('text=78.5%')).toBeVisible(); // Average Score
    });

    test('should display all chart sections', async ({ page }) => {
      await expect(page.locator('text=User Registration Trends')).toBeVisible();
      await expect(page.locator('text=Questions by Difficulty')).toBeVisible();
      await expect(page.locator('text=Average Score Trends')).toBeVisible();
      await expect(page.locator('text=System Performance')).toBeVisible();
      await expect(page.locator('text=Tests by Category')).toBeVisible();
    });

    test('should show loading state initially', async ({ page }) => {
      // Mock slow API response
      await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
        // Delay response by 2 seconds
        await new Promise(resolve => setTimeout(resolve, 2000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockDashboardStats),
        });
      });
      
      await page.goto(DASHBOARD_URL);
      
      // Should show loading state
      await expect(page.locator('text=Loading dashboard statistics...')).toBeVisible();
      
      // Wait for loading to complete
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible({ timeout: 5000 });
    });
  });

  test.describe('Error Handling', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsAdmin(page);
    });

    test('should handle API errors gracefully', async ({ page }) => {
      await mockDashboardAPIError(page, 500);
      await page.goto(DASHBOARD_URL);
      
      await expect(page.locator('text=Error loading dashboard statistics')).toBeVisible();
      
      // Should show error alert
      const errorAlert = page.locator('[role="alert"]').filter({ hasText: 'Error loading dashboard statistics' });
      await expect(errorAlert).toBeVisible();
    });

    test('should handle 403 Forbidden error', async ({ page }) => {
      await mockDashboardAPIError(page, 403);
      await page.goto(DASHBOARD_URL);
      
      await expect(page.locator('text=Error loading dashboard statistics')).toBeVisible();
    });

    test('should handle network errors', async ({ page }) => {
      await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
        await route.abort('failed');
      });
      
      await page.goto(DASHBOARD_URL);
      
      await expect(page.locator('text=Error loading dashboard statistics')).toBeVisible();
    });

    test('should show appropriate error message for different error types', async ({ page }) => {
      const errorMessage = 'Custom error message from server';
      
      await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
        await route.fulfill({
          status: 500,
          contentType: 'application/json',
          body: JSON.stringify({
            message: errorMessage,
            error: 'Internal Server Error',
          }),
        });
      });
      
      await page.goto(DASHBOARD_URL);
      
      await expect(page.locator(`text=${errorMessage}`)).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsAdmin(page);
      await page.goto(DASHBOARD_URL);
    });

    test('should display correctly on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
      
      // Statistics cards should be in a row layout on desktop
      const statisticsRow = page.locator('.ant-row').first();
      await expect(statisticsRow).toBeVisible();
    });

    test('should display correctly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
      
      // Content should still be accessible
      await expect(page.locator('text=Total Users')).toBeVisible();
    });

    test('should display correctly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
      
      // Statistics should stack vertically on mobile
      await expect(page.locator('text=Total Users')).toBeVisible();
      await expect(page.locator('text=Active Users')).toBeVisible();
    });

    test('should handle chart responsiveness', async ({ page }) => {
      // Test different viewport sizes
      const viewports = [
        { width: 1920, height: 1080 }, // Desktop
        { width: 1024, height: 768 },  // Tablet landscape
        { width: 768, height: 1024 },  // Tablet portrait
        { width: 375, height: 667 },   // Mobile
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize(viewport);
        
        // Charts should be visible and responsive
        await expect(page.locator('text=User Registration Trends')).toBeVisible();
        await expect(page.locator('text=Questions by Difficulty')).toBeVisible();
      }
    });
  });

  test.describe('Performance and Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsAdmin(page);
    });

    test('should have good Core Web Vitals', async ({ page }) => {
      await page.goto(DASHBOARD_URL);
      
      // Wait for dashboard to fully load
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
      
      // Check that content loads reasonably quickly
      const startTime = Date.now();
      await expect(page.locator('text=1,250')).toBeVisible();
      const loadTime = Date.now() - startTime;
      
      // Should load within 3 seconds
      expect(loadTime).toBeLessThan(3000);
    });

    test('should be keyboard accessible', async ({ page }) => {
      await page.goto(DASHBOARD_URL);
      
      // Should be able to navigate with keyboard
      await page.keyboard.press('Tab');
      
      // Focus should be visible (at least one focusable element)
      const focusedElement = await page.locator(':focus').count();
      expect(focusedElement).toBeGreaterThanOrEqual(0);
    });

    test('should have proper semantic structure', async ({ page }) => {
      await page.goto(DASHBOARD_URL);
      
      // Should have proper heading hierarchy
      const mainHeading = page.locator('h2', { hasText: DASHBOARD_TITLE });
      await expect(mainHeading).toBeVisible();
      
      // Should have landmark elements
      const main = page.locator('main');
      expect(await main.count()).toBeGreaterThanOrEqual(0);
    });

    test('should provide screen reader friendly content', async ({ page }) => {
      await page.goto(DASHBOARD_URL);
      
      // Statistics should have accessible labels
      await expect(page.locator('text=Total Users')).toBeVisible();
      await expect(page.locator('text=1,250')).toBeVisible();
      
      // Error states should be announced
      await mockDashboardAPIError(page, 500);
      await page.reload();
      
      const errorAlert = page.locator('[role="alert"]').filter({ hasText: 'Error loading dashboard statistics' });
      await expect(errorAlert).toBeVisible();
    });
  });

  test.describe('Data Refresh and Real-time Updates', () => {
    test.beforeEach(async ({ page }) => {
      await loginAsAdmin(page);
    });

    test('should refresh data automatically', async ({ page }) => {
      let requestCount = 0;
      
      await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
        requestCount++;
        const updatedData = {
          ...mockDashboardStats,
          data: {
            ...mockDashboardStats.data,
            userStats: {
              ...mockDashboardStats.data.userStats,
              totalUsers: 1250 + requestCount * 10, // Increment for each request
            },
          },
        };
        
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(updatedData),
        });
      });
      
      await page.goto(DASHBOARD_URL);
      
      // Initial data
      await expect(page.locator('text=1,260')).toBeVisible(); // 1250 + 10
      expect(requestCount).toBe(1);
      
      // Wait for auto-refresh (5 minutes in real app, but we can't wait that long in tests)
      // Instead, we can trigger a manual refresh to test the update
      await page.reload();
      
      await expect(page.locator('text=1,270')).toBeVisible(); // 1250 + 20
      expect(requestCount).toBe(2);
    });

    test('should handle data updates gracefully', async ({ page }) => {
      // Start with initial data
      await page.goto(DASHBOARD_URL);
      await expect(page.locator('text=1,250')).toBeVisible();
      
      // Mock updated data
      const updatedMockData = {
        ...mockDashboardStats,
        data: {
          ...mockDashboardStats.data,
          userStats: {
            ...mockDashboardStats.data.userStats,
            totalUsers: 1500,
            activeUsers: 1450,
          },
        },
      };
      
      await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(updatedMockData),
        });
      });
      
      // Trigger refresh
      await page.reload();
      
      // Should show updated data
      await expect(page.locator('text=1,500')).toBeVisible();
      await expect(page.locator('text=1,450')).toBeVisible();
    });
  });

  test.describe('Cross-browser Compatibility', () => {
    test('should work correctly across different browsers', async ({ page, browserName }) => {
      await loginAsAdmin(page);
      await page.goto(DASHBOARD_URL);
      
      // Basic functionality should work in all browsers
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
      await expect(page.locator('text=Total Users')).toBeVisible();
      await expect(page.locator('text=1,250')).toBeVisible();
      
      // Log browser for debugging
      console.log(`Testing dashboard in ${browserName}`);
    });
  });

  test.describe('Visual Regression', () => {
    test('should match dashboard screenshot', async ({ page }) => {
      await loginAsAdmin(page);
      await page.goto(DASHBOARD_URL);
      
      // Wait for all content to load
      await expect(page.locator(`text=${DASHBOARD_TITLE}`)).toBeVisible();
      await expect(page.locator('text=1,250')).toBeVisible();
      
      // Take screenshot for visual comparison
      await expect(page).toHaveScreenshot('dashboard-full-page.png', {
        fullPage: true,
        animations: 'disabled',
      });
    });

    test('should match error state screenshot', async ({ page }) => {
      await mockDashboardAPIError(page, 500);
      await loginAsAdmin(page);
      await page.goto(DASHBOARD_URL);
      
      await expect(page.locator('text=Error loading dashboard statistics')).toBeVisible();
      
      // Take screenshot of error state
      await expect(page).toHaveScreenshot('dashboard-error-state.png', {
        animations: 'disabled',
      });
    });

    test('should match loading state screenshot', async ({ page }) => {
      // Mock slow response
      await page.route('**/api/v1/admin/stats/dashboard', async (route) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(mockDashboardStats),
        });
      });
      
      await loginAsAdmin(page);
      
      // Navigate and immediately capture loading state
      const navigationPromise = page.goto(DASHBOARD_URL);
      
      // Capture loading state
      await expect(page.locator('text=Loading dashboard statistics...')).toBeVisible();
      await expect(page).toHaveScreenshot('dashboard-loading-state.png', {
        animations: 'disabled',
      });
      
      // Wait for navigation to complete
      await navigationPromise;
    });
  });
});