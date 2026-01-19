/**
 * GREENSPACESS - Basic Performance Monitoring
 * ============================================
 * This script monitors website performance and sends data to analytics
 *
 * Features:
 * - Page Load Time
 * - First Contentful Paint (FCP)
 * - Largest Contentful Paint (LCP)
 * - Cumulative Layout Shift (CLS)
 * - First Input Delay (FID)
 * - Time to Interactive (TTI)
 */

(function () {
  "use strict";

  // Wait for page to fully load
  window.addEventListener("load", function () {
    // Get performance data
    if ("performance" in window && "getEntriesByType" in performance) {
      // Navigation Timing
      const perfData = performance.getEntriesByType("navigation")[0];

      if (perfData) {
        const metrics = {
          // Page Load Metrics
          pageLoadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domContentLoaded: Math.round(
            perfData.domContentLoadedEventEnd - perfData.fetchStart,
          ),
          domInteractive: Math.round(
            perfData.domInteractive - perfData.fetchStart,
          ),

          // Network Metrics
          dnsLookup: Math.round(
            perfData.domainLookupEnd - perfData.domainLookupStart,
          ),
          tcpConnection: Math.round(
            perfData.connectEnd - perfData.connectStart,
          ),
          serverResponse: Math.round(
            perfData.responseEnd - perfData.requestStart,
          ),

          // Resource Metrics
          domProcessing: Math.round(
            perfData.domComplete - perfData.domInteractive,
          ),

          // Page Info
          pageUrl: window.location.href,
          pageTitle: document.title,
          timestamp: new Date().toISOString(),
        };

        // Log to console (for development)
        console.log("📊 Performance Metrics:", metrics);

        // Send to Google Analytics (if available)
        if (typeof gtag !== "undefined") {
          gtag("event", "page_performance", {
            event_category: "Performance",
            page_load_time: metrics.pageLoadTime,
            dom_content_loaded: metrics.domContentLoaded,
            page_url: metrics.pageUrl,
          });
        }

        // Performance warnings
        if (metrics.pageLoadTime > 3000) {
          console.warn(
            "⚠️ Slow page load detected:",
            metrics.pageLoadTime + "ms",
          );
        }

        if (metrics.serverResponse > 1000) {
          console.warn(
            "⚠️ Slow server response:",
            metrics.serverResponse + "ms",
          );
        }
      }
    }

    // Core Web Vitals Monitoring
    if ("PerformanceObserver" in window) {
      // Largest Contentful Paint (LCP)
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          const lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime);

          console.log("🎨 LCP (Largest Contentful Paint):", lcp + "ms");

          if (typeof gtag !== "undefined") {
            gtag("event", "web_vitals", {
              event_category: "Web Vitals",
              metric_name: "LCP",
              metric_value: lcp,
              metric_rating:
                lcp < 2500 ? "good" : lcp < 4000 ? "needs-improvement" : "poor",
            });
          }

          if (lcp > 2500) {
            console.warn(
              "⚠️ LCP needs improvement:",
              lcp + "ms (target: <2500ms)",
            );
          }
        });

        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
      } catch (e) {
        console.log("LCP monitoring not supported");
      }

      // First Input Delay (FID)
      try {
        const fidObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          entries.forEach((entry) => {
            const fid = Math.round(entry.processingStart - entry.startTime);

            console.log("⚡ FID (First Input Delay):", fid + "ms");

            if (typeof gtag !== "undefined") {
              gtag("event", "web_vitals", {
                event_category: "Web Vitals",
                metric_name: "FID",
                metric_value: fid,
                metric_rating:
                  fid < 100 ? "good" : fid < 300 ? "needs-improvement" : "poor",
              });
            }

            if (fid > 100) {
              console.warn(
                "⚠️ FID needs improvement:",
                fid + "ms (target: <100ms)",
              );
            }
          });
        });

        fidObserver.observe({ entryTypes: ["first-input"] });
      } catch (e) {
        console.log("FID monitoring not supported");
      }

      // Cumulative Layout Shift (CLS)
      try {
        let clsScore = 0;

        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsScore += entry.value;
            }
          }

          console.log("📐 CLS (Cumulative Layout Shift):", clsScore.toFixed(3));

          if (typeof gtag !== "undefined") {
            gtag("event", "web_vitals", {
              event_category: "Web Vitals",
              metric_name: "CLS",
              metric_value: clsScore,
              metric_rating:
                clsScore < 0.1
                  ? "good"
                  : clsScore < 0.25
                    ? "needs-improvement"
                    : "poor",
            });
          }

          if (clsScore > 0.1) {
            console.warn(
              "⚠️ CLS needs improvement:",
              clsScore.toFixed(3) + " (target: <0.1)",
            );
          }
        });

        clsObserver.observe({ entryTypes: ["layout-shift"] });
      } catch (e) {
        console.log("CLS monitoring not supported");
      }
    }

    // Resource Loading Monitoring
    const resources = performance.getEntriesByType("resource");

    if (resources && resources.length > 0) {
      let totalSize = 0;
      let slowResources = [];

      resources.forEach((resource) => {
        const duration = Math.round(resource.duration);

        // Track slow resources (>1 second)
        if (duration > 1000) {
          slowResources.push({
            name: resource.name.split("/").pop(),
            duration: duration,
            type: resource.initiatorType,
          });
        }

        // Estimate size (if available)
        if (resource.transferSize) {
          totalSize += resource.transferSize;
        }
      });

      console.log("📦 Total Resources:", resources.length);
      console.log(
        "💾 Estimated Page Size:",
        Math.round(totalSize / 1024) + " KB",
      );

      if (slowResources.length > 0) {
        console.warn("🐌 Slow Resources Detected:", slowResources);
      }

      // Send to analytics
      if (typeof gtag !== "undefined") {
        gtag("event", "resource_metrics", {
          event_category: "Performance",
          total_resources: resources.length,
          page_size_kb: Math.round(totalSize / 1024),
          slow_resources: slowResources.length,
        });
      }
    }

    // Browser & Device Info
    const deviceInfo = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenResolution: screen.width + "x" + screen.height,
      viewport: window.innerWidth + "x" + window.innerHeight,
      connection: navigator.connection
        ? navigator.connection.effectiveType
        : "unknown",
    };

    console.log("📱 Device Info:", deviceInfo);
  });

  // Error Tracking
  window.addEventListener("error", function (event) {
    console.error("❌ JavaScript Error:", {
      message: event.message,
      source: event.filename,
      line: event.lineno,
      column: event.colno,
    });

    // Send to analytics
    if (typeof gtag !== "undefined") {
      gtag("event", "exception", {
        description: event.message,
        fatal: false,
      });
    }
  });

  // Unhandled Promise Rejection
  window.addEventListener("unhandledrejection", function (event) {
    console.error("❌ Unhandled Promise Rejection:", event.reason);

    if (typeof gtag !== "undefined") {
      gtag("event", "exception", {
        description: "Promise Rejection: " + event.reason,
        fatal: false,
      });
    }
  });

  // Page Visibility (Track when user leaves/returns)
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      console.log("👋 User left the page");

      if (typeof gtag !== "undefined") {
        gtag("event", "page_visibility", {
          event_category: "Engagement",
          event_label: "Page Hidden",
        });
      }
    } else {
      console.log("👀 User returned to page");

      if (typeof gtag !== "undefined") {
        gtag("event", "page_visibility", {
          event_category: "Engagement",
          event_label: "Page Visible",
        });
      }
    }
  });

  // Track time on page
  let startTime = Date.now();

  window.addEventListener("beforeunload", function () {
    const timeOnPage = Math.round((Date.now() - startTime) / 1000);

    console.log("⏱️ Time on page:", timeOnPage + " seconds");

    if (typeof gtag !== "undefined") {
      gtag("event", "time_on_page", {
        event_category: "Engagement",
        value: timeOnPage,
        page_url: window.location.href,
      });
    }
  });

  // Performance Summary
  setTimeout(function () {
    console.log(
      "%c📊 GREENSPACESS Performance Monitor Active",
      "color: #28a745; font-weight: bold; font-size: 14px;",
    );
    console.log(
      "%cMonitoring: Page Load, Core Web Vitals, Resources, Errors",
      "color: #666; font-size: 12px;",
    );
  }, 100);
})();
