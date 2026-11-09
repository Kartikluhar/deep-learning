/**
 * MLForge Interactive SQL Playground Component
 * Provides schema browsing, sample data viewing, query presets,
 * multi-line SQL editor with line numbers, execution timer,
 * table result rendering, query history, and database reset.
 */

window.MLForge = window.MLForge || {};
window.MLForge.sql = window.MLForge.sql || {};

MLForge.sql.playground = (function () {
  let activeTab = 'editor';
  let selectedTable = 'employees';

  const PRESET_QUERIES = [
    {
      name: "1. All Employees with Department Info (INNER JOIN)",
      sql: "SELECT \n  e.id, \n  e.first_name, \n  e.last_name, \n  d.department_name, \n  e.job_title, \n  e.salary\nFROM employees e\nINNER JOIN departments d ON e.department_id = d.id\nORDER BY e.salary DESC;"
    },
    {
      name: "2. Department Headcount & Average Salary (GROUP BY & HAVING)",
      sql: "SELECT \n  d.department_name,\n  COUNT(e.id) AS headcount,\n  ROUND(AVG(e.salary), 2) AS average_salary,\n  MAX(e.salary) AS peak_salary\nFROM departments d\nLEFT JOIN employees e ON d.id = e.department_id\nGROUP BY d.department_name\nHAVING COUNT(e.id) >= 2\nORDER BY average_salary DESC;"
    },
    {
      name: "3. Top 3 Highest Earners Per Department (WINDOW DENSE_RANK)",
      sql: "WITH DepartmentRanks AS (\n  SELECT \n    d.department_name,\n    e.first_name,\n    e.last_name,\n    e.salary,\n    DENSE_RANK() OVER (PARTITION BY e.department_id ORDER BY e.salary DESC) AS sal_rank\n  FROM employees e\n  JOIN departments d ON e.department_id = d.id\n)\nSELECT department_name, first_name, last_name, salary, sal_rank\nFROM DepartmentRanks\nWHERE sal_rank <= 2\nORDER BY department_name, sal_rank;"
    },
    {
      name: "4. Employees Earning More Than Company Average (SUBQUERY)",
      sql: "SELECT \n  first_name, \n  last_name, \n  salary,\n  (SELECT ROUND(AVG(salary), 2) FROM employees) AS company_avg,\n  salary - (SELECT AVG(salary) FROM employees) AS diff_from_avg\nFROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees)\nORDER BY salary DESC;"
    },
    {
      name: "5. Customer Lifetime Spending & Order Count (MULTI-JOIN)",
      sql: "SELECT \n  c.first_name,\n  c.last_name,\n  c.city,\n  COUNT(DISTINCT o.id) AS orders_count,\n  ROUND(SUM(oi.quantity * oi.unit_price), 2) AS total_spent\nFROM customers c\nJOIN orders o ON c.id = o.customer_id\nJOIN order_items oi ON o.id = oi.order_id\nGROUP BY c.id, c.first_name, c.last_name, c.city\nORDER BY total_spent DESC;"
    },
    {
      name: "6. Cumulative Running Revenue Chronology (WINDOW SUM)",
      sql: "SELECT \n  id AS order_id,\n  order_date,\n  total_amount,\n  SUM(total_amount) OVER (ORDER BY order_date, id) AS cumulative_revenue\nFROM orders\nORDER BY order_date, id;"
    },
    {
      name: "7. Organizational Reporting Chain (SELF JOIN)",
      sql: "SELECT \n  e.first_name AS employee,\n  e.job_title,\n  COALESCE(m.first_name, 'None (CEO / Director)') AS reports_to\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id\nORDER BY e.department_id, e.salary DESC;"
    },
    {
      name: "8. Query Plan Profiler (EXPLAIN ANALYZE)",
      sql: "EXPLAIN ANALYZE\nSELECT e.first_name, d.department_name, e.salary\nFROM employees e\nJOIN departments d ON e.department_id = d.id\nWHERE e.salary > 100000\nORDER BY e.salary DESC;"
    }
  ];

  function render(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const tables = MLForge.sql.engine.getTablesList();
    const currentSchema = MLForge.sql.engine.getTableSchema(selectedTable);

    container.innerHTML = `
      <div class="sql-playground-wrapper">
        <!-- Top Toolbar Header -->
        <div class="sql-pg-toolbar">
          <div class="sql-pg-toolbar-left">
            <div class="sql-badge-cyan" style="font-size: 0.75rem;">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
              <span>Relational SQL Engine (SQLite / ANSI Compatible)</span>
            </div>
            <span class="badge badge-emerald" style="font-size: 0.7rem;">In-Memory Sandbox Active</span>
          </div>

          <div class="sql-pg-toolbar-right">
            <select id="sql-pg-preset-select" class="sql-pg-select" title="Load Example Query">
              <option value="">⚡ Load Sample Query...</option>
              ${PRESET_QUERIES.map((p, idx) => `<option value="${idx}">${p.name}</option>`).join('')}
            </select>
            <button id="sql-pg-reset-db-btn" class="btn btn-secondary btn-sm" title="Reset all tables to fresh initial state">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        <!-- Main Playground Grid: Schema Sidebar + Query/Results Workspace -->
        <div class="sql-pg-grid">
          <!-- Left: Schema Browser -->
          <div class="sql-pg-sidebar">
            <div class="sql-pg-sidebar-header">
              <span style="font-weight: 600; font-size: 0.85rem; color: var(--text-main);">Database Tables (${tables.length})</span>
            </div>
            <div class="sql-pg-table-list">
              ${tables.map(t => `
                <div class="sql-pg-table-item ${t.name === selectedTable ? 'active' : ''}" data-table="${t.name}">
                  <div class="sql-pg-table-item-name">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                    <span>${t.name}</span>
                  </div>
                  <span class="sql-pg-row-count">${t.rowCount} rows</span>
                </div>
              `).join('')}
            </div>

            <!-- Table Schema Inspector Card -->
            <div class="sql-pg-schema-panel" id="sql-pg-schema-panel">
              ${renderSchemaInspector(currentSchema)}
            </div>
          </div>

          <!-- Right: Editor & Execution Workspace -->
          <div class="sql-pg-main">
            <!-- Editor Controls -->
            <div class="sql-editor-header">
              <div class="sql-editor-tabs">
                <button class="sql-tab-btn active" id="tab-btn-editor">SQL Query</button>
                <button class="sql-tab-btn" id="tab-btn-history">Saved &amp; Recent</button>
              </div>

              <div class="sql-editor-actions">
                <button class="btn btn-secondary btn-sm" id="sql-pg-clear-btn" title="Clear Editor">
                  Clear
                </button>
                <button class="btn btn-secondary btn-sm" id="sql-pg-copy-btn" title="Copy SQL">
                  Copy
                </button>
                <button class="btn btn-secondary btn-sm" id="sql-pg-save-btn" title="Save Query">
                  Save
                </button>
                <button class="btn btn-primary btn-sm" id="sql-pg-run-btn" style="background: var(--color-primary); color: white;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                  <span>Run Query (Ctrl+Enter)</span>
                </button>
              </div>
            </div>

            <!-- SQL Textarea Box -->
            <div class="sql-editor-container">
              <textarea id="sql-pg-editor-input" class="sql-pg-textarea" spellcheck="false" placeholder="Write your SQL query here...">${PRESET_QUERIES[0].sql}</textarea>
            </div>

            <!-- Results Section -->
            <div class="sql-results-container" id="sql-results-container">
              <div class="sql-results-header">
                <div class="sql-results-meta" id="sql-results-meta">
                  <span>Press <strong>Run Query</strong> or hit <strong>Ctrl + Enter</strong> to execute.</span>
                </div>
              </div>
              <div class="sql-results-body" id="sql-results-body">
                <!-- Dynamically rendered query output table -->
                <div class="sql-empty-state">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
                  <p>Ready to execute. Select a table on the left or click Run Query above.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    bindPlaygroundEvents(container);
    // Automatically run the first query on load
    runActiveQuery();
  }

  function renderSchemaInspector(schema) {
    if (!schema) return '<p style="font-size: 0.8rem; color: var(--text-muted);">No table selected.</p>';
    return `
      <div class="sql-schema-box">
        <div class="sql-schema-title">Schema: <code>${schema.name}</code> (${schema.rowCount} rows)</div>
        <div class="sql-schema-cols">
          ${schema.columns.map(c => `
            <div class="sql-schema-col-item">
              <div style="display: flex; align-items: center; gap: 0.35rem;">
                ${c.isPrimary ? '<span class="badge badge-emerald" style="font-size: 0.6rem; padding: 1px 4px;">PK</span>' : ''}
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-main);">${c.name}</span>
              </div>
              <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-muted);">${c.type}</span>
            </div>
          `).join('')}
        </div>
        <button class="btn btn-secondary btn-sm" id="sql-view-sample-data-btn" style="width: 100%; margin-top: 0.5rem; font-size: 0.75rem;" data-table="${schema.name}">
          Inspect First 10 Rows
        </button>
      </div>
    `;
  }

  function bindPlaygroundEvents(container) {
    // 1. Table selection in sidebar
    container.querySelectorAll('.sql-pg-table-item').forEach(el => {
      el.addEventListener('click', () => {
        container.querySelectorAll('.sql-pg-table-item').forEach(i => i.classList.remove('active'));
        el.classList.add('active');
        selectedTable = el.dataset.table;
        const schema = MLForge.sql.engine.getTableSchema(selectedTable);
        const schemaPanel = document.getElementById('sql-pg-schema-panel');
        if (schemaPanel) {
          schemaPanel.innerHTML = renderSchemaInspector(schema);
          bindSampleDataBtn(container);
        }
      });
    });

    bindSampleDataBtn(container);

    // 2. Preset query loader
    const presetSelect = document.getElementById('sql-pg-preset-select');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        const idx = e.target.value;
        if (idx !== '' && PRESET_QUERIES[idx]) {
          const editor = document.getElementById('sql-pg-editor-input');
          if (editor) {
            editor.value = PRESET_QUERIES[idx].sql;
            runActiveQuery();
          }
        }
      });
    }

    // 3. Reset database
    const resetBtn = document.getElementById('sql-pg-reset-db-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Reset database tables and sample records to initial state?')) {
          MLForge.sql.engine.resetDatabase();
          MLForge.ui.showToast('Database reset to fresh initial state.', 'success');
          render('content-area');
        }
      });
    }

    // 4. Run query button & keyboard shortcut (Ctrl+Enter)
    const runBtn = document.getElementById('sql-pg-run-btn');
    if (runBtn) {
      runBtn.addEventListener('click', runActiveQuery);
    }

    const editor = document.getElementById('sql-pg-editor-input');
    if (editor) {
      editor.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          runActiveQuery();
        }
      });
    }

    // 5. Clear editor button
    const clearBtn = document.getElementById('sql-pg-clear-btn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        if (editor) editor.value = '';
      });
    }

    // 6. Copy query button
    const copyBtn = document.getElementById('sql-pg-copy-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        if (editor && editor.value) {
          navigator.clipboard.writeText(editor.value).then(() => {
            MLForge.ui.showToast('SQL query copied to clipboard!', 'info');
          });
        }
      });
    }

    // 7. Save query button
    const saveBtn = document.getElementById('sql-pg-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        if (editor && editor.value.trim()) {
          const name = prompt('Enter a name for this saved query:', 'Custom Query');
          if (name) {
            MLForge.sql.storage.saveQuery(name, editor.value);
            MLForge.ui.showToast('Query saved to your favorites.', 'success');
          }
        }
      });
    }

    // 8. Tab switcher
    const tabEditor = document.getElementById('tab-btn-editor');
    const tabHistory = document.getElementById('tab-btn-history');
    if (tabEditor && tabHistory) {
      tabEditor.addEventListener('click', () => {
        tabEditor.classList.add('active');
        tabHistory.classList.remove('active');
        // Restore editor query
      });
      tabHistory.addEventListener('click', () => {
        tabHistory.classList.add('active');
        tabEditor.classList.remove('active');
        renderHistoryModal();
      });
    }
  }

  function bindSampleDataBtn(container) {
    const btn = container.querySelector('#sql-view-sample-data-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        const tbl = btn.dataset.table;
        const editor = document.getElementById('sql-pg-editor-input');
        if (editor) {
          editor.value = `SELECT * FROM ${tbl} LIMIT 10;`;
          runActiveQuery();
        }
      });
    }
  }

  function renderHistoryModal() {
    const list = MLForge.sql.storage.getSavedQueries();
    const resultsBody = document.getElementById('sql-results-body');
    const resultsMeta = document.getElementById('sql-results-meta');

    if (resultsMeta) {
      resultsMeta.innerHTML = `<span><strong>Saved Queries &amp; History (${list.length})</strong></span>`;
    }

    if (resultsBody) {
      if (list.length === 0) {
        resultsBody.innerHTML = `
          <div class="sql-empty-state">
            <p>No saved queries yet. Click <strong>Save</strong> above to bookmark important queries.</p>
          </div>
        `;
        return;
      }

      resultsBody.innerHTML = `
        <div class="sql-history-list">
          ${list.map(item => `
            <div class="sql-history-item">
              <div class="sql-history-item-header">
                <strong>${item.name}</strong>
                <span style="font-size: 0.7rem; color: var(--text-muted);">${item.created || ''}</span>
              </div>
              <pre class="sql-code-block" style="margin: 0.35rem 0; font-size: 0.8rem;">${item.sql}</pre>
              <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
                <button class="btn btn-secondary btn-sm sql-load-saved-btn" data-sql="${encodeURIComponent(item.sql)}">Load in Editor</button>
                <button class="btn btn-secondary btn-sm sql-del-saved-btn" data-id="${item.id}" style="color: var(--color-accent-rose);">Delete</button>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      resultsBody.querySelectorAll('.sql-load-saved-btn').forEach(b => {
        b.addEventListener('click', () => {
          const sql = decodeURIComponent(b.dataset.sql);
          const editor = document.getElementById('sql-pg-editor-input');
          if (editor) {
            editor.value = sql;
            document.getElementById('tab-btn-editor').click();
            runActiveQuery();
          }
        });
      });

      resultsBody.querySelectorAll('.sql-del-saved-btn').forEach(b => {
        b.addEventListener('click', () => {
          MLForge.sql.storage.deleteSavedQuery(b.dataset.id);
          renderHistoryModal();
        });
      });
    }
  }

  function runActiveQuery() {
    const editor = document.getElementById('sql-pg-editor-input');
    const resultsBody = document.getElementById('sql-results-body');
    const resultsMeta = document.getElementById('sql-results-meta');

    if (!editor || !resultsBody) return;
    const sql = editor.value.trim();

    if (!sql) {
      resultsBody.innerHTML = '<div class="sql-error-box">Please enter a SQL query to execute.</div>';
      return;
    }

    const result = MLForge.sql.engine.execute(sql);

    if (result.error) {
      if (resultsMeta) {
        resultsMeta.innerHTML = `<span style="color: var(--color-accent-rose); font-weight: 600;">Execution Error</span>`;
      }
      resultsBody.innerHTML = `
        <div class="sql-error-box">
          <div style="font-weight: 600; margin-bottom: 0.25rem;">⚠️ SQL Syntax or Execution Error:</div>
          <div>${result.error}</div>
        </div>
      `;
      return;
    }

    // Success: Render Result Table
    if (resultsMeta) {
      resultsMeta.innerHTML = `
        <span style="color: var(--color-accent-emerald); font-weight: 600;">✓ Query executed successfully</span>
        <span style="color: var(--text-muted); margin: 0 0.5rem;">•</span>
        <span>${result.rowCount} row${result.rowCount === 1 ? '' : 's'} returned</span>
        <span style="color: var(--text-muted); margin: 0 0.5rem;">•</span>
        <span>Execution Time: <strong>${result.executionTime} ms</strong></span>
      `;
    }

    if (!result.rows || result.rows.length === 0) {
      resultsBody.innerHTML = `
        <div class="sql-empty-state">
          <p>Query returned 0 rows (empty result set).</p>
        </div>
      `;
      return;
    }

    const columns = result.columns;
    resultsBody.innerHTML = `
      <div class="sql-table-wrapper">
        <table class="sql-result-table">
          <thead>
            <tr>
              <th style="width: 40px; text-align: center; color: var(--text-muted);">#</th>
              ${columns.map(col => `<th>${col}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${result.rows.map((row, rIdx) => `
              <tr>
                <td style="text-align: center; color: var(--text-muted); font-size: 0.75rem;">${rIdx + 1}</td>
                ${columns.map(col => {
                  const val = row[col];
                  let displayVal = val;
                  let cls = '';
                  if (val === null || val === undefined) {
                    displayVal = 'NULL';
                    cls = 'sql-cell-null';
                  } else if (typeof val === 'number') {
                    cls = 'sql-cell-num';
                  }
                  return `<td class="${cls}">${displayVal}</td>`;
                }).join('')}
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  return {
    render,
    runQuery: runActiveQuery
  };
})();

