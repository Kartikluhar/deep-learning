/**
 * MLForge Data Science & Data Engineering LocalStorage & Progress Manager
 * Tracks completed topics, bookmarks, quiz scores, project completions,
 * and user learning journey with 100% browser-local persistence.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};

MLForge.dsde.storage = (function () {
  const KEYS = {
    COMPLETED_TOPICS: 'mlforge_dsde_completed_topics',
    BOOKMARKS: 'mlforge_dsde_bookmarks',
    COMPLETED_PROJECTS: 'mlforge_dsde_completed_projects',
    QUIZ_SCORES: 'mlforge_dsde_quiz_scores',
    LAST_TOPIC: 'mlforge_dsde_last_topic',
    CALC_STATE: 'mlforge_dsde_calc_state'
  };

  function isAvailable() {
    try {
      const test = '__mlforge_dsde_test__';
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
      console.warn('DSDE storage read error:', key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('DSDE storage write error:', key, e);
    }
  }

  return {
    // 1. Completed Topics
    getCompletedTopics() {
      return getItem(KEYS.COMPLETED_TOPICS, []);
    },
    isTopicCompleted(id) {
      return this.getCompletedTopics().includes(id);
    },
    toggleTopicCompleted(id) {
      const list = this.getCompletedTopics();
      const idx = list.indexOf(id);
      let completed = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        completed = false;
      } else {
        list.push(id);
        completed = true;
      }
      setItem(KEYS.COMPLETED_TOPICS, list);
      return completed;
    },

    // 2. Bookmarks
    getBookmarks() {
      return getItem(KEYS.BOOKMARKS, []);
    },
    isBookmarked(id) {
      return this.getBookmarks().some(b => b.id === id);
    },
    toggleBookmark(item) {
      const list = this.getBookmarks();
      const idx = list.findIndex(b => b.id === item.id);
      let added = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        added = false;
      } else {
        list.push({
          id: item.id,
          title: item.title,
          category: item.category || 'Data Science',
          link: item.link || `#dsde/topic/${item.id}`,
          timestamp: Date.now()
        });
        added = true;
      }
      setItem(KEYS.BOOKMARKS, list);
      return added;
    },

    // 3. Completed Projects
    getCompletedProjects() {
      return getItem(KEYS.COMPLETED_PROJECTS, []);
    },
    isProjectCompleted(id) {
      return this.getCompletedProjects().includes(id);
    },
    toggleProjectCompleted(id) {
      const list = this.getCompletedProjects();
      const idx = list.indexOf(id);
      let completed = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        completed = false;
      } else {
        list.push(id);
        completed = true;
      }
      setItem(KEYS.COMPLETED_PROJECTS, list);
      return completed;
    },

    // 4. Quiz Scores
    getQuizScores() {
      return getItem(KEYS.QUIZ_SCORES, {});
    },
    saveQuizScore(quizId, score, total) {
      const scores = this.getQuizScores();
      scores[quizId] = {
        score,
        total,
        percentage: Math.round((score / total) * 100),
        timestamp: Date.now()
      };
      setItem(KEYS.QUIZ_SCORES, scores);
    },

    // 5. Last Visited Topic
    getLastTopic() {
      return getItem(KEYS.LAST_TOPIC, 'intro-data-science');
    },
    setLastTopic(id) {
      setItem(KEYS.LAST_TOPIC, id);
    },

    // 6. Reset all progress
    resetAllProgress() {
      if (!storageAvailable) return;
      Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    }
  };
})();
