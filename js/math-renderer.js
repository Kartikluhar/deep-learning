/**
 * MLForge Centralized Mathematical Formula Rendering Engine
 * Powered by KaTeX with auto-render integration, safe error handling,
 * multi-delimiter support, dynamic DOM rendering, and deferred loading fallback.
 */

window.MLForge = window.MLForge || {};

MLForge.math = (function () {
  'use strict';

  // Standard KaTeX configuration adhering to MLForge specifications
  const DEFAULT_OPTIONS = {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "\\[", right: "\\]", display: true },
      { left: "\\(", right: "\\)", display: false },
      { left: "$", right: "$", display: false }
    ],
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code"],
    ignoredClasses: ["no-math", "code-container", "code-pre", "code-lang"],
    throwOnError: false,
    errorColor: "#f43f5e",
    strict: false
  };

  let isLibraryReady = false;
  const pendingQueue = [];

  /**
   * Check if KaTeX and auto-render extension are available on window.
   */
  function checkReady() {
    if (typeof window.renderMathInElement === 'function') {
      isLibraryReady = true;
      flushPendingQueue();
      return true;
    }
    return false;
  }

  /**
   * Process queued elements that requested rendering before KaTeX finished loading.
   */
  function flushPendingQueue() {
    while (pendingQueue.length > 0) {
      const task = pendingQueue.shift();
      executeRender(task.element, task.options);
    }
  }

  /**
   * Directly invoke renderMathInElement on a DOM element.
   */
  function executeRender(element, customOptions) {
    if (!element || !(element instanceof Node)) return;
    try {
      const options = Object.assign({}, DEFAULT_OPTIONS, customOptions || {});
      window.renderMathInElement(element, options);
    } catch (err) {
      console.warn("[MLForge Math] KaTeX rendering notice:", err);
    }
  }

  /**
   * Public render function: typesets math formulas inside the target element.
   * If KaTeX is not yet loaded, queues the element for automatic rendering once ready.
   * 
   * @param {HTMLElement|string} target - DOM Element or element ID to render within.
   * @param {Object} [customOptions] - Optional KaTeX auto-render overrides.
   */
  function render(target, customOptions) {
    let el = target;
    if (typeof target === 'string') {
      el = document.getElementById(target);
    }
    if (!el) {
      el = document.body;
    }

    if (checkReady()) {
      executeRender(el, customOptions);
    } else {
      pendingQueue.push({ element: el, options: customOptions });
      // Poll briefly while KaTeX scripts load
      pollForReadiness();
    }
  }

  let pollingInterval = null;
  function pollForReadiness() {
    if (pollingInterval) return;
    let attempts = 0;
    pollingInterval = setInterval(() => {
      attempts++;
      if (checkReady() || attempts > 100) {
        clearInterval(pollingInterval);
        pollingInterval = null;
      }
    }, 50);
  }

  /**
   * Synchronously render a single LaTeX formula string into an HTML string.
   * 
   * @param {string} latex - Raw LaTeX formula expression.
   * @param {boolean} [isDisplay=false] - Whether to render in display block mode.
   * @returns {string} Formatted HTML string with rendered KaTeX spans.
   */
  function renderToString(latex, isDisplay = false) {
    if (!latex) return "";
    if (typeof window.katex !== 'undefined' && typeof window.katex.renderToString === 'function') {
      try {
        return window.katex.renderToString(latex, {
          displayMode: Boolean(isDisplay),
          throwOnError: false,
          errorColor: '#f43f5e'
        });
      } catch (err) {
        return `<span class="katex-error" style="color: #f43f5e;" title="${err.message}">${latex}</span>`;
      }
    }
    // Fallback if KaTeX is not loaded yet
    return isDisplay ? `\\[${latex}\\]` : `\\(${latex}\\)`;
  }

  /**
   * Format helper: wraps LaTeX in inline math delimiters
   */
  function inline(latex) {
    return `\\(${latex}\\)`;
  }

  /**
   * Format helper: wraps LaTeX in display math delimiters
   */
  function display(latex) {
    return `\\[${latex}\\]`;
  }

  // Initialization hooks
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      checkReady();
    });
  } else {
    checkReady();
  }

  window.addEventListener('load', () => {
    checkReady();
    render(document.body);
  });

  return {
    render,
    renderToString,
    inline,
    display,
    get isReady() {
      return isLibraryReady || checkReady();
    },
    DEFAULT_OPTIONS
  };
})();
