/**
 * MLForge Data Science & Data Engineering Application Bootstrapper & Search Integrator
 * Populates sidebar syllabus accordion, registers global search keywords and aliases,
 * and maintains active learning stats.
 */

window.MLForge = window.MLForge || {};
window.MLForge.dsde = window.MLForge.dsde || {};

MLForge.dsde.app = (function () {

  function init() {
    initSidebarSyllabus();
    initOmnisearchIntegration();
    updateSidebarCounts();
  }

  function getAllTopics() {
    const ds = (MLForge.dsde.data && MLForge.dsde.data.dsTopics) ? MLForge.dsde.data.dsTopics : [];
    const de = (MLForge.dsde.data && MLForge.dsde.data.deTopics) ? MLForge.dsde.data.deTopics : [];
    return [...ds, ...de];
  }

  function initSidebarSyllabus() {
    const subnavContainer = document.getElementById('dsde-topics-subnav');
    const accordionBtn = document.getElementById('dsde-topics-accordion-btn');

    if (accordionBtn) {
      accordionBtn.addEventListener('click', () => {
        accordionBtn.classList.toggle('expanded');
        if (subnavContainer) {
          subnavContainer.classList.toggle('expanded');
          subnavContainer.classList.toggle('open');
        }
      });
    }

    if (subnavContainer) {
      const allTopics = getAllTopics();
      subnavContainer.innerHTML = allTopics.map(t => {
        const isDone = MLForge.dsde.storage ? MLForge.dsde.storage.isTopicCompleted(t.id) : false;
        const isDs = t.track === 'ds';
        return `
          <a href="#dsde/topic/${t.id}" class="sidebar-sub-item sidebar-dsde-sub-item" data-topic-id="${t.id}" id="dsde-subnav-${t.id}">
            <span style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 170px;">
              <span style="color: ${isDs ? '#14b8a6' : '#f97316'}; font-weight: 700; margin-right: 4px;">${isDs ? 'DS' : 'DE'}</span>
              ${t.title}
            </span>
            <span style="font-size: 0.65rem; color: ${isDone ? '#10b981' : 'var(--text-muted)'};">${isDone ? '✓' : t.readTime}</span>
          </a>
        `;
      }).join('');
    }
  }

  function updateSidebarCounts() {
    const allTopics = getAllTopics();
    allTopics.forEach(t => {
      const el = document.getElementById(`dsde-subnav-${t.id}`);
      if (el && MLForge.dsde.storage) {
        const isDone = MLForge.dsde.storage.isTopicCompleted(t.id);
        const timeSpan = el.querySelector('span:last-child');
        if (timeSpan) {
          timeSpan.textContent = isDone ? '✓' : t.readTime;
          timeSpan.style.color = isDone ? '#10b981' : 'var(--text-muted)';
        }
      }
    });
  }

  function initOmnisearchIntegration() {
    if (!MLForge.search) return;

    // Extend search aliases with Data Science & Data Engineering keywords
    const dsdeAliases = {
      'datascience': ['data science', 'ds', 'analytics', 'statistics', 'pandas', 'eda', 'numpy', 'scipy'],
      'dataengineering': ['data engineering', 'de', 'etl', 'elt', 'pipelines', 'airflow', 'spark', 'kafka', 'data warehouse', 'lakehouse'],
      'stats': ['statistics', 'mean', 'median', 'mode', 'variance', 'standard deviation', 'hypothesis testing', 'p-value', 't-test'],
      'pandas': ['dataframe', 'series', 'groupby', 'merge', 'cleaning', 'csv', 'data wrangling'],
      'numpy': ['arrays', 'ndarray', 'broadcasting', 'matrix math', 'dot product', 'linear algebra'],
      'eda': ['exploratory data analysis', 'univariate', 'bivariate', 'multivariate', 'distributions', 'correlations'],
      'visualization': ['matplotlib', 'seaborn', 'plotly', 'power bi', 'tableau', 'charts', 'heatmaps'],
      'airflow': ['orchestration', 'dags', 'tasks', 'operators', 'cron', 'workflow', 'scheduling'],
      'spark': ['apache spark', 'pyspark', 'big data', 'distributed compute', 'rdd', 'dataframe', 'spark sql'],
      'kafka': ['apache kafka', 'event streaming', 'real-time', 'pub sub', 'topics', 'partitions', 'brokers'],
      'etl': ['extract transform load', 'elt', 'data pipeline', 'cdc', 'idempotency', 'ingestion'],
      'lakehouse': ['data lake', 'lakehouse', 'apache iceberg', 'delta lake', 'medallion', 'bronze silver gold', 's3'],
      'dwh': ['data warehouse', 'star schema', 'snowflake schema', 'fact table', 'dimension table', 'scd']
    };

    if (MLForge.search.ALIASES) {
      Object.assign(MLForge.search.ALIASES, dsdeAliases);
    }

    const originalBuildIndex = MLForge.search.buildIndex;
    MLForge.search.buildIndex = function () {
      if (typeof originalBuildIndex === 'function') {
        originalBuildIndex.apply(this, arguments);
      }

      // 1. Index All Topics
      const allTopics = getAllTopics();
      allTopics.forEach(t => {
        const isDs = t.track === 'ds';
        this.addItem({
          id: `dsde-topic-${t.id}`,
          title: `${isDs ? 'Data Science' : 'Data Engineering'}: ${t.title}`,
          desc: t.summary,
          category: isDs ? 'Data Science Track' : 'Data Engineering Track',
          link: `#dsde/topic/${t.id}`
        });
      });

      // 2. Index Calculators
      const dsdeCalcs = [
        { id: 'dsde-calc-mean', title: 'Mean & Average Calculator', desc: 'Step-by-step arithmetic mean calculator', category: 'DS & DE Calculators', link: '#dsde/calculators' },
        { id: 'dsde-calc-median', title: 'Median Calculator', desc: 'Finds middle value robust to outliers', category: 'DS & DE Calculators', link: '#dsde/calculators' },
        { id: 'dsde-calc-stddev', title: 'Standard Deviation & Variance Calculator', desc: 'Sample and population dispersion metrics', category: 'DS & DE Calculators', link: '#dsde/calculators' },
        { id: 'dsde-calc-corr', title: 'Pearson Correlation Calculator', desc: 'Calculate linear correlation r and R²', category: 'DS & DE Calculators', link: '#dsde/calculators' },
        { id: 'dsde-calc-zscore', title: 'Z-Score & Outlier Calculator', desc: 'Calculate standardized scores and outlier thresholds', category: 'DS & DE Calculators', link: '#dsde/calculators' },
        { id: 'dsde-calc-size', title: 'Data Size & Transfer Speed Calculator', desc: 'Estimate cloud network transfer durations', category: 'DS & DE Calculators', link: '#dsde/calculators' },
        { id: 'dsde-calc-json', title: 'JSON Validator & Formatter Tool', desc: 'Format, validate and minify JSON payloads', category: 'DS & DE Calculators', link: '#dsde/calculators' },
        { id: 'dsde-calc-csv', title: 'CSV Schema & Null Analyzer Tool', desc: 'Infer column types and missing percentages', category: 'DS & DE Calculators', link: '#dsde/calculators' }
      ];

      dsdeCalcs.forEach(c => this.addItem(c));

      // 3. Index Tools Reference
      if (MLForge.dsde.data && MLForge.dsde.data.tools) {
        MLForge.dsde.data.tools.forEach(tool => {
          this.addItem({
            id: `dsde-tool-${tool.id}`,
            title: `Tool: ${tool.name} (${tool.category})`,
            desc: tool.summary,
            category: 'DS Tools Directory',
            link: `#dsde/tools`
          });
        });
      }

      // 4. Index Real-World Projects
      if (MLForge.dsde.data && MLForge.dsde.data.projects) {
        MLForge.dsde.data.projects.forEach(p => {
          this.addItem({
            id: `dsde-proj-${p.id}`,
            title: `Project: ${p.title} (${p.tier})`,
            desc: p.summary,
            category: p.track === 'ds' ? 'Data Science Projects' : 'Data Engineering Projects',
            link: `#dsde/projects`
          });
        });
      }

      // 5. Index Career Roadmaps
      if (MLForge.dsde.data && MLForge.dsde.data.roadmaps) {
        MLForge.dsde.data.roadmaps.forEach(r => {
          this.addItem({
            id: `dsde-roadmap-${r.id}`,
            title: `Career Roadmap: ${r.title}`,
            desc: r.overview,
            category: 'Career Roadmaps',
            link: `#dsde/roadmaps`
          });
        });
      }
    };

    // Rebuild search index to include newly loaded items
    if (typeof MLForge.search.buildIndex === 'function') {
      MLForge.search.buildIndex();
    }
  }

  return {
    init,
    updateSidebarCounts
  };
})();
