/**
 * MLForge Git & GitHub LocalStorage & State Manager
 * Tracks completed lessons, bookmarked commands, practice lab results, and recent topics.
 * 100% Client-side browser storage without external backend or API keys.
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};

MLForge.git.storage = (function () {
  const KEYS = {
    COMPLETED_TOPICS: 'mlforge_git_completed_topics',
    BOOKMARKED_COMMANDS: 'mlforge_git_bookmarked_commands',
    PRACTICE_RESULTS: 'mlforge_git_practice_results',
    RECENT: 'mlforge_git_recent'
  };

  function isAvailable() {
    try {
      const test = '__mlforge_git_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  const storageAvailable = isAvailable();

  function getItem(key, defaultValue) {
    if (!storageAvailable) return defaultValue;
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      console.warn('Git storage read error:', key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Git storage write error:', key, e);
    }
  }

  return {
    // Completed Lessons & Topics
    getCompletedTopics() {
      return getItem(KEYS.COMPLETED_TOPICS, []);
    },
    isTopicCompleted(topicId) {
      return this.getCompletedTopics().includes(topicId);
    },
    toggleTopicCompleted(topicId) {
      const list = this.getCompletedTopics();
      const idx = list.indexOf(topicId);
      let status = false;
      if (idx > -1) {
        list.splice(idx, 1);
        status = false;
      } else {
        list.push(topicId);
        status = true;
      }
      setItem(KEYS.COMPLETED_TOPICS, list);
      return status;
    },

    // Bookmarked Commands
    getBookmarkedCommands() {
      return getItem(KEYS.BOOKMARKED_COMMANDS, []);
    },
    isCommandBookmarked(cmdId) {
      return this.getBookmarkedCommands().includes(cmdId);
    },
    toggleCommandBookmark(cmdId) {
      const list = this.getBookmarkedCommands();
      const idx = list.indexOf(cmdId);
      let status = false;
      if (idx > -1) {
        list.splice(idx, 1);
        status = false;
      } else {
        list.push(cmdId);
        status = true;
      }
      setItem(KEYS.BOOKMARKED_COMMANDS, list);
      return status;
    },

    // Practice Lab Results
    getPracticeResults() {
      return getItem(KEYS.PRACTICE_RESULTS, {});
    },
    recordPracticeResult(questionId, isCorrect) {
      const results = this.getPracticeResults();
      results[questionId] = {
        correct: !!isCorrect,
        timestamp: Date.now()
      };
      setItem(KEYS.PRACTICE_RESULTS, results);
    },

    // Recent Activity
    getRecent() {
      return getItem(KEYS.RECENT, []);
    },
    addRecent(item) {
      let recent = this.getRecent();
      recent = recent.filter(r => r.link !== item.link);
      recent.unshift({
        title: item.title,
        type: item.type || 'Git Lesson',
        link: item.link,
        timestamp: Date.now()
      });
      if (recent.length > 10) recent = recent.slice(0, 10);
      setItem(KEYS.RECENT, recent);
    },

    // Aggregated Stats
    getStats() {
      const completedTopics = this.getCompletedTopics();
      const bookmarks = this.getBookmarkedCommands();
      const practiceResults = this.getPracticeResults();

      const totalTopics = (window.MLForge.git.data && window.MLForge.git.data.topics) 
        ? window.MLForge.git.data.topics.length 
        : 24;
      const totalCommands = (window.MLForge.git.data && window.MLForge.git.data.commands) 
        ? window.MLForge.git.data.commands.length 
        : 45;

      const practiceCorrectCount = Object.values(practiceResults).filter(r => r.correct).length;

      return {
        completedCount: completedTopics.length,
        totalTopics: totalTopics,
        progressPct: Math.round((completedTopics.length / Math.max(totalTopics, 1)) * 100),
        bookmarkedCount: bookmarks.length,
        totalCommands: totalCommands,
        practiceSolved: practiceCorrectCount,
        topicsRemaining: Math.max(0, totalTopics - completedTopics.length)
      };
    },

    // Reset Progress
    clearProgress() {
      if (!storageAvailable) return;
      localStorage.removeItem(KEYS.COMPLETED_TOPICS);
      localStorage.removeItem(KEYS.BOOKMARKED_COMMANDS);
      localStorage.removeItem(KEYS.PRACTICE_RESULTS);
      localStorage.removeItem(KEYS.RECENT);
    }
  };
})();

