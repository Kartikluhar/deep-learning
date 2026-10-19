/**
 * MLForge LocalStorage Manager
 * Stores user bookmarks, recently used calculators/topics, theme, and preferences.
 * All data remains locally in the browser.
 */

window.MLForge = window.MLForge || {};

MLForge.storage = (function () {
  const KEYS = {
    THEME: 'mlforge_theme',
    BOOKMARKS: 'mlforge_bookmarks',
    RECENT: 'mlforge_recent',
    SETTINGS: 'mlforge_settings'
  };

  function isAvailable() {
    try {
      const test = '__mlforge_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  const storageAvailable = isAvailable();

  function getItem(key, defaultValue = null) {
    if (!storageAvailable) return defaultValue;
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      console.warn('Storage read error for key:', key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write error for key:', key, e);
    }
  }

  return {
    // Theme
    getTheme() {
      if (!storageAvailable) return 'dark';
      return localStorage.getItem(KEYS.THEME) || 'dark';
    },
    setTheme(theme) {
      if (!storageAvailable) return;
      localStorage.setItem(KEYS.THEME, theme);
    },

    // Bookmarks
    getBookmarks() {
      return getItem(KEYS.BOOKMARKS, []);
    },
    isBookmarked(id, type) {
      const bookmarks = this.getBookmarks();
      return bookmarks.some(b => b.id === id && (!type || b.type === type));
    },
    toggleBookmark(item) {
      // item: { id, title, type, link, category }
      const bookmarks = this.getBookmarks();
      const index = bookmarks.findIndex(b => b.id === item.id && b.type === item.type);
      let isAdded = false;
      if (index >= 0) {
        bookmarks.splice(index, 1);
        isAdded = false;
      } else {
        bookmarks.unshift({
          id: item.id,
          title: item.title,
          type: item.type || 'tool',
          link: item.link || '',
          category: item.category || 'General',
          timestamp: Date.now()
        });
        isAdded = true;
      }
      setItem(KEYS.BOOKMARKS, bookmarks);
      return isAdded;
    },
    removeBookmark(id, type) {
      const bookmarks = this.getBookmarks().filter(b => !(b.id === id && b.type === type));
      setItem(KEYS.BOOKMARKS, bookmarks);
    },
    clearBookmarks() {
      setItem(KEYS.BOOKMARKS, []);
    },

    // Recent Items
    getRecent() {
      return getItem(KEYS.RECENT, []);
    },
    addRecent(item) {
      // item: { id, title, type, link }
      let recent = this.getRecent();
      recent = recent.filter(r => !(r.id === item.id && r.type === item.type));
      recent.unshift({
        id: item.id,
        title: item.title,
        type: item.type,
        link: item.link,
        timestamp: Date.now()
      });
      // Keep up to 12 most recent
      if (recent.length > 12) recent.pop();
      setItem(KEYS.RECENT, recent);
    },
    clearRecent() {
      setItem(KEYS.RECENT, []);
    }
  };
})();
