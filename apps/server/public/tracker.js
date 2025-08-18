(function () {
  "use strict";

  const config = {
    apiUrl:
      window.location.hostname === "localhost"
        ? "http://localhost:3000/api/tracking"
        : "https://api.dataprism.co/api/tracking",
    debug: false,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
    heartbeatInterval: 30 * 1000, // 30 seconds
    enableErrorTracking: true,
    enableRealTimeTracking: true,
  };

  let trackingId = null;
  let visitorId = null;
  let sessionId = null;
  let sessionStartTime = null;
  let lastActivityTime = null;
  let pageStartTime = null;

  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  }

  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  }

  function getVisitorId() {
    let id = getCookie("dp_visitor_id");
    if (!id) {
      // Fallback to sessionStorage if cookies don't work
      id = sessionStorage.getItem("dp_visitor_id");
      if (!id) {
        id = generateId();
        setCookie("dp_visitor_id", id, 365);
        sessionStorage.setItem("dp_visitor_id", id);
      }
    }
    return id;
  }

  function getSessionId() {
    let id = sessionStorage.getItem("dp_session_id");
    const timestamp = sessionStorage.getItem("dp_session_start");

    if (
      !id ||
      !timestamp ||
      Date.now() - parseInt(timestamp) > config.sessionTimeout
    ) {
      id = generateId();
      sessionStartTime = Date.now();
      sessionStorage.setItem("dp_session_id", id);
      sessionStorage.setItem("dp_session_start", sessionStartTime.toString());
    } else {
      sessionStartTime = parseInt(timestamp);
    }

    return id;
  }

  function getDeviceInfo() {
    const ua = navigator.userAgent;
    const screenWidth = screen.width;
    const screenHeight = screen.height;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let deviceType = "DESKTOP";
    if (/Mobile|Android|iPhone|iPad/.test(ua)) {
      deviceType = /iPad/.test(ua) ? "TABLET" : "MOBILE";
    }

    let browser = "Unknown";
    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari")) browser = "Safari";
    else if (ua.includes("Edge")) browser = "Edge";

    let os = "Unknown";
    if (ua.includes("Windows")) os = "Windows";
    else if (ua.includes("Mac")) os = "macOS";
    else if (ua.includes("Linux")) os = "Linux";
    else if (ua.includes("Android")) os = "Android";
    else if (ua.includes("iOS")) os = "iOS";

    return {
      device: deviceType,
      browser,
      os,
      userAgent: ua,
      screenResolution: `${screenWidth}x${screenHeight}`,
      viewportSize: `${viewportWidth}x${viewportHeight}`,
    };
  }

  function getLocationInfo() {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    return { timezone };
  }

  function getUtmParams() {
    const urlParams = new URLSearchParams(window.location.search);
    return {
      utmSource: urlParams.get("utm_source"),
      utmMedium: urlParams.get("utm_medium"),
      utmCampaign: urlParams.get("utm_campaign"),
      utmContent: urlParams.get("utm_content"),
      utmTerm: urlParams.get("utm_term"),
    };
  }

  function hashIp(ip) {
    // Simple hash function for privacy
    let hash = 0;
    for (let i = 0; i < ip.length; i++) {
      const char = ip.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return hash.toString();
  }

  function sendData(endpoint, data) {
    if (!trackingId) return;

    // Ensure we have fresh visitor and session IDs
    if (!visitorId) visitorId = getVisitorId();
    if (!sessionId) sessionId = getSessionId();

    const payload = {
      websiteId: trackingId,
      visitorId,
      sessionId,
      timestamp: new Date().toISOString(),
      ...data,
    };

    if (config.debug) {
      console.log("DataPrism Track:", payload);
    }

    fetch(`${config.apiUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch((err) => {
      if (config.debug) console.error("Track error:", err);
      if (config.enableErrorTracking) {
        trackError(err, `tracking_${endpoint}`);
      }
    });
  }

  function trackPageView() {
    const deviceInfo = getDeviceInfo();
    const locationInfo = getLocationInfo();
    const utmParams = getUtmParams();
    const loadTime = pageStartTime ? Date.now() - pageStartTime : null;

    const data = {
      path: window.location.pathname,
      title: document.title,
      hostname: window.location.hostname,
      referrer: document.referrer,
      referrerDomain: document.referrer
        ? new URL(document.referrer).hostname
        : null,
      ...deviceInfo,
      ...locationInfo,
      ...utmParams,
    };

    sendData("pageview", data);
    lastActivityTime = Date.now();
  }

  function trackEvent(eventData) {
    const deviceInfo = getDeviceInfo();

    const data = {
      path: window.location.pathname,
      title: document.title,
      ...deviceInfo,
      ...eventData,
    };

    sendData("event", data);
    lastActivityTime = Date.now();
  }

  function trackError(error, context) {
    if (!config.enableErrorTracking) return;

    const deviceInfo = getDeviceInfo();

    const errorData = {
      level: "ERROR",
      source: "client",
      message: error.message || String(error),
      stack: error.stack,
      context,
      path: window.location.pathname,
      ...deviceInfo,
    };

    sendData("error", errorData);
  }

  function trackSessionEnd() {
    const duration = lastActivityTime
      ? Math.round((lastActivityTime - sessionStartTime) / 1000)
      : 0;

    sendData("session-end", {
      duration,
      endReason: "PAGE_CLOSE",
    });
  }

  function setupEventListeners() {
    // Track clicks
    document.addEventListener("click", (e) => {
      const element = e.target;
      trackEvent({
        eventType: "CLICK",
        eventName: "click",
        elementId: element.id || null,
        elementClass: element.className || null,
        elementTag: element.tagName?.toLowerCase() || null,
        elementText: element.textContent?.substring(0, 100) || null,
        xPosition: e.clientX,
        yPosition: e.clientY,
      });
    });

    // Track form submissions
    document.addEventListener("submit", (e) => {
      trackEvent({
        eventType: "FORM_SUBMIT",
        eventName: "form_submit",
        elementId: e.target.id || null,
        elementClass: e.target.className || null,
      });
    });

    // Track page unload
    window.addEventListener("beforeunload", () => {
      trackSessionEnd();
    });

    // Track visibility changes
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        trackSessionEnd();
      }
    });

    // Global error tracking
    if (config.enableErrorTracking) {
      window.addEventListener("error", (e) => {
        trackError(e.error, "global_error");
      });

      window.addEventListener("unhandledrejection", (e) => {
        trackError(e.reason, "unhandled_promise");
      });
    }

    // Activity heartbeat
    setInterval(() => {
      if (
        lastActivityTime &&
        Date.now() - lastActivityTime < config.heartbeatInterval * 2
      ) {
        sendData("heartbeat", {
          path: window.location.pathname,
          title: document.title,
        });
      }
    }, config.heartbeatInterval);
  }

  function init() {
    // Get tracking ID from script tag or data attribute
    const scriptTag =
      document.currentScript ||
      document.querySelector("script[data-website-id]") ||
      Array.from(document.querySelectorAll("script")).find((s) =>
        s.src.includes("tracker.js")
      );

    if (scriptTag) {
      trackingId =
        scriptTag.getAttribute("data-website-id") ||
        scriptTag.getAttribute("data-tracking-id") ||
        new URLSearchParams(scriptTag.src.split("?")[1] || "").get("id");
    }

    if (!trackingId) {
      if (config.debug) console.error("DataPrism: No tracking ID found");
      return;
    }

    // Check Do Not Track
    // if (navigator.doNotTrack === '1') {
    //   if (config.debug) console.log('DataPrism: Do Not Track enabled');
    //   return;
    // }

    visitorId = getVisitorId();
    sessionId = getSessionId();
    pageStartTime = Date.now();

    setupEventListeners();
    trackPageView();

    // Track SPA navigation
    let lastPath = window.location.pathname;
    setInterval(() => {
      if (window.location.pathname !== lastPath) {
        lastPath = window.location.pathname;
        pageStartTime = Date.now();
        trackPageView();
      }
    }, 1000);
  }

  // Public API
  window.dataprism = window.dataprism || {
    track: trackEvent,
    trackError: trackError,
    identify: function (userId) {
      setCookie("dp_user_id", userId, 365);
    },
    page: trackPageView,
    config: function (options) {
      Object.assign(config, options);
    },
    getVisitorId: function () {
      return visitorId;
    },
    getSessionId: function () {
      return sessionId;
    },
    isTracking: function () {
      return !!trackingId;
    },
  };

  // Auto-initialize
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
