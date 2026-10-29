/**
 * MLForge Git & GitHub Commands Reference Library
 * Comprehensive, searchable reference with exact 9-point structure for all commands.
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};
window.MLForge.git.data = window.MLForge.git.data || {};

MLForge.git.data.commands = [
  // --- A. REPOSITORY COMMANDS ---
  {
    id: "git-init",
    name: "git init",
    category: "Repository",
    syntax: "git init [directory]",
    simpleMeaning: "Creates a brand-new, empty Git repository in your current folder, enabling version tracking.",
    whenToUse: "Use this once at the very start of a new project when you want Git to start recording changes.",
    example: "git init",
    exampleOutput: "Initialized empty Git repository in /home/user/my-project/.git/",
    whatItMeans: "Git created a hidden `.git/` folder containing the database, configuration, and object store for your version history. Your current files are not committed yet; they are untracked.",
    warnings: "Do not run `git init` inside a folder that is already inside another Git repository (unless creating submodules). Never run it in your root user home directory (`C:\\Users\\name` or `/home/user`).",
    relatedCommands: ["git status", "git clone"],
    commonMistakes: [
      "Running `git init` in the wrong folder (e.g., Desktop or parent directory) and accidentally tracking the whole computer.",
      "Thinking `git init` uploads files to GitHub. It is purely local on your machine."
    ]
  },
  {
    id: "git-clone",
    name: "git clone",
    category: "Repository",
    syntax: "git clone <repository-url> [local-dir-name]",
    simpleMeaning: "Downloads an existing repository from GitHub to your computer, including all files, branches, and full commit history.",
    whenToUse: "Use when joining an existing team project or downloading an open-source codebase to work on locally.",
    example: "git clone https://github.com/facebook/react.git",
    exampleOutput: "Cloning into 'react'...\nremote: Enumerating objects: 245102, done.\nremote: Counting objects: 100% (45/45), done.\nremote: Compressing objects: 100% (31/31), done.\nremote: Total 245102 (delta 20), reused 36 (delta 14), pack-reused 245057\nReceiving objects: 100% (245102/245102), 125.40 MiB | 12.30 MiB/s, done.\nResolving deltas: 100% (175390/175390), done.",
    whatItMeans: "A full working copy is downloaded, the remote named 'origin' is automatically configured, and your default branch (usually 'main') is checked out.",
    warnings: "Be sure you have sufficient disk space when cloning massive monorepos. For large repositories where you only need recent history, consider `--depth 1`.",
    relatedCommands: ["git init", "git remote -v"],
    commonMistakes: [
      "Running `git clone` inside an existing Git project folder, nesting repositories unintentionally.",
      "Forgetting to `cd <repo-folder>` after cloning before running further Git commands."
    ]
  },
  {
    id: "git-status",
    name: "git status",
    category: "Repository",
    syntax: "git status [-s]",
    simpleMeaning: "Shows the exact current state of your project: which branch you are on, which files are modified, staged, or untracked.",
    whenToUse: "Run this frequently! Use it before adding files, before committing, before switching branches, and before pushing.",
    example: "git status",
    exampleOutput: "On branch main\nYour branch is up to date with 'origin/main'.\n\nChanges to be committed:\n  (use \"git restore --staged <file>...\" to unstage)\n\tmodified:   src/app.py\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\tconfig.yaml",
    whatItMeans: "Green files are in the Staging Area and ready to be committed. Red files are modified or newly created (untracked) in your working directory and not yet staged.",
    warnings: "This command is read-only and 100% safe to run at any time; it never alters your files.",
    relatedCommands: ["git diff", "git add", "git commit"],
    commonMistakes: [
      "Assuming `git status` automatically saves or uploads your changes to GitHub. It only inspects and reports."
    ]
  },
  {
    id: "git-rev-parse-toplevel",
    name: "git rev-parse --show-toplevel",
    category: "Repository",
    syntax: "git rev-parse --show-toplevel",
    simpleMeaning: "Prints the absolute path of the root directory of your current Git repository.",
    whenToUse: "Use to confirm which repository you are currently inside or when writing automation scripts.",
    example: "git rev-parse --show-toplevel",
    exampleOutput: "/Users/developer/projects/mlforge",
    whatItMeans: "Shows the top folder containing the `.git` directory for your active working tree.",
    warnings: "Fails with a fatal error if executed in a directory that is not part of any Git repository.",
    relatedCommands: ["git status"],
    commonMistakes: [
      "Executing inside submodules and expecting the parent repository root path instead of the submodule's."
    ]
  },
  {
    id: "git-remote-v",
    name: "git remote -v",
    category: "Repository",
    syntax: "git remote -v",
    simpleMeaning: "Lists the names and URLs of all remote repositories (like GitHub) connected to your local project.",
    whenToUse: "Use before pushing or pulling to verify which GitHub repository URL your local branch will communicate with.",
    example: "git remote -v",
    exampleOutput: "origin\thttps://github.com/myusername/mlforge.git (fetch)\norigin\thttps://github.com/myusername/mlforge.git (push)",
    whatItMeans: "'origin' is the default alias for your remote GitHub server. You see separate entries for fetching and pushing.",
    warnings: "Check if the remote URL uses HTTPS or SSH when troubleshooting permission or authentication errors.",
    relatedCommands: ["git remote add", "git remote set-url"],
    commonMistakes: [
      "Thinking 'origin' is a magic branch name. 'origin' is simply a nickname for the remote URL."
    ]
  },
  {
    id: "git-remote-add",
    name: "git remote add",
    category: "Repository",
    syntax: "git remote add <name> <url>",
    simpleMeaning: "Links a new remote repository nickname (usually 'origin') to a remote GitHub URL.",
    whenToUse: "Use when you created a local repository with `git init` and now want to connect it to an empty GitHub repository.",
    example: "git remote add origin https://github.com/myname/new-project.git",
    exampleOutput: "(No output if successful)",
    whatItMeans: "Git stores the URL in `.git/config` under the shortcut name 'origin'.",
    warnings: "If 'origin' already exists, running this command again throws `fatal: remote origin already exists`. Use `git remote set-url` to change an existing URL.",
    relatedCommands: ["git remote -v", "git remote set-url", "git remote remove"],
    commonMistakes: [
      "Typing `git remote add` twice when the remote was already added, causing a duplicate remote error.",
      "Adding a repository URL you don't have write access to."
    ]
  },
  {
    id: "git-remote-set-url",
    name: "git remote set-url",
    category: "Repository",
    syntax: "git remote set-url <name> <newurl>",
    simpleMeaning: "Updates the URL of an existing remote (for instance, switching from HTTPS to SSH or fixing a typo).",
    whenToUse: "Use when you rename a GitHub repository or switch your authentication from HTTPS to SSH keys.",
    example: "git remote set-url origin git@github.com:myname/new-project.git",
    exampleOutput: "(No output if successful)",
    whatItMeans: "The URL for 'origin' is safely replaced without breaking branch tracking configurations.",
    warnings: "Verify the new URL with `git remote -v` immediately after running.",
    relatedCommands: ["git remote -v", "git remote add"],
    commonMistakes: [
      "Mistyping the SSH URL format (`git@github.com:user/repo.git` vs `https://github.com/user/repo.git`)."
    ]
  },

  // --- B. STAGING AND COMMITTING ---
  {
    id: "git-add",
    name: "git add",
    category: "Staging & Committing",
    syntax: "git add <file-path>...",
    simpleMeaning: "Moves specific modified or new files from your working directory into the Staging Area (preparing them for the next commit).",
    whenToUse: "Use when you have made changes to a specific file and want to include it in your next atomic commit.",
    example: "git add src/model.py",
    exampleOutput: "(No output if successful)",
    whatItMeans: "The file's current contents are snapshotted in Git's index. If you edit the file again before committing, you must re-add it to stage the newest edits.",
    warnings: "Only stages the exact files specified. Check `git status` to verify staged changes.",
    relatedCommands: ["git status", "git restore --staged", "git commit"],
    commonMistakes: [
      "Assuming `git add` saves a permanent commit. It only prepares changes in the staging area."
    ]
  },
  {
    id: "git-add-all",
    name: "git add .",
    category: "Staging & Committing",
    syntax: "git add .",
    simpleMeaning: "Stages all new, modified, and deleted files in the current folder and all its subfolders.",
    whenToUse: "Use when all recent changes in your project are intended to be part of the upcoming commit.",
    example: "git add .",
    exampleOutput: "(No output if successful)",
    whatItMeans: "Every file recognized as changed by Git in the current directory subtree is moved to the staging area.",
    warnings: "⚠️ DANGER: If you do not have a `.gitignore`, running `git add .` can accidentally stage `.env` secret files, large virtual environments (`venv/`), API keys, and build artifacts (`node_modules/`, `dist/`). Always check `git status` before committing!",
    relatedCommands: ["git status", "git add -p", "git reset"],
    commonMistakes: [
      "Running `git add .` from a subfolder and wondering why changes in the parent directory were not staged.",
      "Accidentally committing sensitive credentials because `.env` was not in `.gitignore`."
    ]
  },
  {
    id: "git-add-p",
    name: "git add -p",
    category: "Staging & Committing",
    syntax: "git add -p [file]",
    simpleMeaning: "Interactive staging: walks through every individual code chunk (hunk) allowing you to stage only specific pieces of a file.",
    whenToUse: "Use when you made several unrelated edits in a single file and want to split them into clean, separate, professional commits.",
    example: "git add -p src/app.py",
    exampleOutput: "Stage this hunk [y,n,q,a,d,s,e,?]? y",
    whatItMeans: "Prompts you per diff block. Type 'y' to stage, 'n' to skip, 's' to split into smaller chunks, 'e' to edit manually.",
    warnings: "Requires reading the terminal diff carefully.",
    relatedCommands: ["git add", "git diff"],
    commonMistakes: [
      "Accidentally pressing 'q' (quit) or 'd' (don't stage this or remaining hunks) prematurely."
    ]
  },
  {
    id: "git-commit-m",
    name: "git commit -m",
    category: "Staging & Committing",
    syntax: "git commit -m \"Clear message in imperative mood\"",
    simpleMeaning: "Takes a permanent snapshot of everything currently in the Staging Area and saves it to your local Git history with a descriptive message.",
    whenToUse: "Use after testing your staged changes when you have completed a meaningful, single unit of work.",
    example: "git commit -m \"Add user email validation on signup form\"",
    exampleOutput: "[feature/signup a8f9c12] Add user email validation on signup form\n 2 files changed, 48 insertions(+), 6 deletions(-)",
    whatItMeans: "A new commit object with a unique 40-character SHA-1 hash is created. HEAD moves forward to point to this new commit.",
    warnings: "This only saves to your LOCAL computer. It has NOT been sent to GitHub yet until you run `git push`.",
    relatedCommands: ["git push", "git log", "git status"],
    commonMistakes: [
      "Writing vague commit messages like 'fixed bug' or 'updates'. Follow conventions like 'Add...', 'Fix...', 'Refactor...'.",
      "Running `git commit` without staging anything (`git add`), which does nothing and throws `no changes added to commit`."
    ]
  },
  {
    id: "git-commit-amend",
    name: "git commit --amend",
    category: "Staging & Committing",
    syntax: "git commit --amend [--no-edit]",
    simpleMeaning: "Modifies the most recent commit by combining newly staged files with it or correcting the last commit message.",
    whenToUse: "Use when you just made a commit and immediately realized you forgot to include a file or had a typo in the message.",
    example: "git add forgotten-file.js\ngit commit --amend --no-edit",
    exampleOutput: "[main 7c3d1b4] Previous commit message\n Date: Thu Oct 29 10:20:00 2026\n 2 files changed, 25 insertions(+)",
    whatItMeans: "The previous commit is replaced by a brand new commit with a new hash. The old commit is orphaned.",
    warnings: "⚠️ NEVER amend a commit that has ALREADY been pushed to a shared public branch on GitHub! It rewrites history and will break other developers' local branches.",
    relatedCommands: ["git commit -m", "git reflog"],
    commonMistakes: [
      "Amending a pushed commit and then getting rejected on `git push` because the remote history diverged."
    ]
  },
  {
    id: "git-diff",
    name: "git diff",
    category: "Staging & Committing",
    syntax: "git diff [file]",
    simpleMeaning: "Shows the line-by-line changes in your working directory that have NOT yet been staged.",
    whenToUse: "Use before running `git add` to review what lines of code you added, changed, or deleted.",
    example: "git diff",
    exampleOutput: "--- a/calculator.py\n+++ b/calculator.py\n@@ -10,3 +10,5 @@ def add(a, b):\n     return a + b\n+\n+def subtract(a, b):\n+    return a - b",
    whatItMeans: "Lines starting with `+` in green are added; lines starting with `-` in red were deleted.",
    warnings: "Once you run `git add .`, `git diff` will show nothing! Use `git diff --staged` to view staged changes.",
    relatedCommands: ["git diff --staged", "git status"],
    commonMistakes: [
      "Running `git diff` after staging files and thinking all your changes vanished."
    ]
  },
  {
    id: "git-diff-staged",
    name: "git diff --staged",
    category: "Staging & Committing",
    syntax: "git diff --staged",
    simpleMeaning: "Shows the line-by-line differences between your staged changes and your last commit.",
    whenToUse: "Use right before running `git commit` to do a final pre-commit code review of exactly what will be recorded.",
    example: "git diff --staged",
    exampleOutput: "--- a/index.html\n+++ b/index.html\n@@ -4,2 +4,3 @@\n+<link rel=\"stylesheet\" href=\"css/git.css\">",
    whatItMeans: "Shows exactly what code will go into the next commit snapshot.",
    warnings: "Identical to `git diff --cached`.",
    relatedCommands: ["git diff", "git commit -m"],
    commonMistakes: [
      "Forgetting to check staged diff and accidentally committing leftover debug `console.log()` statements."
    ]
  },
  {
    id: "git-log-oneline",
    name: "git log --oneline",
    category: "Staging & Committing",
    syntax: "git log --oneline [-n count]",
    simpleMeaning: "Displays a clean, compact view of commit history where each commit is shown on a single line with its short hash and message.",
    whenToUse: "Use to quickly scan recent project history, find a commit hash, or inspect what commits your branch contains.",
    example: "git log --oneline -5",
    exampleOutput: "a1b2c3d (HEAD -> main, origin/main) Add Git learning dashboard\n4e5f6a7 Fix responsive layout on mobile\n8b9c0d1 Implement merge conflict simulator\n2f3a4b5 Add practice questions bank\n6e7d8c9 Initial commit",
    whatItMeans: "Lists commits chronologically backwards from HEAD. Shows the 7-character short hash, branch pointers, and commit title.",
    warnings: "Press `q` to exit if the log opens in a pager (`less`).",
    relatedCommands: ["git log", "git show", "git reflog"],
    commonMistakes: [
      "Getting stuck inside the terminal log pager because they don't know pressing `q` quits."
    ]
  },
  {
    id: "git-blame",
    name: "git blame",
    category: "Staging & Committing",
    syntax: "git blame <file-path>",
    simpleMeaning: "Annotates every line of a file with the author, commit hash, and timestamp of who last modified that specific line.",
    whenToUse: "Use when investigating why a line of code was written, who wrote it, or which commit introduced a bug.",
    example: "git blame auth.js -L 12,16",
    exampleOutput: "3a4b5c6d (Sarah Chen 2026-09-14 14:32:11 +0200 12) const tokenExpiry = 3600;\n3a4b5c6d (Sarah Chen 2026-09-14 14:32:11 +0200 13) if (!token) return false;",
    whatItMeans: "Provides commit attribution line-by-line so you can look up the original pull request or commit message.",
    warnings: "Running on very large files can produce long output. Use `-L start,end` to inspect a line range.",
    relatedCommands: ["git show", "git log"],
    commonMistakes: [
      "Using blame to 'assign blame' aggressively rather than as an engineering diagnostic tool to find context."
    ]
  },

  // --- C. BRANCH COMMANDS ---
  {
    id: "git-branch",
    name: "git branch",
    category: "Branching",
    syntax: "git branch [-a] [-r]",
    simpleMeaning: "Lists all local branches on your computer and highlights your currently active branch with an asterisk (*).",
    whenToUse: "Use to see what branches exist locally or use `-a` to see all local and remote-tracking branches.",
    example: "git branch",
    exampleOutput: "* main\n  feature/user-auth\n  fix/navbar-scroll",
    whatItMeans: "The green branch preceded by `*` is the current branch (HEAD points here).",
    warnings: "Without arguments, this only lists local branches. Use `git branch -a` to see remote branches.",
    relatedCommands: ["git switch", "git checkout"],
    commonMistakes: [
      "Typing `git branch <name>` expecting to switch to it. `git branch <name>` only creates the branch; it doesn't switch to it."
    ]
  },
  {
    id: "git-switch",
    name: "git switch",
    category: "Branching",
    syntax: "git switch <branch-name>",
    simpleMeaning: "Switches your working directory to an existing branch.",
    whenToUse: "Use when you want to change branches to work on a different feature or bug fix.",
    example: "git switch feature/login",
    exampleOutput: "Switched to branch 'feature/login'",
    whatItMeans: "HEAD is updated to point to `feature/login`, and your project files are updated to match that branch's snapshot.",
    warnings: "If you have uncommitted changes that conflict with the destination branch, Git will prevent the switch. Commit or stash your changes first.",
    relatedCommands: ["git switch -c", "git checkout"],
    commonMistakes: [
      "Using old `git checkout` which also restores files, leading to accidental file overwrites."
    ]
  },
  {
    id: "git-switch-c",
    name: "git switch -c",
    category: "Branching",
    syntax: "git switch -c <new-branch-name>",
    simpleMeaning: "Creates a brand-new branch from your current commit and immediately switches to it in one single step.",
    whenToUse: "Use whenever you start a new task, ticket, or feature before writing code.",
    example: "git switch -c feature/payment-gateway",
    exampleOutput: "Switched to a new branch 'feature/payment-gateway'",
    whatItMeans: "A new branch pointer is created pointing to the current commit, and HEAD switches to it. (Modern replacement for `git checkout -b`).",
    warnings: "Ensure your starting branch (e.g. `main`) is up to date with `git pull` before creating the branch.",
    relatedCommands: ["git branch", "git switch"],
    commonMistakes: [
      "Creating a new feature branch from an outdated or dirty local branch instead of updated `main`."
    ]
  },
  {
    id: "git-branch-d",
    name: "git branch -d",
    category: "Branching",
    syntax: "git branch -d <branch-name>",
    simpleMeaning: "Safely deletes a local branch that has already been merged into your current branch.",
    whenToUse: "Use after a feature branch has been merged into `main` and you want to clean up your local branch list.",
    example: "git branch -d feature/user-auth",
    exampleOutput: "Deleted branch feature/user-auth (was a1b2c3d).",
    whatItMeans: "Removes the local branch reference. Commits remain safely part of the merged history.",
    warnings: "Git will refuse to delete with an error if the branch contains unmerged commits. To force delete, use `-D`.",
    relatedCommands: ["git branch -D", "git push origin --delete"],
    commonMistakes: [
      "Trying to delete the branch you are currently standing on. You must switch to `main` first!"
    ]
  },
  {
    id: "git-branch-D-force",
    name: "git branch -D",
    category: "Branching",
    syntax: "git branch -D <branch-name>",
    simpleMeaning: "Force deletes a local branch even if it contains commits that have never been merged anywhere.",
    whenToUse: "Use when an experiment failed and you intentionally want to discard the entire branch and its commits.",
    example: "git branch -D failed-prototype",
    exampleOutput: "Deleted branch failed-prototype (was 4f5e6d7).",
    whatItMeans: "Forcefully removes the pointer. Unreferenced commits may eventually be garbage collected.",
    warnings: "⚠️ Any unique commits on this branch will become unreachable. If deleted by mistake, you can recover them via `git reflog` if done promptly.",
    relatedCommands: ["git branch -d", "git reflog"],
    commonMistakes: [
      "Using `-D` routinely instead of `-d`, accidentally deleting work you thought was merged."
    ]
  },

  // --- D. REMOTE REPOSITORY COMMANDS ---
  {
    id: "git-fetch",
    name: "git fetch",
    category: "Remotes",
    syntax: "git fetch [remote]",
    simpleMeaning: "Downloads all new commits, branches, and tags from GitHub into your local repository without modifying your working files.",
    whenToUse: "Use to see what teammates have pushed without risking any merge conflicts in your active working directory.",
    example: "git fetch origin",
    exampleOutput: "remote: Enumerating objects: 12, done.\nremote: Counting objects: 100% (12/12), done.\nUnpacking objects: 100% (8/8), 1.25 KiB | 640.00 KiB/s, done.\nFrom https://github.com/myname/mlforge\n   a1b2c3d..9e8d7c6  main       -> origin/main\n * [new branch]      feature/api -> origin/feature/api",
    whatItMeans: "Remote-tracking branches like `origin/main` are updated locally. Your local `main` branch is untouched.",
    warnings: "Remember: `git fetch` does NOT update your code. You must merge or rebase (`git pull`) to incorporate the changes.",
    relatedCommands: ["git pull", "git merge origin/main"],
    commonMistakes: [
      "Running `git fetch` and wondering why the newly pushed files don't appear in the code editor yet."
    ]
  },
  {
    id: "git-pull",
    name: "git pull",
    category: "Remotes",
    syntax: "git pull [remote] [branch]",
    simpleMeaning: "Downloads new changes from GitHub and immediately integrates them into your current branch (equivalent to `git fetch` followed by `git merge`).",
    whenToUse: "Use before starting work each day or before creating a new branch to ensure you have the team's latest code.",
    example: "git pull origin main",
    exampleOutput: "Updating a1b2c3d..9e8d7c6\nFast-forward\n src/calculator.js | 14 +++++++++++---\n 1 file changed, 11 insertions(+), 3 deletions(-)",
    whatItMeans: "Fast-forwards your branch if possible, or creates a merge commit if you also have local commits.",
    warnings: "If both you and a colleague modified the same lines, `git pull` can trigger a merge conflict.",
    relatedCommands: ["git fetch", "git pull --ff-only", "git pull --rebase"],
    commonMistakes: [
      "Pulling while having unstaged, conflicting edits in your working directory."
    ]
  },
  {
    id: "git-pull-ff-only",
    name: "git pull --ff-only",
    category: "Remotes",
    syntax: "git pull --ff-only origin main",
    simpleMeaning: "Only pulls if the update can be fast-forwarded. If a merge commit or conflict would be created, it safely cancels.",
    whenToUse: "Best practice when updating your local `main` branch. Guarantees your `main` remains clean and never gets unexpected merge commits.",
    example: "git pull --ff-only origin main",
    exampleOutput: "Updating 7a8b9c0..3d4e5f6\nFast-forward\n README.md | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
    whatItMeans: "If your local branch has diverged from origin, Git stops and informs you rather than generating an unwanted merge commit.",
    warnings: "If it fails, inspect your local branch with `git log` to see what local commits need rebasing or stashing.",
    relatedCommands: ["git pull", "git fetch"],
    commonMistakes: [
      "Committing directly onto local `main` and then wondering why `--ff-only` refuses to pull."
    ]
  },
  {
    id: "git-push-u",
    name: "git push -u",
    category: "Remotes",
    syntax: "git push -u origin <branch-name>",
    simpleMeaning: "Uploads your local branch and all its commits to GitHub for the first time and links it as the upstream tracking branch.",
    whenToUse: "Use the very first time you push a newly created local branch to GitHub.",
    example: "git push -u origin feature/login",
    exampleOutput: "Enumerating objects: 9, done.\nCounting objects: 100% (9/9), done.\nDelta compression using up to 8 threads\nCompressing objects: 100% (5/5), done.\nWriting objects: 100% (6/6), 842 bytes | 842.00 KiB/s, done.\nTotal 6 (delta 2), reused 0 (delta 0), pack-reused 0\nTo https://github.com/myname/mlforge.git\n * [new branch]      feature/login -> feature/login\nbranch 'feature/login' set up to track 'origin/feature/login'.",
    whatItMeans: "The `-u` (or `--set-upstream`) flag configures Git so that in future pushes or pulls on this branch, you can simply type `git push` or `git pull`.",
    warnings: "Requires push permissions to the target GitHub repository.",
    relatedCommands: ["git push", "git remote -v"],
    commonMistakes: [
      "Forgetting `-u` on the first push and getting an error asking to set the upstream."
    ]
  },
  {
    id: "git-push",
    name: "git push",
    category: "Remotes",
    syntax: "git push",
    simpleMeaning: "Uploads all your new local commits on the current branch to its tracked remote branch on GitHub.",
    whenToUse: "Use after committing your work and when you are ready to publish changes or update your Pull Request on GitHub.",
    example: "git push",
    exampleOutput: "Everything up-to-date\n(or lists uploaded commit delta)",
    whatItMeans: "Remote branch pointer is advanced to match your local branch.",
    warnings: "If someone else pushed commits to the remote branch in the meantime, your push will be rejected (non-fast-forward). You must `git pull` first before pushing.",
    relatedCommands: ["git push -u origin <branch>", "git pull"],
    commonMistakes: [
      "Trying to push with `--force` when rejected instead of pulling and resolving the differences cleanly."
    ]
  },

  // --- E. UNDOING CHANGES ---
  {
    id: "git-restore-file",
    name: "git restore",
    category: "Undoing Changes",
    syntax: "git restore <file>",
    simpleMeaning: "Discards all uncommitted changes in a specific file in your working directory, reverting it back to the last committed state.",
    whenToUse: "Use when you made experimental edits in a file that you decided you don't want to keep.",
    example: "git restore index.html",
    exampleOutput: "(No output if successful)",
    whatItMeans: "Your uncommitted modifications in `index.html` are wiped out and replaced by the version from HEAD.",
    warnings: "⚠️ DESTRUCTIVE: Uncommitted changes discarded by `git restore` are permanently deleted and CANNOT be recovered!",
    relatedCommands: ["git restore --staged", "git diff"],
    commonMistakes: [
      "Running `git restore .` accidentally and wiping out hours of uncommitted work across the whole project."
    ]
  },
  {
    id: "git-restore-staged",
    name: "git restore --staged",
    category: "Undoing Changes",
    syntax: "git restore --staged <file>",
    simpleMeaning: "Unstages a file from the Staging Area while preserving all your code edits safely in your working directory.",
    whenToUse: "Use when you accidentally ran `git add` on a file you didn't want in the next commit.",
    example: "git restore --staged config.json",
    exampleOutput: "(No output if successful)",
    whatItMeans: "The file is removed from the upcoming commit snapshot, but your edits stay intact on disk.",
    warnings: "Completely safe: does not lose code.",
    relatedCommands: ["git add", "git reset HEAD"],
    commonMistakes: [
      "Confusing `git restore --staged` (safe unstaging) with `git restore` (destructive file revert)."
    ]
  },
  {
    id: "git-reset-soft",
    name: "git reset --soft",
    category: "Undoing Changes",
    syntax: "git reset --soft HEAD~1",
    simpleMeaning: "Undoes the last commit, but keeps all changes staged in your staging area ready to be recommitted.",
    whenToUse: "Use when you committed too early or want to rewrite the commit message and add more files.",
    example: "git reset --soft HEAD~1",
    exampleOutput: "(No output if successful; files remain staged in git status)",
    whatItMeans: "HEAD moves back by 1 commit. The files from that commit remain green in staging.",
    warnings: "Only use on local commits that have not been pushed to GitHub.",
    relatedCommands: ["git reset --mixed", "git reset --hard"],
    commonMistakes: [
      "Using `--hard` when you only meant `--soft`."
    ]
  },
  {
    id: "git-reset-hard",
    name: "git reset --hard",
    category: "Undoing Changes",
    syntax: "git reset --hard [commit-hash / HEAD~1]",
    simpleMeaning: "Completely wipes out all uncommitted changes and moves your branch back to the specified commit.",
    whenToUse: "Use ONLY when you want to throw away everything done since a specific commit and start fresh.",
    example: "git reset --hard HEAD~1",
    exampleOutput: "HEAD is now at 8b9c0d1 Previous working state",
    whatItMeans: "Working directory, staging area, and commit history are forcefully rolled back.",
    warnings: "🚨 EXTREME DANGER: Any uncommitted files or modifications in your working directory will be permanently destroyed with no way to recover them! Never run this without checking `git status` first.",
    relatedCommands: ["git reset --soft", "git revert"],
    commonMistakes: [
      "Running `git reset --hard` to fix a small mistake and losing all unstaged work in progress."
    ]
  },
  {
    id: "git-revert",
    name: "git revert",
    category: "Undoing Changes",
    syntax: "git revert <commit-hash>",
    simpleMeaning: "Creates a new commit that applies the exact inverse of a previous commit, undoing its changes safely.",
    whenToUse: "Use when you need to undo a commit that has ALREADY been pushed to GitHub and shared with teammates.",
    example: "git revert 3a4b5c6",
    exampleOutput: "[main 9f8e7d6] Revert \"Introduce broken cache layer\"\n 2 files changed, 10 insertions(+), 35 deletions(-)",
    whatItMeans: "Does not rewrite history. It adds a new forward commit that cancels out the old commit's diff.",
    warnings: "This is the gold-standard professional way to rollback bugs on shared branches like `main`.",
    relatedCommands: ["git reset", "git log"],
    commonMistakes: [
      "Using `git reset` on shared branches instead of `git revert`, breaking teammates' repositories."
    ]
  },
  {
    id: "git-reflog",
    name: "git reflog",
    category: "Undoing Changes",
    syntax: "git reflog",
    simpleMeaning: "A chronological safety diary recording every single move of HEAD on your local computer, even deleted commits and branches.",
    whenToUse: "Use when you think you lost a commit, accidentally deleted a branch, or made a bad reset.",
    example: "git reflog -5",
    exampleOutput: "a1b2c3d HEAD@{0}: reset: moving to HEAD~1\n4e5f6a7 HEAD@{1}: commit: Add experimental feature\n8b9c0d1 HEAD@{2}: checkout: moving from feature to main",
    whatItMeans: "Even if a branch was deleted, its commit hash is listed in reflog for at least 30 to 90 days before garbage collection.",
    warnings: "Reflog is strictly local to your machine; it is never pushed to GitHub.",
    relatedCommands: ["git reset", "git checkout"],
    commonMistakes: [
      "Panicking after an accidental `git reset --hard` instead of simply finding the old commit hash in `git reflog` and restoring it with `git reset --hard HEAD@{1}`."
    ]
  },

  // --- F. STASHING ---
  {
    id: "git-stash",
    name: "git stash",
    category: "Stashing",
    syntax: "git stash [push -m \"optional description\"]",
    simpleMeaning: "Temporarily shelves (shelters) all dirty uncommitted modifications, giving you a clean working directory.",
    whenToUse: "Use when you are in the middle of writing code on branch A and suddenly need to switch to branch B to fix an urgent bug without committing incomplete work.",
    example: "git stash push -m \"WIP: payment logic\"",
    exampleOutput: "Saved working directory and index state On feature/pay: WIP: payment logic",
    whatItMeans: "Your uncommitted work is safely stored on a temporary stash stack, and your files revert to matching HEAD.",
    warnings: "By default, untracked newly created files are not stashed unless you pass `-u` (`git stash -u`).",
    relatedCommands: ["git stash pop", "git stash list", "git stash drop"],
    commonMistakes: [
      "Forgetting that newly created files were not stashed because `-u` was omitted."
    ]
  },
  {
    id: "git-stash-pop",
    name: "git stash pop",
    category: "Stashing",
    syntax: "git stash pop",
    simpleMeaning: "Restores the most recently stashed changes back into your working directory and removes them from the stash list.",
    whenToUse: "Use when you return to your feature branch and want to resume where you left off.",
    example: "git stash pop",
    exampleOutput: "On branch feature/pay\nChanges not staged for commit:\n  modified:   src/payment.js\nDropped refs/stash@{0} (a1b2c3d...)",
    whatItMeans: "Re-applies the stashed diff and drops that stash entry.",
    warnings: "If the code in your branch changed while the work was stashed, popping can cause a merge conflict.",
    relatedCommands: ["git stash", "git stash apply"],
    commonMistakes: [
      "Confusing `git stash pop` (applies and removes) with `git stash apply` (applies but leaves in stash list)."
    ]
  },
  {
    id: "git-stash-list",
    name: "git stash list",
    category: "Stashing",
    syntax: "git stash list",
    simpleMeaning: "Shows all saved stash entries on your stash stack.",
    whenToUse: "Use to see what stashes exist and find specific entries like `stash@{1}`.",
    example: "git stash list",
    exampleOutput: "stash@{0}: On main: WIP: payment logic\nstash@{1}: On fix/nav: Temporary experiment",
    whatItMeans: "Entries are indexed starting from 0 (most recent).",
    warnings: "Stashes do not expire automatically; clean them up periodically.",
    relatedCommands: ["git stash drop", "git stash clear"],
    commonMistakes: [
      "Accumulating dozens of forgotten stashes over months."
    ]
  },

  // --- G. MERGING AND REBASING ---
  {
    id: "git-merge",
    name: "git merge",
    category: "Merging & Rebasing",
    syntax: "git merge <source-branch>",
    simpleMeaning: "Combines the history and commits of another branch into your current active branch.",
    whenToUse: "Use when you are standing on `main` and want to incorporate the completed work from `feature/login`.",
    example: "git switch main\ngit merge feature/login",
    exampleOutput: "Updating 7a8b9c0..3d4e5f6\nFast-forward\n auth.js | 28 +++++++++++++++++++++++-----\n 1 file changed, 23 insertions(+), 5 deletions(-)",
    whatItMeans: "If no divergent commits exist, Git performs a fast-forward. If both branches have commits, Git creates a 3-way merge commit with two parents.",
    warnings: "Always run `git status` before merging to ensure your working directory is clean.",
    relatedCommands: ["git merge --abort", "git rebase"],
    commonMistakes: [
      "Standing on the feature branch and running `git merge main` when they intended to merge the feature into `main`."
    ]
  },
  {
    id: "git-merge-abort",
    name: "git merge --abort",
    category: "Merging & Rebasing",
    syntax: "git merge --abort",
    simpleMeaning: "Cancels an in-progress merge conflict and restores your branch to the exact state it was in before `git merge` was executed.",
    whenToUse: "Use when merge conflicts are overwhelming, messy, or unexpected, and you want to safely start over.",
    example: "git merge --abort",
    exampleOutput: "(No output; working directory restored cleanly)",
    whatItMeans: "Removes all conflict markers from files and restores HEAD to the pre-merge state.",
    warnings: "Only works while a merge is in progress (before the conflict has been committed).",
    relatedCommands: ["git merge", "git status"],
    commonMistakes: [
      "Manually editing files and deleting markers by hand when they just wanted to cancel the merge entirely."
    ]
  },
  {
    id: "git-rebase",
    name: "git rebase",
    category: "Merging & Rebasing",
    syntax: "git rebase <base-branch>",
    simpleMeaning: "Re-applies your current branch's commits one-by-one on top of the latest tip of another branch, producing a straight, linear history without merge bubbles.",
    whenToUse: "Use to update your personal feature branch with the latest changes from `main` before opening a pull request.",
    example: "git switch feature/login\ngit rebase main",
    exampleOutput: "Successfully rebased and updated refs/heads/feature/login.",
    whatItMeans: "Temporarily removes your feature commits, fast-forwards to `main`, and re-plays your commits on top.",
    warnings: "🚨 GOLDEN RULE: NEVER rebase a public branch that other people are working on! Rebasing rewrites commit hashes.",
    relatedCommands: ["git rebase -i", "git rebase --abort", "git merge"],
    commonMistakes: [
      "Rebasing `main` on a feature branch instead of rebasing feature onto `main`."
    ]
  },
  {
    id: "git-rebase-i",
    name: "git rebase -i",
    category: "Merging & Rebasing",
    syntax: "git rebase -i HEAD~<n>",
    simpleMeaning: "Opens an interactive menu allowing you to squash messy commits into one, reword messages, reorder commits, or delete commits.",
    whenToUse: "Use before submitting a pull request to clean up 'checkpoint' commits into one clean, polished commit.",
    example: "git rebase -i HEAD~3",
    exampleOutput: "pick a1b2c3d Add input field\nsquash 4e5f6a7 Fix typo in field\nsquash 8b9c0d1 Add validation logic",
    whatItMeans: "Allows choosing actions: `pick` (keep), `squash` (combine into previous commit), `reword` (edit message), `drop` (delete).",
    warnings: "Do not squash commits that have already been pushed to a shared public team branch.",
    relatedCommands: ["git rebase", "git commit --amend"],
    commonMistakes: [
      "Deleting lines in the rebase editor thinking it skips squashing; deleting a line actually DROPS (deletes) that commit!"
    ]
  },
  {
    id: "git-cherry-pick",
    name: "git cherry-pick",
    category: "Merging & Rebasing",
    syntax: "git cherry-pick <commit-hash>",
    simpleMeaning: "Copies a specific single commit from any branch and applies its exact changes as a new commit on your current branch.",
    whenToUse: "Use when an important bugfix was made in another branch and you need that specific fix immediately on your branch without merging the whole branch.",
    example: "git cherry-pick 3d4e5f6",
    exampleOutput: "[main 8a9b0c1] Fix critical null pointer in auth\n 1 file changed, 3 insertions(+)",
    whatItMeans: "A brand new commit is created on your active branch carrying the exact diff of the chosen commit.",
    warnings: "Creates duplicate commits with different hashes. Use sparingly.",
    relatedCommands: ["git merge", "git rebase"],
    commonMistakes: [
      "Cherry-picking when a standard branch merge would have been cleaner."
    ]
  },

  // --- H. TAGS AND RELEASES ---
  {
    id: "git-tag-a",
    name: "git tag -a",
    category: "Tags & Releases",
    syntax: "git tag -a <version-tag> -m \"Release description\"",
    simpleMeaning: "Creates an annotated tag bookmarking a specific commit as a milestone release (e.g. `v1.0.0`).",
    whenToUse: "Use when deploying a production version or releasing an official software package.",
    example: "git tag -a v1.0.0 -m \"First production release of MLForge\"",
    exampleOutput: "(No output if successful)",
    whatItMeans: "Creates a permanent tag object containing the author name, date, message, and target commit hash.",
    warnings: "Tags are NOT pushed by default when running `git push`. You must push them explicitly with `git push origin <tag>` or `git push origin --tags`.",
    relatedCommands: ["git push origin --tags", "git show <tag>"],
    commonMistakes: [
      "Creating lightweight tags (`git tag v1.0.0`) instead of annotated tags (`-a`), missing author and message metadata."
    ]
  },
  {
    id: "git-push-tags",
    name: "git push --tags",
    category: "Tags & Releases",
    syntax: "git push origin --tags",
    simpleMeaning: "Uploads all your local tags to GitHub so they appear under the repository's 'Releases' tab.",
    whenToUse: "Use after creating release tags to publish them to GitHub.",
    example: "git push origin --tags",
    exampleOutput: "Total 0 (delta 0), reused 0 (delta 0), pack-reused 0\nTo https://github.com/myname/mlforge.git\n * [new tag]         v1.0.0 -> v1.0.0",
    whatItMeans: "All local tags are transmitted to the remote server.",
    warnings: "Pushes ALL local tags. If you have private test tags, push only the desired tag: `git push origin v1.0.0`.",
    relatedCommands: ["git tag -a", "git tag -d"],
    commonMistakes: [
      "Expecting `git push` to upload tags automatically."
    ]
  },

  // --- I. ADVANCED INSPECTION ---
  {
    id: "git-bisect",
    name: "git bisect",
    category: "Advanced Inspection",
    syntax: "git bisect start / bad / good",
    simpleMeaning: "Uses binary search through your commit history to rapidly pinpoint the exact single commit that introduced a bug.",
    whenToUse: "Use when a bug is discovered in production, but you don't know which of the last 200 commits broke it.",
    example: "git bisect start\ngit bisect bad HEAD\ngit bisect good v1.0.0",
    exampleOutput: "Bisecting: 64 revisions left to test after this (roughly 6 steps)\n[a1b2c3d4...] Fix database query performance",
    whatItMeans: "Git automatically checks out the midpoint commit. You test your app, mark it `git bisect good` or `git bisect bad`, and Git halves the search space each step.",
    warnings: "Always run `git bisect reset` when finished to return to your original branch.",
    relatedCommands: ["git bisect reset", "git blame"],
    commonMistakes: [
      "Forgetting to run `git bisect reset` and continuing to develop on a detached HEAD state."
    ]
  },
  {
    id: "git-worktree-add",
    name: "git worktree add",
    category: "Advanced Inspection",
    syntax: "git worktree add <path> <branch>",
    simpleMeaning: "Checks out multiple branches of the same repository simultaneously into separate directories on your computer.",
    whenToUse: "Use when running a long build or test on one branch while needing to quickly fix code on another branch without switching back and forth.",
    example: "git worktree add ../mlforge-hotfix hotfix/login",
    exampleOutput: "Preparing worktree (checking out 'hotfix/login')\nHEAD is now at 8b9c0d1 Fix login crash",
    whatItMeans: "You have two physical folders on disk sharing the same underlying `.git` object store.",
    warnings: "You cannot check out the same branch in two worktrees at the same time.",
    relatedCommands: ["git worktree list", "git worktree remove"],
    commonMistakes: [
      "Manually deleting the directory instead of running `git worktree remove`."
    ]
  }
];

