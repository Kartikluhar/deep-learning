/**
 * MLForge SQL LocalStorage & Progress Manager
 * Tracks completed topics, bookmarked concepts, solved practice problems,
 * quiz attempts, playground query history, and learning progress.
 * Persists 100% locally in browser without external dependencies.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};

MLForge.sql.storage = (function () {
  const KEYS = {
    COMPLETED_TOPICS: 'mlforge_sql_completed_topics',
    BOOKMARKS: 'mlforge_sql_bookmarks',
    SOLVED_PROBLEMS: 'mlforge_sql_solved_problems',
    PROBLEM_CODE: 'mlforge_sql_problem_code',
    QUIZ_SCORES: 'mlforge_sql_quiz_scores',
    LAST_TOPIC: 'mlforge_sql_last_topic',
    SAVED_QUERIES: 'mlforge_sql_saved_queries'
  };

  function isAvailable() {
    try {
      const test = '__mlforge_sql_test__';
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
      console.warn('SQL storage read error:', key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('SQL storage write error:', key, e);
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
      // item: { id, title, type, link, category }
      const list = this.getBookmarks();
      const idx = list.findIndex(b => b.id === item.id);
      let isAdded = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        isAdded = false;
      } else {
        list.unshift({
          id: item.id,
          title: item.title,
          type: item.type || 'SQL Topic',
          link: item.link || `#sql/topic/${item.id}`,
          category: item.category || 'SQL',
          date: new Date().toLocaleDateString()
        });
        isAdded = true;
      }
      setItem(KEYS.BOOKMARKS, list);
      return isAdded;
    },

    // 3. Solved Practice Problems
    getSolvedProblems() {
      return getItem(KEYS.SOLVED_PROBLEMS, []);
    },
    isProblemSolved(id) {
      return this.getSolvedProblems().includes(id);
    },
    markProblemSolved(id) {
      const list = this.getSolvedProblems();
      if (!list.includes(id)) {
        list.push(id);
        setItem(KEYS.SOLVED_PROBLEMS, list);
      }
    },

    // 4. Saved User Code for Problems
    getProblemDraft(problemId) {
      const drafts = getItem(KEYS.PROBLEM_CODE, {});
      return drafts[problemId] || '';
    },
    saveProblemDraft(problemId, sql) {
      const drafts = getItem(KEYS.PROBLEM_CODE, {});
      drafts[problemId] = sql;
      setItem(KEYS.PROBLEM_CODE, drafts);
    },

    // 5. Quiz Scores
    getQuizScores() {
      return getItem(KEYS.QUIZ_SCORES, {});
    },
    saveQuizScore(quizId, score, total) {
      const scores = this.getQuizScores();
      scores[quizId] = {
        score,
        total,
        percentage: Math.round((score / total) * 100),
        date: new Date().toLocaleDateString()
      };
      setItem(KEYS.QUIZ_SCORES, scores);
    },

    // 6. Last Opened Topic
    getLastTopic() {
      return getItem(KEYS.LAST_TOPIC, null);
    },
    setLastTopic(topicObj) {
      if (!topicObj || !topicObj.id) return;
      setItem(KEYS.LAST_TOPIC, {
        id: topicObj.id,
        title: topicObj.title,
        category: topicObj.category || 'Fundamentals',
        timestamp: Date.now()
      });
    },

    // 7. Playground Saved Queries
    getSavedQueries() {
      return getItem(KEYS.SAVED_QUERIES, []);
    },
    saveQuery(name, sql) {
      const list = this.getSavedQueries();
      list.unshift({
        id: 'q_' + Date.now(),
        name: name || 'Untitled Query',
        sql,
        created: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      if (list.length > 25) list.pop();
      setItem(KEYS.SAVED_QUERIES, list);
      return list;
    },
    deleteSavedQuery(queryId) {
      let list = this.getSavedQueries();
      list = list.filter(q => q.id !== queryId);
      setItem(KEYS.SAVED_QUERIES, list);
      return list;
    },

    // 8. Overall Progress & Stats
    getStats(totalTopicsCount = 32, totalProblemsCount = 30) {
      const completed = this.getCompletedTopics();
      const solved = this.getSolvedProblems();
      const bookmarks = this.getBookmarks();
      const lastTopic = this.getLastTopic();
      const pct = totalTopicsCount > 0 ? Math.round((completed.length / totalTopicsCount) * 100) : 0;

      return {
        totalTopics: totalTopicsCount,
        completedTopicsCount: completed.length,
        inProgressCount: Math.max(0, totalTopicsCount - completed.length),
        progressPercent: Math.min(100, pct),
        totalProblems: totalProblemsCount,
        solvedProblemsCount: solved.length,
        bookmarksCount: bookmarks.length,
        lastTopic: lastTopic
      };
    },

    // 9. Reset All SQL Progress
    resetAllProgress() {
      if (!storageAvailable) return;
      Object.values(KEYS).forEach(k => localStorage.removeItem(k));
    }
  };
})();

