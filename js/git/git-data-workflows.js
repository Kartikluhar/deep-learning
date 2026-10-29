/**
 * MLForge Git & GitHub Workflows and Templates Database
 * Contains interactive decision guide recipes and practical .gitignore templates.
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};
window.MLForge.git.data = window.MLForge.git.data || {};

MLForge.git.data.workflows = [
  {
    id: "wf-new-project",
    title: "Start a Brand New Project & Upload to GitHub",
    description: "You have a new project folder on your computer and want to start tracking it with Git and publish it to GitHub.",
    steps: [
      { cmd: "cd my-project", explanation: "Navigate into your project folder." },
      { cmd: "git init", explanation: "Initialize a new local Git repository." },
      { cmd: "touch .gitignore", explanation: "Create a .gitignore file to exclude dependencies and secrets." },
      { cmd: "git add .", explanation: "Stage all project files into the staging area." },
      { cmd: "git commit -m \"Initial commit: Project setup\"", explanation: "Record your initial snapshot locally." },
      { cmd: "git branch -M main", explanation: "Ensure your primary branch is named 'main'." },
      { cmd: "git remote add origin https://github.com/username/my-project.git", explanation: "Link your local repo to the empty GitHub repo." },
      { cmd: "git push -u origin main", explanation: "Push your code and set 'origin/main' as upstream tracking." }
    ]
  },
  {
    id: "wf-upload-existing",
    title: "Upload Existing Local Project (Already Has Git History)",
    description: "Your local project has commits, and you want to publish it to a new GitHub repository without losing your history.",
    steps: [
      { cmd: "git status", explanation: "Check that your working tree is clean." },
      { cmd: "git remote -v", explanation: "Check if an old remote already exists." },
      { cmd: "git remote set-url origin https://github.com/username/new-repo.git", explanation: "If 'origin' exists, update the URL; if not, use 'git remote add origin <url>'." },
      { cmd: "git branch -M main", explanation: "Set branch name to main." },
      { cmd: "git push -u origin main", explanation: "Upload your full existing commit history to GitHub." }
    ]
  },
  {
    id: "wf-clone-contribute",
    title: "Clone an Existing Repository & Contribute",
    description: "Download a team or open-source repository, create a feature branch, and submit changes.",
    steps: [
      { cmd: "git clone https://github.com/team/app.git", explanation: "Download project and Git history." },
      { cmd: "cd app", explanation: "Enter the project directory." },
      { cmd: "git switch -c feature/my-new-feature", explanation: "Create and switch to a new branch for your task." },
      { cmd: "# (Make your code edits in VS Code)", explanation: "Write code and test locally." },
      { cmd: "git status && git diff", explanation: "Review your changes before staging." },
      { cmd: "git add .", explanation: "Stage your modifications." },
      { cmd: "git commit -m \"Add user profile avatar upload\"", explanation: "Commit with a clear, descriptive message." },
      { cmd: "git push -u origin feature/my-new-feature", explanation: "Push your branch to GitHub and open a Pull Request." }
    ]
  },
  {
    id: "wf-update-local",
    title: "Update Local Code with Latest Team Changes",
    description: "Get the newest commits your teammates pushed to GitHub onto your computer cleanly.",
    steps: [
      { cmd: "git status", explanation: "Ensure you don't have unstaged conflicting changes." },
      { cmd: "git switch main", explanation: "Switch to your local main branch." },
      { cmd: "git pull --ff-only origin main", explanation: "Fast-forward update your main branch from GitHub." },
      { cmd: "git switch feature/my-branch", explanation: "Switch back to your feature branch." },
      { cmd: "git rebase main", explanation: "Rebase your feature on top of the latest main commits." }
    ]
  },
  {
    id: "wf-undo-commit",
    title: "Undo the Last Local Commit (Keep Code Edits)",
    description: "You made a commit too early or made a typo in the message, and want to redo it.",
    steps: [
      { cmd: "git reset --soft HEAD~1", explanation: "Undoes the last commit. All changes remain staged in your editor." },
      { cmd: "# (Make any further edits if desired)", explanation: "Add or modify files." },
      { cmd: "git commit -m \"Corrected commit message\"", explanation: "Create the polished commit." }
    ]
  },
  {
    id: "wf-resolve-conflict",
    title: "Resolve a Merge Conflict Safely",
    description: "A merge or rebase halted due to conflicting edits on the same lines.",
    steps: [
      { cmd: "git status", explanation: "See the list of 'both modified' conflicting files." },
      { cmd: "# (Open files in VS Code and choose changes)", explanation: "Accept Current, Incoming, or Both, and remove <<<<<<< markers." },
      { cmd: "git add <resolved-file>", explanation: "Stage the resolved file." },
      { cmd: "git commit", explanation: "Finalize the merge with the standard merge commit." }
    ]
  }
];

MLForge.git.data.gitignoreTemplates = [
  {
    id: "gi-python",
    name: "Python & Virtual Environments",
    description: "Excludes compiled bytecode, virtual environments, eggs, and local caches.",
    content: `# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# Virtual Environments
venv/
env/
.venv/
ENV/

# Distribution / packaging
dist/
build/
*.egg-info/

# Unit test / coverage
.pytest_cache/
.coverage
htmlcov/

# Secrets
.env
.env.local`
  },
  {
    id: "gi-ml",
    name: "Machine Learning & Data Science",
    description: "Excludes heavy datasets, neural network weights, checkpoints, and experiment runs.",
    content: `# Large Datasets
data/
raw_data/
*.csv
*.parquet
*.h5
*.tfrecord

# Model weights and checkpoints
checkpoints/
models/*.pt
models/*.pth
models/*.onnx
models/*.bin
*.safetensors

# Experiment tracking
wandb/
mlruns/
lightning_logs/

# Notebooks
.ipynb_checkpoints/
*-checkpoint.ipynb`
  },
  {
    id: "gi-node",
    name: "Node.js & JavaScript / React",
    description: "Excludes node_modules, build outputs, npm debug logs, and local environment files.",
    content: `# Dependencies
node_modules/
.pnp
.pnp.js

# Build outputs
dist/
build/
.next/
out/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Secrets & Environment
.env
.env.local
.env.development.local
.env.production.local`
  },
  {
    id: "gi-vscode",
    name: "VS Code & IDEs",
    description: "Excludes developer-specific IDE configs and OS metadata.",
    content: `# VS Code personal settings
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json
*.code-workspace

# Operating System Files
.DS_Store
Thumbs.db
desktop.ini`
  }
];

