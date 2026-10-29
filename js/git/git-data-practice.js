/**
 * MLForge Git & GitHub Practice Lab Challenge Questions
 * Real-world scenarios testing developer instincts across Easy, Medium, and Hard tiers.
 */

window.MLForge = window.MLForge || {};
window.MLForge.git = window.MLForge.git || {};
window.MLForge.git.data = window.MLForge.git.data || {};

MLForge.git.data.practiceQuestions = [
  // --- EASY ---
  {
    id: "pq-1",
    difficulty: "Easy",
    category: "Inspection",
    question: "You just finished editing two files in VS Code. Which command should you run first to see which files are modified and whether any untracked files exist?",
    options: [
      "git commit -m \"check\"",
      "git status",
      "git push origin main",
      "git log"
    ],
    correctIndex: 1,
    explanation: "`git status` is the read-only inspection command that shows your currently active branch, modified files, staged files, and untracked files without altering anything."
  },
  {
    id: "pq-2",
    difficulty: "Easy",
    category: "Branching",
    question: "You want to create a new branch named 'feature/profile' and immediately switch to it in a single command. What is the modern recommended command?",
    options: [
      "git branch feature/profile",
      "git switch -c feature/profile",
      "git merge feature/profile",
      "git checkout main"
    ],
    correctIndex: 1,
    explanation: "`git switch -c <branch-name>` creates the branch and immediately checks it out. `git branch <name>` only creates it without switching."
  },
  {
    id: "pq-3",
    difficulty: "Easy",
    category: "Staging",
    question: "You staged a file named `secrets.json` by mistake with `git add .`, but you haven't committed yet. How do you safely remove it from staging without deleting your edits on disk?",
    options: [
      "git restore --staged secrets.json",
      "git rm -f secrets.json",
      "git reset --hard HEAD",
      "git restore secrets.json"
    ],
    correctIndex: 0,
    explanation: "`git restore --staged <file>` safely unstages the file while keeping your local edits intact. `git restore <file>` (without --staged) would permanently discard your edits!"
  },
  {
    id: "pq-4",
    difficulty: "Easy",
    category: "Remotes",
    question: "You created a new local branch `feature/navbar`. What command pushes it to GitHub for the first time and sets up upstream tracking?",
    options: [
      "git push",
      "git push origin",
      "git push -u origin feature/navbar",
      "git pull origin feature/navbar"
    ],
    correctIndex: 2,
    explanation: "`git push -u origin <branch-name>` pushes the branch and sets the upstream tracking reference so future pushes only require typing `git push`."
  },

  // --- MEDIUM ---
  {
    id: "pq-5",
    difficulty: "Medium",
    category: "Undoing",
    question: "You made a local commit 5 minutes ago with a typo in the commit message. You have NOT pushed to GitHub yet. How do you fix the commit message?",
    options: [
      "git commit --amend -m \"New corrected message\"",
      "git revert HEAD",
      "git reset --hard HEAD~1",
      "git push --force"
    ],
    correctIndex: 0,
    explanation: "`git commit --amend` allows modifying the most recent unpushed commit. Since it has not been pushed to GitHub, amending is safe."
  },
  {
    id: "pq-6",
    difficulty: "Medium",
    category: "Remotes",
    question: "You are on `main` and want to update your local copy with the latest commits from GitHub. You want to ensure no unwanted merge commits are generated. Which command is safest?",
    options: [
      "git pull --force",
      "git pull --ff-only origin main",
      "git reset --hard origin/main",
      "git merge --abort"
    ],
    correctIndex: 1,
    explanation: "`git pull --ff-only origin main` only applies changes if your branch can be fast-forwarded cleanly. If there are divergent commits, it halts safely instead of polluting `main` with merge bubbles."
  },
  {
    id: "pq-7",
    difficulty: "Medium",
    category: "Stashing",
    question: "You are halfway through a feature when your tech lead asks you to quickly switch to `hotfix` to inspect a bug. You don't want to commit incomplete code. What should you run?",
    options: [
      "git reset --hard",
      "git stash push -m \"WIP: unfinished feature\"",
      "git checkout -b hotfix --force",
      "git clean -fd"
    ],
    correctIndex: 1,
    explanation: "`git stash` temporarily shelves your modified files into a temporary stack, giving you a clean working directory so you can switch branches cleanly."
  },
  {
    id: "pq-8",
    difficulty: "Medium",
    category: "Collaboration",
    question: "A commit introducing a bug was merged and pushed to GitHub's `main` branch. Other teammates have already pulled it. What is the standard professional way to undo this bug?",
    options: [
      "git reset --hard HEAD~1 && git push --force",
      "git revert <commit-hash> && git push",
      "git branch -D main",
      "git stash pop"
    ],
    correctIndex: 1,
    explanation: "`git revert <commit-hash>` creates a new forward commit that reverses the bug's changes without rewriting history. Force-pushing a `reset` on a shared public branch breaks teammates' repos."
  },

  // --- HARD ---
  {
    id: "pq-9",
    difficulty: "Hard",
    category: "Advanced",
    question: "You accidentally ran `git reset --hard HEAD~2` and lost two commits that contained 4 hours of unpushed work. How can you find their commit hashes to recover them?",
    options: [
      "Check `git status`",
      "Run `git reflog` to find the lost commit hashes, then `git reset --hard <hash>`",
      "Commits deleted by reset are permanently gone and impossible to recover",
      "Run `git fsck --lost-found` on GitHub"
    ],
    correctIndex: 1,
    explanation: "`git reflog` tracks every movement of HEAD on your local computer. The lost commits are recorded in the reflog and can be fully restored before Git garbage-collects them."
  },
  {
    id: "pq-10",
    difficulty: "Hard",
    category: "Rebasing",
    question: "You have 5 small 'checkpoint' commits on your private feature branch (`fix typo`, `wip`, `test`). What command lets you squash them into one clean commit before opening a PR?",
    options: [
      "git rebase -i HEAD~5",
      "git merge --squash main",
      "git cherry-pick HEAD~5",
      "git reset --hard HEAD~5"
    ],
    correctIndex: 0,
    explanation: "Interactive rebase (`git rebase -i HEAD~5`) opens an editor where you can mark commits to `squash` (or `s`) into the first commit, creating a clean single commit."
  },
  {
    id: "pq-11",
    difficulty: "Hard",
    category: "Security",
    question: "You pushed a commit to GitHub containing an AWS Secret Access Key in `.env`. What is the mandatory immediate action?",
    options: [
      "Delete the GitHub repository and create a new one.",
      "Immediately rotate and revoke the AWS key in the AWS console, then remove `.env` from Git tracking.",
      "Just make a new commit deleting `.env` and push it.",
      "Add `.env` to `.gitignore` and do nothing else."
    ],
    correctIndex: 1,
    explanation: "Automated bot scrapers scan public GitHub commits within seconds. Making a new commit leaves the secret in historical commits. The leaked secret MUST be revoked immediately in AWS, and then repository history should be sanitized."
  }
];

