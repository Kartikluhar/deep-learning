/**
 * MLForge DSA LocalStorage & State Manager
 * Tracks completed topics, attempted/solved problems, bookmarks, and recent items.
 * All persistence remains 100% locally in the browser with zero external calls.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsa = window.MLForge.dsa || {};

MLForge.dsa.storage = (function () {
  const KEYS = {
    SOLVED: 'mlforge_dsa_solved',
    ATTEMPTED: 'mlforge_dsa_attempted',
    BOOKMARKS: 'mlforge_dsa_bookmarks',
    COMPLETED_TOPICS: 'mlforge_dsa_completed_topics',
    RECENT_PROBLEMS: 'mlforge_dsa_recent_problems',
    RECENT_TOPICS: 'mlforge_dsa_recent_topics'
  };

  function isAvailable() {
    try {
      const test = '__mlforge_dsa_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  const storageAvailable = isAvailable();

  function getItem(key, defaultValue = []) {
    if (!storageAvailable) return defaultValue;
    try {
      const val = localStorage.getItem(key);
      return val ? JSON.parse(val) : defaultValue;
    } catch (e) {
      console.warn('DSA storage read error:', key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('DSA storage write error:', key, e);
    }
  }

  return {
    // Solved Problems
    getSolved() {
      return getItem(KEYS.SOLVED, []);
    },
    isProblemSolved(id) {
      return this.getSolved().includes(id);
    },
    toggleProblemSolved(id) {
      const list = this.getSolved();
      const idx = list.indexOf(id);
      let isSolved = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        isSolved = false;
      } else {
        list.push(id);
        isSolved = true;
        // If solved, remove from attempted
        this.removeProblemAttempted(id);
      }
      setItem(KEYS.SOLVED, list);
      return isSolved;
    },
    markProblemSolved(id) {
      const list = this.getSolved();
      if (!list.includes(id)) {
        list.push(id);
        setItem(KEYS.SOLVED, list);
      }
      this.removeProblemAttempted(id);
    },

    // Attempted Problems
    getAttempted() {
      return getItem(KEYS.ATTEMPTED, []);
    },
    isProblemAttempted(id) {
      return this.getAttempted().includes(id);
    },
    toggleProblemAttempted(id) {
      if (this.isProblemSolved(id)) return false; // Already solved
      const list = this.getAttempted();
      const idx = list.indexOf(id);
      let isAttempted = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        isAttempted = false;
      } else {
        list.push(id);
        isAttempted = true;
      }
      setItem(KEYS.ATTEMPTED, list);
      return isAttempted;
    },
    removeProblemAttempted(id) {
      const list = this.getAttempted().filter(x => x !== id);
      setItem(KEYS.ATTEMPTED, list);
    },

    // Bookmarks
    getBookmarks() {
      return getItem(KEYS.BOOKMARKS, []);
    },
    isProblemBookmarked(id) {
      return this.getBookmarks().includes(id);
    },
    toggleProblemBookmark(id) {
      const list = this.getBookmarks();
      const idx = list.indexOf(id);
      let isBookmarked = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        isBookmarked = false;
      } else {
        list.push(id);
        isBookmarked = true;
      }
      setItem(KEYS.BOOKMARKS, list);
      return isBookmarked;
    },

    // Completed Topics
    getCompletedTopics() {
      return getItem(KEYS.COMPLETED_TOPICS, []);
    },
    isTopicCompleted(topicId) {
      return this.getCompletedTopics().includes(topicId);
    },
    toggleTopicCompleted(topicId) {
      const list = this.getCompletedTopics();
      const idx = list.indexOf(topicId);
      let isCompleted = false;
      if (idx >= 0) {
        list.splice(idx, 1);
        isCompleted = false;
      } else {
        list.push(topicId);
        isCompleted = true;
      }
      setItem(KEYS.COMPLETED_TOPICS, list);
      return isCompleted;
    },

    // Recents
    getRecentProblems() {
      return getItem(KEYS.RECENT_PROBLEMS, []);
    },
    addRecentProblem(problem) {
      if (!problem || !problem.id) return;
      let recents = this.getRecentProblems().filter(p => p.id !== problem.id);
      recents.unshift({
        id: problem.id,
        title: problem.title,
        difficulty: problem.difficulty,
        topic: problem.topic,
        timestamp: Date.now()
      });
      if (recents.length > 10) recents.pop();
      setItem(KEYS.RECENT_PROBLEMS, recents);
    },

    getRecentTopics() {
      return getItem(KEYS.RECENT_TOPICS, []);
    },
    addRecentTopic(topic) {
      if (!topic || !topic.id) return;
      let recents = this.getRecentTopics().filter(t => t.id !== topic.id);
      recents.unshift({
        id: topic.id,
        title: topic.title,
        category: topic.category,
        timestamp: Date.now()
      });
      if (recents.length > 10) recents.pop();
      setItem(KEYS.RECENT_TOPICS, recents);
    },

    // Accurate Statistics Calculator
    getStats(allProblems = [], allTopics = []) {
      const solvedIds = this.getSolved();
      const attemptedIds = this.getAttempted();
      const bookmarkedIds = this.getBookmarks();
      const completedTopicIds = this.getCompletedTopics();

      const totalProblems = allProblems.length;
      const solvedCount = solvedIds.filter(id => allProblems.some(p => p.id === id)).length;
      const attemptedCount = attemptedIds.filter(id => allProblems.some(p => p.id === id)).length;
      const bookmarkedCount = bookmarkedIds.filter(id => allProblems.some(p => p.id === id)).length;

      const easyProblems = allProblems.filter(p => p.difficulty === 'Easy');
      const mediumProblems = allProblems.filter(p => p.difficulty === 'Medium');
      const hardProblems = allProblems.filter(p => p.difficulty === 'Hard');

      const easySolved = easyProblems.filter(p => solvedIds.includes(p.id)).length;
      const mediumSolved = mediumProblems.filter(p => solvedIds.includes(p.id)).length;
      const hardSolved = hardProblems.filter(p => solvedIds.includes(p.id)).length;

      const totalTopics = allTopics.length;
      const completedTopicsCount = completedTopicIds.filter(id => allTopics.some(t => t.id === id)).length;

      const overallProgress = totalProblems > 0 
        ? Math.round((solvedCount / totalProblems) * 100) 
        : 0;

      return {
        totalProblems,
        solvedCount,
        attemptedCount,
        bookmarkedCount,
        easyTotal: easyProblems.length,
        easySolved,
        mediumTotal: mediumProblems.length,
        mediumSolved,
        hardTotal: hardProblems.length,
        hardSolved,
        totalTopics,
        completedTopicsCount,
        overallProgress
      };
    },

    // Reset Controls
    resetTopicProgress(topicId, allProblems = []) {
      const topicProblems = allProblems.filter(p => p.topic === topicId || p.subtopic === topicId);
      const topicProblemIds = topicProblems.map(p => p.id);

      const solved = this.getSolved().filter(id => !topicProblemIds.includes(id));
      const attempted = this.getAttempted().filter(id => !topicProblemIds.includes(id));
      const completedTopics = this.getCompletedTopics().filter(id => id !== topicId);

      setItem(KEYS.SOLVED, solved);
      setItem(KEYS.ATTEMPTED, attempted);
      setItem(KEYS.COMPLETED_TOPICS, completedTopics);
    },

    resetAllProgress() {
      setItem(KEYS.SOLVED, []);
      setItem(KEYS.ATTEMPTED, []);
      setItem(KEYS.BOOKMARKS, []);
      setItem(KEYS.COMPLETED_TOPICS, []);
      setItem(KEYS.RECENT_PROBLEMS, []);
      setItem(KEYS.RECENT_TOPICS, []);
    }
  };
})();

