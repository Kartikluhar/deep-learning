/**
 * MLForge Cloud Computing & DevOps LocalStorage & Progress Manager
 * Tracks completed topics, bookmarks, quiz scores, project completions,
 * and user learning journey with 100% browser-local persistence.
 */

window.MLForge = window.MLForge || {};
window.MLForge.devops = window.MLForge.devops || {};

MLForge.devops.storage = (function () {
  const KEYS = {
    COMPLETED_TOPICS: 'mlforge_devops_completed_topics',
    BOOKMARKS: 'mlforge_devops_bookmarks',
    COMPLETED_PROJECTS: 'mlforge_devops_completed_projects',
    QUIZ_SCORES: 'mlforge_devops_quiz_scores',
    LAST_TOPIC: 'mlforge_devops_last_topic',
    CALC_STATE: 'mlforge_devops_calc_state'
  };

  function isAvailable() {
    try {
      const test = '__mlforge_devops_test__';
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
      console.warn('DevOps storage read error:', key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('DevOps storage write error:', key, e);
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
          category: item.category || 'General',
          link: item.link || `#devops/topic/${item.id}`,
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
        date: new Date().toISOString()
      };
      setItem(KEYS.QUIZ_SCORES, scores);
    },

    // 5. Last Visited Topic
    getLastTopic() {
      return getItem(KEYS.LAST_TOPIC, null);
    },
    setLastTopic(topic) {
      if (!topic || !topic.id) return;
      setItem(KEYS.LAST_TOPIC, {
        id: topic.id,
        title: topic.title,
        category: topic.category
      });
    },

    // 6. Overall Stats
    getStats(totalTopicsCount = 20, totalProjectsCount = 21) {
      const completedTopics = this.getCompletedTopics();
      const completedProjects = this.getCompletedProjects();
      const bookmarks = this.getBookmarks();
      const quizScores = this.getQuizScores();

      const progressPercent = totalTopicsCount > 0
        ? Math.round((completedTopics.length / totalTopicsCount) * 100)
        : 0;

      return {
        completedTopicsCount: completedTopics.length,
        totalTopics: totalTopicsCount,
        completedProjectsCount: completedProjects.length,
        totalProjects: totalProjectsCount,
        bookmarksCount: bookmarks.length,
        progressPercent,
        quizScoresCount: Object.keys(quizScores).length,
        lastTopic: this.getLastTopic()
      };
    }
  };
})();

