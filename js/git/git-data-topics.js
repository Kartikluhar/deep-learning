/**
 * MLForge Git & GitHub Curriculum Topics Database
 * Comprehensive guides in simple English with real-life analogies, step-by-step procedures,
 * security checklists, and clear workflow diagrams.
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};
window.MLForge.git.data = window.MLForge.git.data || {};

MLForge.git.data.topics = [
  {
    id: "fundamentals",
    title: "Git Fundamentals",
    stage: "Stage 1",
    category: "Concepts",
    readTime: "7 min",
    summary: "Understand what Git and GitHub are, why developers and companies rely on them, and how version control works through simple everyday analogies.",
    content: `
      <h2>1. What is Git?</h2>
      <p>Git is a free, open-source tool that keeps track of every single change you make to your code over time. Think of it like a <strong>supercharged "Save" and "Undo" system</strong> for your entire project folder.</p>
      <p>Instead of manually making folders like <code>project_v1</code>, <code>project_v2_final</code>, and <code>project_really_final</code>, Git records an exact snapshot of your code whenever you ask it to. You can easily see what changed yesterday, three weeks ago, or even two years ago, and jump back to any previous state whenever something breaks.</p>

      <h2>2. What is GitHub?</h2>
      <p><strong>Git and GitHub are NOT the same thing.</strong></p>
      <ul>
        <li><strong>Git:</strong> A tool that runs locally on your computer to track file history. You don't even need an internet connection to use Git.</li>
        <li><strong>GitHub:</strong> A website in the cloud where you can upload and store copies of your Git repositories. It lets developers back up their work online, collaborate with team members across the globe, review code, and manage software projects.</li>
      </ul>
      <div class="card" style="padding: 1rem; border-left: 3px solid var(--color-accent-violet); margin: 1rem 0;">
        <strong>Simple Analogy:</strong> Think of <em>Git</em> like a camera that takes photos of your code snapshots on your computer. <em>GitHub</em> is like Instagram or Google Drive where you upload and share those photos with the world.
      </div>

      <h2>3. The 4 Essential Git Areas</h2>
      <p>Git organizes your files across four distinct zones as changes travel from your editor to the cloud:</p>
      
      <div class="git-terminal" style="margin: 1.25rem 0;">
        <div class="git-terminal-header">
          <div class="git-terminal-dots"><span class="git-terminal-dot red"></span><span class="git-terminal-dot yellow"></span><span class="git-terminal-dot green"></span></div>
          <div class="git-terminal-title">The Git Lifecycle Pipeline</div>
        </div>
        <div class="git-terminal-body">[ 1. Working Directory ]  ---( git add )--->  [ 2. Staging Area (Index) ]
          │                                                    │
     (Direct edits)                                    (Preparing snapshot)
          │                                                    │
          ▼                                                    ▼
[ 4. Remote (GitHub) ]  <---( git push )---  [ 3. Local Repository ]</div>
      </div>

      <ol>
        <li><strong>Working Directory:</strong> The actual files and folders you see and edit in your code editor (e.g. VS Code).</li>
        <li><strong>Staging Area (Index):</strong> A preparation area. You choose exactly which changed files should go into your next snapshot.</li>
        <li><strong>Local Repository (<code>.git</code>):</strong> The local permanent database on your computer storing all committed snapshots.</li>
        <li><strong>Remote Repository:</strong> The online copy stored on a remote server like GitHub.</li>
      </ol>

      <h2>4. Key Vocabulary in Plain English</h2>
      <ul>
        <li><strong>Repository (Repo):</strong> A project folder that Git is tracking.</li>
        <li><strong>Commit:</strong> A permanent saved snapshot of your staged files accompanied by a message explaining what changed.</li>
        <li><strong>Branch:</strong> An independent timeline or parallel workspace where you can safely build features without touching the main stable code.</li>
        <li><strong>HEAD:</strong> A pointer indicating which branch and commit your code editor is currently showing.</li>
        <li><strong>Clone:</strong> Downloading a full copy of an existing GitHub repository to your computer.</li>
        <li><strong>Pull:</strong> Downloading and merging the newest changes from GitHub into your local files.</li>
        <li><strong>Push:</strong> Uploading your committed local changes to GitHub.</li>
      </ul>
    `
  },
  {
    id: "installation",
    title: "Installation & Setup",
    stage: "Stage 2",
    category: "Setup",
    readTime: "5 min",
    summary: "Install Git on Windows, macOS, or Linux, verify your installation, and choose the best terminal environment.",
    content: `
      <h2>1. Installing Git by Operating System</h2>

      <h3>On Windows</h3>
      <ol>
        <li>Download the official installer from <a href="https://git-scm.com/download/win" target="_blank" rel="noopener">git-scm.com</a>.</li>
        <li>Run the <code>.exe</code> installer. During setup:
          <ul>
            <li>Choose <strong>Git Bash</strong> as part of the installation (recommended Unix-like shell for Windows).</li>
            <li>Select <strong>VS Code as Git's default editor</strong> if prompted.</li>
            <li>Leave default branch set to <strong>main</strong>.</li>
            <li>Select <strong>Git from the command line and also from 3rd-party software</strong>.</li>
          </ul>
        </li>
      </ol>

      <h3>On macOS</h3>
      <p>If you have Homebrew installed, run:</p>
      <div class="git-terminal"><div class="git-terminal-body">brew install git</div></div>
      <p>Alternatively, open Terminal and type <code>git --version</code>. If not installed, macOS will prompt you to install Apple's Command Line Developer Tools automatically.</p>

      <h3>On Linux (Ubuntu / Debian)</h3>
      <div class="git-terminal"><div class="git-terminal-body">sudo apt update
sudo apt install git</div></div>

      <h2>2. Verifying the Installation</h2>
      <p>Open your terminal (PowerShell, Command Prompt, macOS Terminal, or Git Bash) and run:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git --version
git version 2.45.0</div></div>
      <p>If you see a version number output, Git is properly installed and added to your system PATH.</p>

      <h2>3. Choosing Your Terminal on Windows</h2>
      <ul>
        <li><strong>Git Bash (Recommended):</strong> Provides a Linux-like bash environment with standard Unix utilities (<code>ls</code>, <code>grep</code>, <code>cat</code>, <code>ssh</code>) directly on Windows.</li>
        <li><strong>PowerShell:</strong> Excellent modern Windows shell. Git commands work natively inside PowerShell.</li>
        <li><strong>VS Code Integrated Terminal:</strong> Press <kbd>Ctrl + \`</kbd> inside VS Code. You can select either Git Bash or PowerShell as your default profile.</li>
      </ul>
    `
  },
  {
    id: "configuration",
    title: "Git Configuration",
    stage: "Stage 3",
    category: "Setup",
    readTime: "6 min",
    summary: "Configure your author name, email address, default branch, and understand Git configuration levels.",
    content: `
      <h2>1. Setting Up Your Identity</h2>
      <p>Every Git commit records the author's name and email address. You must set these before making your first commit:</p>

      <div class="git-terminal">
        <div class="git-terminal-body"><span class="git-prompt">$</span>git config --global user.name "Alex Developer"
<span class="git-prompt">$</span>git config --global user.email "alex@example.com"
<span class="git-prompt">$</span>git config --global init.defaultBranch main</div>
      </div>

      <div class="git-warning-box">
        ⚠️ <strong>Public Email Privacy Notice:</strong> The email you configure here will be permanently embedded in the public commit history of any repository you push to GitHub. If you want to keep your personal email private, GitHub provides a free noreply address (e.g. <code>ID+username@users.noreply.github.com</code>) under GitHub Settings -> Emails -> "Keep my email addresses private".
      </div>

      <h2>2. Understanding Git Configuration Levels</h2>
      <p>Git allows settings at three distinct scopes:</p>
      <table class="table" style="width: 100%; font-size: 0.85rem; margin: 1rem 0;">
        <thead>
          <tr style="text-align: left;">
            <th>Level</th>
            <th>Flag</th>
            <th>Location</th>
            <th>Scope</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>System</strong></td>
            <td><code>--system</code></td>
            <td><code>/etc/gitconfig</code></td>
            <td>Applies to all users on this entire operating system.</td>
          </tr>
          <tr>
            <td><strong>Global</strong></td>
            <td><code>--global</code></td>
            <td><code>~/.gitconfig</code></td>
            <td>Applies to all repositories for your current logged-in user account.</td>
          </tr>
          <tr>
            <td><strong>Local</strong></td>
            <td><code>--local</code></td>
            <td><code>.git/config</code></td>
            <td>Applies ONLY to this single specific repository (overrides global).</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Verifying Your Configuration</h2>
      <div class="git-terminal">
        <div class="git-terminal-body"><span class="git-prompt">$</span>git config --list --show-origin</div>
      </div>
      <p>This command prints every configured setting and tells you exactly which configuration file that setting was loaded from.</p>
    `
  },
  {
    id: "create-repo",
    title: "Creating a Repository",
    stage: "Stage 4",
    category: "Workflows",
    readTime: "8 min",
    summary: "Step-by-step walkthrough of initializing a local repository, staging files, creating your first commit, and pushing to GitHub.",
    content: `
      <h2>Complete Walkthrough: From Local Folder to GitHub</h2>

      <h3>Step 1: Open Your Project in VS Code</h3>
      <p>Open VS Code, choose <strong>File -> Open Folder</strong>, and select your project directory (e.g. <code>my-web-app</code>).</p>
      <p>Open the integrated terminal by pressing <kbd>Ctrl + \`</kbd>.</p>

      <h3>Step 2: Initialize Git</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git init</div></div>
      <p>Git creates the hidden <code>.git/</code> database inside your folder.</p>

      <h3>Step 3: Create a <code>.gitignore</code> File</h3>
      <p>Before adding any files, create a file named exactly <code>.gitignore</code> in the root folder. List files and folders that should NEVER be tracked:</p>
      <div class="git-terminal"><div class="git-terminal-body">.env
node_modules/
__pycache__/
*.log
.DS_Store</div></div>

      <h3>Step 4: Check Untracked Files</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git status</div></div>

      <h3>Step 5: Stage and Commit</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git add .
<span class="git-prompt">$</span>git commit -m "Initial commit: Set up project structure"</div></div>

      <h3>Step 6: Create an Empty Repository on GitHub</h3>
      <ol>
        <li>Go to <a href="https://github.com/new" target="_blank" rel="noopener">github.com/new</a>.</li>
        <li>Enter a repository name (e.g. <code>my-web-app</code>).</li>
        <li>Leave <strong>"Add a README file" UNCHECKED</strong> (since you already have local files).</li>
        <li>Click <strong>Create repository</strong>.</li>
        <li>Copy the repository URL shown on screen (e.g. <code>https://github.com/username/my-web-app.git</code>).</li>
      </ol>

      <h3>Step 7: Link and Push to GitHub</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git branch -M main
<span class="git-prompt">$</span>git remote add origin https://github.com/username/my-web-app.git
<span class="git-prompt">$</span>git push -u origin main</div></div>

      <p>Refresh your GitHub repository in your browser — your files and initial commit are now live!</p>
    `
  },
  {
    id: "upload-new",
    title: "Uploading a New Project",
    stage: "Stage 5",
    category: "Workflows",
    readTime: "7 min",
    summary: "Best practices when uploading new code to GitHub, selecting the right .gitignore rules, and safeguarding secrets.",
    content: `
      <h2>Uploading Code Safely Without Exposing Secrets</h2>
      <p>Uploading a project to GitHub is straightforward, but beginner developers frequently make dangerous mistakes like committing database passwords, secret API keys, or massive virtual environments.</p>

      <h2>The Pre-Push Safety Checklist</h2>
      <div class="card" style="padding: 1.25rem; margin: 1rem 0; border: 1px solid var(--border-card);">
        <ul style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.875rem;">
          <li>✅ <strong>Check for <code>.env</code>:</strong> Does your project use an environment file containing API keys or database connection strings? Ensure <code>.env</code> is listed in <code>.gitignore</code>!</li>
          <li>✅ <strong>Check dependencies:</strong> Ensure <code>node_modules/</code> or <code>venv/</code> are ignored. Others should install them using <code>npm install</code> or <code>pip install -r requirements.txt</code>.</li>
          <li>✅ <strong>Run <code>git status</code> before <code>git commit</code>:</strong> Inspect every green file in the staging list. If you see credentials or build folders, stop and unstage them immediately.</li>
          <li>✅ <strong>Add a clear README.md:</strong> Document what your project does, how to install dependencies, and how to start the app.</li>
        </ul>
      </div>

      <h2>What to do if GitHub Already Initialized with a README</h2>
      <p>If you checked "Add a README" on GitHub when creating the repo, GitHub will have 1 commit that your local project doesn't have. If you run <code>git push</code>, it will be rejected. Here is the safe fix:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git remote add origin https://github.com/username/my-project.git
<span class="git-prompt">$</span>git pull origin main --allow-unrelated-histories
<span class="git-prompt">$</span>git push -u origin main</div></div>
    `
  },
  {
    id: "push-existing",
    title: "Pushing an Existing Project",
    stage: "Stage 6",
    category: "Workflows",
    readTime: "7 min",
    summary: "How to handle pushing projects that already have local Git history or pre-existing remote URLs.",
    content: `
      <h2>Handling Projects with Existing Git History</h2>
      <p>Sometimes you already have a folder that has been using Git for days or months locally, and you now want to publish it to a fresh GitHub repository.</p>

      <h3>Step 1: Inspect Current Remotes</h3>
      <p>Always inspect if an old remote is already configured:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git remote -v</div></div>

      <h3>Situation 1: No Remote Exists</h3>
      <p>If the output is blank, you can safely connect your new GitHub repo:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git remote add origin https://github.com/username/new-repo.git
<span class="git-prompt">$</span>git push -u origin main</div></div>

      <h3>Situation 2: 'origin' Already Points to an Old URL</h3>
      <p>If <code>git remote -v</code> shows an old repository URL, do NOT use <code>git remote add</code> (it will throw <code>fatal: remote origin already exists</code>). Instead, update the URL:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git remote set-url origin https://github.com/username/new-repo.git
<span class="git-prompt">$</span>git push -u origin main</div></div>

      <h3>Situation 3: You Want to Keep Both Remotes</h3>
      <p>You can give your new remote a different name (e.g. <code>backup</code> or <code>github</code>):</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git remote add github https://github.com/username/new-repo.git
<span class="git-prompt">$</span>git push -u github main</div></div>
    `
  },
  {
    id: "cloning",
    title: "Cloning & Downloading Projects",
    stage: "Stage 7",
    category: "Workflows",
    readTime: "6 min",
    summary: "How to clone repositories from GitHub, set up dependencies, and start contributing.",
    content: `
      <h2>Cloning a Repository</h2>
      <p>Cloning downloads a full working copy of a project, including all branches, tags, and complete historical commits from GitHub onto your machine.</p>

      <div class="git-terminal">
        <div class="git-terminal-body"><span class="git-prompt">$</span>git clone https://github.com/owner/repository.git
<span class="git-prompt">$</span>cd repository</div>
      </div>

      <h2>Installing Project Dependencies</h2>
      <p>Source repositories on GitHub rarely contain installed dependency libraries because those are excluded in <code>.gitignore</code>. After cloning, you must install dependencies based on the project language:</p>

      <table class="table" style="width: 100%; font-size: 0.85rem; margin: 1rem 0;">
        <thead>
          <tr style="text-align: left;">
            <th>Ecosystem</th>
            <th>Manifest File</th>
            <th>Installation Command</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Node.js / React / Vue</strong></td>
            <td><code>package.json</code></td>
            <td><code>npm install</code> or <code>pnpm install</code></td>
          </tr>
          <tr>
            <td><strong>Python</strong></td>
            <td><code>requirements.txt</code></td>
            <td><code>pip install -r requirements.txt</code></td>
          </tr>
          <tr>
            <td><strong>Python (Poetry / UV)</strong></td>
            <td><code>pyproject.toml</code></td>
            <td><code>poetry install</code> or <code>uv sync</code></td>
          </tr>
          <tr>
            <td><strong>Rust</strong></td>
            <td><code>Cargo.toml</code></td>
            <td><code>cargo build</code></td>
          </tr>
        </tbody>
      </table>

      <h2>Checking Branches After Cloning</h2>
      <p>By default, Git checks out the main default branch. To inspect all available remote branches:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git branch -a</div></div>
      <p>To switch to an existing remote branch and start working on it:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git switch feature/dark-mode</div></div>
    `
  },
  {
    id: "working-with-code",
    title: "Working with Existing Code",
    stage: "Stage 8",
    category: "Workflows",
    readTime: "7 min",
    summary: "Master the standard daily development cycle: pulling updates, branching, making edits, and committing.",
    content: `
      <h2>The Professional Developer Daily Loop</h2>
      <p>In every professional software company, developers follow a clean, repeatable routine to avoid merge conflicts and keep code quality high:</p>

      <h3>1. Start of Day: Update Your Local Main Branch</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git switch main
<span class="git-prompt">$</span>git pull --ff-only origin main</div></div>

      <h3>2. Create a Focused Branch for Your Task</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git switch -c feature/add-csv-export</div></div>

      <h3>3. Write Code and Review Diffs</h3>
      <p>After editing files in your editor, review your progress:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git status
<span class="git-prompt">$</span>git diff</div></div>

      <h3>4. Stage and Commit in Small, Meaningful Units</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git add src/exporter.py
<span class="git-prompt">$</span>git commit -m "Implement CSV serialization for metrics"</div></div>

      <h3>5. Push Branch to GitHub</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git push -u origin feature/add-csv-export</div></div>
    `
  },
  {
    id: "branches",
    title: "Git Branches Explained Properly",
    stage: "Stage 9",
    category: "Branches",
    readTime: "8 min",
    summary: "Learn what branches actually are under the hood, how pointers move, and standard branch naming conventions.",
    content: `
      <h2>What is a Branch?</h2>
      <p>Many beginners imagine that creating a branch copies the entire project folder into a separate directory. <strong>It does not!</strong></p>
      <p>In Git, a branch is simply a tiny <strong>41-byte text pointer</strong> containing the 40-character SHA-1 hash of a commit. When you commit, the branch pointer simply moves forward to the new commit. Because it is just a pointer, creating or switching branches in Git is practically instantaneous, whether your repository has 5 files or 50,000 files.</p>

      <h2>Branch Pointer Diagram</h2>
      <div class="git-terminal">
        <div class="git-terminal-body">C1 <--- C2 <--- C3 (main)
                 ▲
                 │
                 └── C4 <--- C5 (feature/login) [HEAD]</div>
      </div>
      <p>In this diagram, <code>HEAD</code> is pointing to <code>feature/login</code>, meaning any new commit you make will attach to C5 and advance the <code>feature/login</code> pointer, leaving <code>main</code> untouched at C3.</p>

      <h2>Branch Naming Conventions in Companies</h2>
      <p>Professional teams use structured prefixes separated by slashes to organize hundreds of active branches:</p>
      <ul>
        <li><code>feature/&lt;ticket-or-feature&gt;</code>: e.g. <code>feature/auth-oauth2</code></li>
        <li><code>fix/&lt;bug-name&gt;</code> or <code>bugfix/&lt;issue&gt;</code>: e.g. <code>fix/table-sorting-overflow</code></li>
        <li><code>hotfix/&lt;critical-prod-bug&gt;</code>: e.g. <code>hotfix/payment-gateway-timeout</code></li>
        <li><code>refactor/&lt;module&gt;</code>: e.g. <code>refactor/user-service-db-calls</code></li>
        <li><code>docs/&lt;topic&gt;</code>: e.g. <code>docs/api-v2-endpoints</code></li>
      </ul>
    `
  },
  {
    id: "merging-rebasing",
    title: "Merging and Rebasing",
    stage: "Stage 10",
    category: "Branches",
    readTime: "8 min",
    summary: "Compare Fast-Forward Merges, 3-Way Merge Commits, and Rebase. Know exactly when to use each.",
    content: `
      <h2>Merging vs. Rebasing</h2>
      <p>Both <code>git merge</code> and <code>git rebase</code> integrate changes from one branch into another, but they produce very different commit histories.</p>

      <h2>Option 1: Merge (Preserves Full History)</h2>
      <p>Merging takes the commits from your feature branch and joins them into the target branch. If histories diverged, it creates a special <strong>Merge Commit</strong> with two parent commits.</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git switch main
<span class="git-prompt">$</span>git merge feature/auth</div></div>
      <ul>
        <li><strong>Pros:</strong> 100% faithful historical record; shows exactly when and how branches existed.</li>
        <li><strong>Cons:</strong> In large teams with many concurrent features, history can look like a complex tangled subway map ("merge bubbles").</li>
      </ul>

      <h2>Option 2: Rebase (Linear, Clean History)</h2>
      <p>Rebasing takes your feature commits and replays them one-by-one on top of the tip of <code>main</code>, as if you had just written them moments ago.</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git switch feature/auth
<span class="git-prompt">$</span>git rebase main</div></div>
      <ul>
        <li><strong>Pros:</strong> Creates a perfectly straight, linear history with zero unnecessary merge commits. Very easy to read with <code>git log</code>.</li>
        <li><strong>Cons:</strong> Rewrites commit hashes. If conflicts occur, you must resolve them commit by commit.</li>
      </ul>

      <div class="git-danger-box">
        🚨 <strong>The Golden Rule of Rebasing:</strong> NEVER rebase a public branch that has been pushed to GitHub and is being used by other developers (like <code>main</code> or <code>develop</code>). Only rebase your own private local feature branches before opening a Pull Request!
      </div>
    `
  },
  {
    id: "merge-conflicts",
    title: "Merge Conflicts",
    stage: "Stage 11",
    category: "Troubleshooting",
    readTime: "9 min",
    summary: "Demystify merge conflicts: why they happen, how to read conflict markers, and how to resolve them like a pro.",
    content: `
      <h2>What Causes a Merge Conflict?</h2>
      <p>Git is remarkably smart at combining changes automatically when two developers edit different files, or even different parts of the same file. However, if two branches modify <strong>the exact same line of code</strong> in different ways, Git stops and says: <em>"I don't know which person's change is correct. A human must decide."</em></p>

      <h2>How Conflict Markers Look in Your Code</h2>
      <p>When a conflict occurs, Git writes conflict markers directly into the file:</p>

      <div class="git-terminal">
        <div class="git-terminal-body"><span class="git-comment"><<<<<<< HEAD (Current change on active branch)</span>
<span class="git-diff-del">const timeout = 5000; // 5 seconds</span>
<span class="git-comment">======= (Divider)</span>
<span class="git-diff-add">const timeout = 10000; // 10 seconds</span>
<span class="git-comment">>>>>>>> feature/long-timeout (Incoming change from other branch)</span></div>
      </div>

      <h2>How to Resolve a Conflict Step-by-Step</h2>
      <ol>
        <li>Open the conflicted file in VS Code. VS Code highlights conflicts with quick buttons: <strong>Accept Current Change</strong>, <strong>Accept Incoming Change</strong>, or <strong>Accept Both</strong>.</li>
        <li>Decide what the final code should actually be. You can pick one side or manually edit the code to blend both ideas.</li>
        <li><strong>Delete all conflict markers</strong> (<code><<<<<<<</code>, <code>=======</code>, <code>>>>>>>></code>).</li>
        <li>Save the file and test that your application compiles and runs without syntax errors.</li>
        <li>Stage the resolved file: <code>git add &lt;file&gt;</code>.</li>
        <li>Finalize the merge: <code>git commit</code> (Git auto-generates a merge message).</li>
      </ol>

      <h2>How to Abort if You Get Stuck</h2>
      <p>If conflicts become too confusing and you want to cleanly cancel the merge and return to where you were:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git merge --abort</div></div>
    `
  },
  {
    id: "collaboration",
    title: "GitHub Collaboration",
    stage: "Stage 12",
    category: "Collaboration",
    readTime: "8 min",
    summary: "How engineering teams work together on GitHub: organizations, forks, permissions, and branch protection.",
    content: `
      <h2>Collaborating on GitHub</h2>
      <p>When multiple developers work on software, team access is organized through distinct GitHub structures:</p>

      <h3>1. Clone vs. Fork</h3>
      <ul>
        <li><strong>Clone:</strong> Downloading a repository where you have direct write (push) access. Common in company internal repositories.</li>
        <li><strong>Fork:</strong> Creating a personal copy of someone else's public repository under your own GitHub account. You push to your fork, then submit a Pull Request back to the original project. Standard for open-source contributions.</li>
      </ul>

      <h3>2. Protected Branches</h3>
      <p>In professional teams, the <code>main</code> branch is typically <strong>protected</strong>. This means:</p>
      <ul>
        <li>Direct pushes to <code>main</code> are blocked.</li>
        <li>Changes can only be merged via an approved Pull Request.</li>
        <li>At least 1 or 2 senior teammates must submit an approving review.</li>
        <li>All automated CI test suites must pass successfully.</li>
      </ul>

      <h3>3. <code>CODEOWNERS</code> File</h3>
      <p>You can create a <code>.github/CODEOWNERS</code> file to automatically request reviews from specific engineers when files in their domain are modified:</p>
      <div class="git-terminal"><div class="git-terminal-body"># Frontend leads review UI changes
/src/components/   @sarah-chen @alex-dev

# Security team reviews auth logic
/src/auth/         @security-lead</div></div>
    `
  },
  {
    id: "pull-requests",
    title: "Pull Requests & Code Reviews",
    stage: "Stage 13",
    category: "Collaboration",
    readTime: "9 min",
    summary: "The 17-step lifecycle of professional pull requests, writing clear descriptions, responding to reviews, and merge strategies.",
    content: `
      <h2>What is a Pull Request (PR)?</h2>
      <p>A Pull Request is not a Git command; it is a GitHub feature. A PR announces: <em>"I have finished my feature on this branch. Please review my code, discuss improvements, and pull it into main."</em></p>

      <h2>Writing a Great Pull Request Description</h2>
      <div class="card" style="padding: 1rem; margin: 1rem 0; font-family: var(--font-mono); font-size: 0.8rem; background: var(--bg-code);">
        ### Summary of Changes<br>
        - Added email format validation using regex on registration form.<br>
        - Added unit tests covering valid, invalid, and edge-case inputs.<br>
        - Resolves issue #42.<br><br>
        ### Testing Done<br>
        - Tested manually in Chrome and Firefox.<br>
        - Ran test suite: <code>npm test</code> -> 24 passing tests.<br><br>
        ### Screenshots<br>
        [Attached screenshot of new error message UI]
      </div>

      <h2>Three Ways to Merge a PR on GitHub</h2>
      <ul>
        <li><strong>Create a Merge Commit:</strong> Retains all individual commits and adds a merge commit. Best for major releases.</li>
        <li><strong>Squash and Merge (Most Common in Companies):</strong> Combines all 10 or 20 small checkpoint commits on your branch into a single clean commit on <code>main</code>. Keeps the main history neat.</li>
        <li><strong>Rebase and Merge:</strong> Replays commits linearly onto <code>main</code> with no merge commit.</li>
      </ul>
    `
  },
  {
    id: "team-workflows",
    title: "Team Workflows & Strategies",
    stage: "Stage 14",
    category: "Company",
    readTime: "9 min",
    summary: "Compare GitHub Flow, Git Flow, and Trunk-Based Development to choose the right strategy for your team.",
    content: `
      <h2>Comparing Software Team Workflows</h2>
      <p>Different engineering teams structure their branches according to their release schedules and team sizes:</p>

      <table class="table" style="width: 100%; font-size: 0.85rem; margin: 1rem 0;">
        <thead>
          <tr style="text-align: left;">
            <th>Workflow</th>
            <th>Core Branches</th>
            <th>Best Suited For</th>
            <th>Trade-Offs</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>GitHub Flow</strong></td>
            <td><code>main</code>, feature branches</td>
            <td>Web apps, SaaS, startups deploying continuously to production.</td>
            <td>Simple and fast, but requires high test coverage since <code>main</code> is always deployable.</td>
          </tr>
          <tr>
            <td><strong>Trunk-Based</strong></td>
            <td><code>main</code> (trunk), short-lived branches (< 1-2 days)</td>
            <td>High-velocity engineering teams (Google, Netflix, Meta).</td>
            <td>Eliminates long-lived branch merge hell; requires feature flags for unfinished work.</td>
          </tr>
          <tr>
            <td><strong>Git Flow</strong></td>
            <td><code>main</code>, <code>develop</code>, <code>feature/*</code>, <code>release/*</code>, <code>hotfix/*</code></td>
            <td>Traditional versioned releases (desktop software, mobile apps, embedded systems).</td>
            <td>High control over release versions, but complex with high branch maintenance overhead.</td>
          </tr>
        </tbody>
      </table>
    `
  },
  {
    id: "issues-projects",
    title: "GitHub Issues & Projects",
    stage: "Stage 15",
    category: "Collaboration",
    readTime: "7 min",
    summary: "Track bugs, plan features, link PRs automatically, and organize sprints using GitHub Projects.",
    content: `
      <h2>Tracking Work with GitHub Issues</h2>
      <p>Issues are GitHub's built-in task tracking system. They allow teams to log bugs, request new features, and organize work.</p>

      <h2>Closing Issues Automatically via Pull Requests</h2>
      <p>You can automatically close an issue when your PR merges by including specific keywords in your PR description or commit message:</p>
      <div class="git-terminal"><div class="git-terminal-body">Closes #14
Fixes #89
Resolves #102</div></div>
      <p>When the PR is merged into <code>main</code>, GitHub automatically closes the corresponding issue and links the PR for historical traceability.</p>

      <h2>GitHub Projects (Kanban Boards)</h2>
      <p>GitHub Projects provides interactive Kanban boards with columns like <strong>Todo</strong>, <strong>In Progress</strong>, <strong>In Review</strong>, and <strong>Done</strong>. Cards move automatically as PRs open and close.</p>
    `
  },
  {
    id: "undoing-mistakes",
    title: "Undoing & Fixing Mistakes",
    stage: "Stage 16",
    category: "Troubleshooting",
    readTime: "10 min",
    summary: "The definitive guide to recovering from Git mistakes safely: uncommitted edits, staged files, wrong commits, and deleted branches.",
    content: `
      <h2>The Safe Git Undo Hierarchy</h2>
      <p>Choose the correct tool depending on where your mistake currently lives:</p>

      <h3>1. Mistake is uncommitted in Working Directory</h3>
      <p>To discard edits in a single file and revert to the last commit:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git restore &lt;file&gt;</div></div>

      <h3>2. Mistake was staged with <code>git add</code></h3>
      <p>To unstage a file without losing your edits on disk:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git restore --staged &lt;file&gt;</div></div>

      <h3>3. Mistake was committed locally (NOT yet pushed)</h3>
      <p>To undo the commit but keep all code changes staged in your editor:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git reset --soft HEAD~1</div></div>

      <h3>4. Mistake was ALREADY pushed to GitHub</h3>
      <p>To undo changes on a shared public branch safely without rewriting history:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git revert &lt;commit-hash&gt;
<span class="git-prompt">$</span>git push origin main</div></div>

      <h3>5. You accidentally deleted a branch or made a bad reset</h3>
      <p>Find the orphaned commit hash using the safety diary:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git reflog
<span class="git-prompt">$</span>git switch -c recovered-branch &lt;commit-hash-from-reflog&gt;</div></div>
    `
  },
  {
    id: "advanced",
    title: "Advanced Git Operations",
    stage: "Stage 17",
    category: "Advanced",
    readTime: "9 min",
    summary: "Master interactive rebasing, cherry-picking, git bisect for bug hunting, and git worktrees.",
    content: `
      <h2>1. Interactive Rebase (Squashing Commits)</h2>
      <p>Clean up messy commit histories before opening a PR:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git rebase -i HEAD~4</div></div>
      <p>In the text editor that opens, change <code>pick</code> to <code>squash</code> (or <code>s</code>) for all commits after the first one. Git combines them into a single clean commit.</p>

      <h2>2. Git Bisect (Automatic Bug Hunter)</h2>
      <p>Uses binary search through your commits to find which exact commit broke a feature:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git bisect start
<span class="git-prompt">$</span>git bisect bad HEAD        <span class="git-comment"># Current commit is broken</span>
<span class="git-prompt">$</span>git bisect good v1.2.0     <span class="git-comment"># v1.2.0 was working</span></div></div>
      <p>Git checks out midpoint commits automatically. Test each step, type <code>git bisect good</code> or <code>git bisect bad</code>, and Git finds the culprit in $\approx \log_2(N)$ steps!</p>

      <h2>3. Git Worktrees</h2>
      <p>Check out multiple branches at the same time into different folders on disk:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git worktree add ../hotfix-folder hotfix/login-bug</div></div>
    `
  },
  {
    id: "github-actions",
    title: "GitHub Actions & CI/CD",
    stage: "Stage 18",
    category: "DevOps",
    readTime: "9 min",
    summary: "Automate tests, linting, and builds on every push using GitHub Actions workflow files.",
    content: `
      <h2>What is CI/CD?</h2>
      <p><strong>Continuous Integration (CI)</strong> automatically runs tests and checks whenever code is pushed or a PR is opened. This catches bugs before they reach customers.</p>

      <h2>Structure of a GitHub Actions Workflow</h2>
      <p>Workflows are written in YAML and stored in the <code>.github/workflows/</code> directory of your repository:</p>

      <div class="git-terminal">
        <div class="git-terminal-header">
          <div class="git-terminal-dots"><span class="git-terminal-dot red"></span><span class="git-terminal-dot yellow"></span><span class="git-terminal-dot green"></span></div>
          <div class="git-terminal-title">.github/workflows/ci.yml</div>
        </div>
        <div class="git-terminal-body">name: Automated CI Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'

      - name: Install dependencies
        run: |
          python -m pip install --upgrade pip
          pip install -r requirements.txt

      - name: Run test suite
        run: pytest</div>
      </div>
    `
  },
  {
    id: "releases-tags",
    title: "Releases and Tags",
    stage: "Stage 19",
    category: "DevOps",
    readTime: "6 min",
    summary: "Mark release milestones with annotated tags, publish GitHub Releases, and follow Semantic Versioning.",
    content: `
      <h2>Semantic Versioning (SemVer)</h2>
      <p>Professional software releases follow the format <code>vMAJOR.MINOR.PATCH</code> (e.g. <code>v2.1.4</code>):</p>
      <ul>
        <li><strong>MAJOR (v2.0.0):</strong> Incompatible, breaking API changes.</li>
        <li><strong>MINOR (v1.3.0):</strong> New features added in a backward-compatible manner.</li>
        <li><strong>PATCH (v1.2.1):</strong> Backward-compatible bug fixes and security patches.</li>
      </ul>

      <h2>Creating and Pushing Annotated Tags</h2>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git tag -a v1.0.0 -m "Release v1.0.0: Initial production release"
<span class="git-prompt">$</span>git push origin v1.0.0</div></div>

      <h2>GitHub Releases</h2>
      <p>On GitHub, navigate to <strong>Releases -> Draft a new release</strong>, select your tag <code>v1.0.0</code>, and paste your release notes / changelog.</p>
    `
  },
  {
    id: "ssh-auth",
    title: "SSH & Authentication",
    stage: "Stage 20",
    category: "Security",
    readTime: "8 min",
    summary: "Set up secure SSH authentication with GitHub so you never have to enter credentials on push.",
    content: `
      <h2>Why HTTPS Passwords Don't Work Anymore</h2>
      <p>GitHub deprecated account password authentication for Git operations. You must use either a <strong>Personal Access Token (PAT)</strong> or an <strong>SSH Key pair</strong>.</p>

      <h2>Setting Up SSH Authentication (Recommended)</h2>
      <p>SSH uses asymmetric cryptography: a <em>private key</em> that stays strictly on your computer, and a <em>public key</em> that you share with GitHub.</p>

      <h3>Step 1: Generate an Ed25519 SSH Key</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>ssh-keygen -t ed25519 -C "your_email@example.com"</div></div>
      <p>Press Enter to accept the default file location. Choose an optional passphrase.</p>

      <h3>Step 2: Copy Your PUBLIC Key</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-comment"># Windows PowerShell:</span>
<span class="git-prompt">$</span>Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard

<span class="git-comment"># macOS:</span>
<span class="git-prompt">$</span>pbcopy < ~/.ssh/id_ed25519.pub</div></div>

      <div class="git-danger-box">
        🚨 <strong>Security Warning:</strong> ONLY copy the file ending in <code>.pub</code>! Never share or upload your private key (<code>id_ed25519</code> without <code>.pub</code>).
      </div>

      <h3>Step 3: Add to GitHub</h3>
      <p>Go to GitHub -> <strong>Settings -> SSH and GPG keys -> New SSH Key</strong>. Paste the key and click Save.</p>

      <h3>Step 4: Test Your Connection</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>ssh -T git@github.com
Hi username! You've successfully authenticated, but GitHub does not provide shell access.</div></div>
    `
  },
  {
    id: "troubleshooting",
    title: "Git Troubleshooting",
    stage: "Stage 21",
    category: "Troubleshooting",
    readTime: "9 min",
    summary: "Fast diagnosis and safe remedies for non-fast-forward errors, accidental commits, and detached HEAD states.",
    content: `
      <h2>Top Common Git Errors & Safe Fixes</h2>

      <h3>1. Error: <code>[rejected - non-fast-forward]</code> on push</h3>
      <p><strong>Cause:</strong> A teammate pushed commits to GitHub that you don't have locally yet.</p>
      <p><strong>Safe Fix:</strong> Pull the changes first, then push:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git pull --rebase origin main
<span class="git-prompt">$</span>git push origin main</div></div>

      <h3>2. Accidentally committed a <code>.env</code> file containing secrets</h3>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git rm --cached .env
<span class="git-prompt">$</span>echo ".env" >> .gitignore
<span class="git-prompt">$</span>git commit -m "Remove .env from tracking"</div></div>
      <div class="git-warning-box">
        ⚠️ If the secret was already pushed to GitHub, simply removing it in a new commit is NOT enough. The old commit still has the key in history. You MUST rotate/revoke the leaked API key immediately!
      </div>

      <h3>3. You are in 'detached HEAD' state</h3>
      <p><strong>Cause:</strong> You checked out a specific commit hash directly instead of a branch.</p>
      <p><strong>Safe Fix:</strong> Simply switch back to your branch:</p>
      <div class="git-terminal"><div class="git-terminal-body"><span class="git-prompt">$</span>git switch main</div></div>
    `
  },
  {
    id: "company-workflows",
    title: "Real-World Company Workflows",
    stage: "Stage 22",
    category: "Company",
    readTime: "10 min",
    summary: "Experience a full feature lifecycle in a professional engineering team: Junior, Senior, Tech Lead, QA, and DevOps roles.",
    content: `
      <h2>The 14-Step Enterprise Feature Lifecycle</h2>
      <p>Here is exactly how a feature moves from a sprint ticket to production deployment in a top tech company:</p>

      <ol style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 0.9rem; line-height: 1.5;">
        <li><strong>Task Assigned:</strong> A Jira ticket or GitHub Issue is assigned to an engineer (e.g. <em>"JIRA-104: Add multi-factor authentication"</em>).</li>
        <li><strong>Update Local Code:</strong> Engineer switches to <code>main</code> and runs <code>git pull --ff-only origin main</code> to start from latest production code.</li>
        <li><strong>Feature Branch:</strong> Engineer creates <code>feature/JIRA-104-mfa</code>.</li>
        <li><strong>Implementation:</strong> Code is written, unit tests are added.</li>
        <li><strong>Local Verification:</strong> Tests and linters run locally (<code>pytest</code>, <code>npm test</code>).</li>
        <li><strong>Commit:</strong> Clean, descriptive commit messages created.</li>
        <li><strong>Push:</strong> Branch pushed to GitHub.</li>
        <li><strong>Pull Request:</strong> PR opened with summary, test notes, and ticket link.</li>
        <li><strong>Automated CI:</strong> GitHub Actions triggers linters, security scanners, and test suites across multiple environments.</li>
        <li><strong>Code Review:</strong> Senior Engineers and Tech Leads review code readability, edge cases, and performance.</li>
        <li><strong>Addressing Feedback:</strong> Engineer pushes updates to the same branch; PR updates automatically.</li>
        <li><strong>Approval:</strong> Two approvals granted; CI checks green.</li>
        <li><strong>Squash & Merge:</strong> PR merged into <code>main</code> branch.</li>
        <li><strong>Deployment:</strong> CI/CD pipeline deploys <code>main</code> to staging and production automatically.</li>
      </ol>
    `
  },
  {
    id: "practice-lab",
    title: "Git Practice Lab",
    stage: "Stage 23",
    category: "Interactive",
    readTime: "Interactive",
    summary: "Test your skills with scenario-based challenges across Easy, Medium, and Hard difficulty levels.",
    content: `
      <h2>Interactive Command Practice Lab</h2>
      <p>Test your intuition on real developer situations! Use the interactive quiz runner below to pick the correct commands and read detailed rationale for why each option succeeds or fails.</p>
    `
  },
  {
    id: "cheat-sheet",
    title: "Git Cheat Sheet",
    stage: "Stage 24",
    category: "Reference",
    readTime: "Quick Ref",
    summary: "Fast searchable reference of all essential Git commands, flags, and common workflows.",
    content: `
      <h2>Searchable Git & GitHub Cheat Sheet</h2>
      <p>Bookmark this page for immediate daily reference when coding or preparing for software engineering interviews.</p>
    `
  }
];
