/**
 * MLForge System Design LocalStorage & Progress Manager
 * Tracks completed topics, bookmarked concepts, interview questions progress,
 * quiz attempts, interactive scratchpads, and saved architecture diagrams.
 * Persists 100% locally in browser without external dependencies.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sysdesign = window.MLForge.sysdesign || {};

MLForge.sysdesign.storage = (function () {
  const KEYS = {
    COMPLETED_TOPICS: 'mlforge_sysdesign_completed_topics',
    BOOKMARKS: 'mlforge_sysdesign_bookmarks',
    INTERVIEW_STATUS: 'mlforge_sysdesign_interview_status',
    INTERVIEW_NOTES: 'mlforge_sysdesign_interview_notes',
    QUIZ_SCORES: 'mlforge_sysdesign_quiz_scores',
    RECENT_TOPICS: 'mlforge_sysdesign_recent_topics',
    SAVED_DIAGRAMS: 'mlforge_sysdesign_saved_diagrams'
  };

  function isAvailable() {
    try {
      const test = '__mlforge_sysdesign_test__';
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
      console.warn('SysDesign storage read error:', key, e);
      return defaultValue;
    }
  }

  function setItem(key, value) {
    if (!storageAvailable) return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('SysDesign storage write error:', key, e);
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
          type: item.type || 'System Design',
          link: item.link || `#sysdesign/topic/${item.id}`,
          category: item.category || 'Architecture',
          date: new Date().toLocaleDateString()
        });
        isAdded = true;
      }
      setItem(KEYS.BOOKMARKS, list);

      // Also sync to global MLForge bookmarks if active
      if (window.MLForge && window.MLForge.storage) {
        window.MLForge.storage.toggleBookmark(item);
      }
      return isAdded;
    },

    // 3. Interview Question Status & Notes
    getInterviewStatuses() {
      return getItem(KEYS.INTERVIEW_STATUS, {});
    },
    getInterviewStatus(id) {
      const statuses = this.getInterviewStatuses();
      return statuses[id] || 'not_started';
    },
    setInterviewStatus(id, status) {
      const statuses = this.getInterviewStatuses();
      statuses[id] = status;
      setItem(KEYS.INTERVIEW_STATUS, statuses);
    },
    getInterviewNotes(id) {
      const notes = getItem(KEYS.INTERVIEW_NOTES, {});
      return notes[id] || '';
    },
    setInterviewNotes(id, noteText) {
      const notes = getItem(KEYS.INTERVIEW_NOTES, {});
      notes[id] = noteText;
      setItem(KEYS.INTERVIEW_NOTES, notes);
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
        timestamp: Date.now(),
        date: new Date().toLocaleDateString()
      };
      setItem(KEYS.QUIZ_SCORES, scores);
    },

    // 5. Recent & Last Visited Topic
    getRecentTopics() {
      return getItem(KEYS.RECENT_TOPICS, []);
    },
    addRecentTopic(item) {
      // item: { id, title, link, type }
      let recent = this.getRecentTopics();
      recent = recent.filter(r => r.id !== item.id);
      recent.unshift({
        id: item.id,
        title: item.title,
        link: item.link || `#sysdesign/topic/${item.id}`,
        type: item.type || 'Topic',
        timestamp: Date.now()
      });
      if (recent.length > 8) recent = recent.slice(0, 8);
      setItem(KEYS.RECENT_TOPICS, recent);
    },
    getLastOpenedTopic() {
      const recent = this.getRecentTopics();
      return recent.length > 0 ? recent[0] : null;
    },

    // 6. Architecture Playground Diagrams
    getSavedDiagrams() {
      return getItem(KEYS.SAVED_DIAGRAMS, {});
    },
    saveDiagram(name, diagramData) {
      const diagrams = this.getSavedDiagrams();
      diagrams[name] = {
        data: diagramData,
        updatedAt: Date.now(),
        dateStr: new Date().toLocaleDateString()
      };
      setItem(KEYS.SAVED_DIAGRAMS, diagrams);
    },
    loadDiagram(name) {
      const diagrams = this.getSavedDiagrams();
      return diagrams[name] ? diagrams[name].data : null;
    },
    deleteDiagram(name) {
      const diagrams = this.getSavedDiagrams();
      delete diagrams[name];
      setItem(KEYS.SAVED_DIAGRAMS, diagrams);
    },

    // 7. Overall Stats Computation
    getStats(totalTopicsCount = 35, totalQuestionsCount = 30) {
      const completedTopics = this.getCompletedTopics().length;
      const bookmarksCount = this.getBookmarks().length;
      const interviewStatuses = this.getInterviewStatuses();

      let inProgressCount = 0;
      let completedQuestions = 0;

      Object.values(interviewStatuses).forEach(s => {
        if (s === 'practicing' || s === 'revision') inProgressCount++;
        if (s === 'completed') completedQuestions++;
      });

      const totalItems = totalTopicsCount + totalQuestionsCount;
      const progressPercent = totalItems > 0 
        ? Math.round(((completedTopics + completedQuestions) / totalItems) * 100) 
        : 0;

      return {
        totalTopics: totalTopicsCount,
        completedTopics,
        inProgress: inProgressCount,
        bookmarked: bookmarksCount,
        completedQuestions,
        totalQuestions: totalQuestionsCount,
        progressPercent: Math.min(100, Math.max(0, progressPercent)),
        lastOpened: this.getLastOpenedTopic()
      };
    },

    // 8. Reset Progress
    resetAllProgress() {
      if (!storageAvailable) return;
      localStorage.removeItem(KEYS.COMPLETED_TOPICS);
      localStorage.removeItem(KEYS.BOOKMARKS);
      localStorage.removeItem(KEYS.INTERVIEW_STATUS);
      localStorage.removeItem(KEYS.INTERVIEW_NOTES);
      localStorage.removeItem(KEYS.QUIZ_SCORES);
      localStorage.removeItem(KEYS.RECENT_TOPICS);
    }
  };
})();

