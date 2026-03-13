#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────
#  Fellahia — realistic git history script
#  Author: hassane elhariti <hassaneelhariti@gmail.com>
#  Span:   Feb 28 – Mar 13, 2026
#
#  Run from the root of your Angular project:
#    bash setup_git_history.sh
# ─────────────────────────────────────────────────────────────────

set -e

AUTHOR_NAME="hassane elhariti"
AUTHOR_EMAIL="hassaneelhariti@gmail.com"

# ── Step 0: wipe all history, keep files on disk ─────────────────
git checkout master 2>/dev/null || true
for br in feature/project-setup feature/core-layer feature/auth-flow \
          feature/shared-layout feature/fellah-portal feature/lawyer-portal; do
  git branch -D "$br" 2>/dev/null || true
done

# Orphan: new master with zero commits, all files stay on disk untracked
git checkout --orphan new-master
git rm -rf --cached . > /dev/null 2>&1 || true
git branch -D master
git branch -m new-master master
echo "✔ history wiped — all files untracked on clean master"

# ── Helper: stage specific files and commit with spoofed date ────
gc() {
  local DATE="$1"
  local MSG="$2"
  shift 2
  git add "$@"
  GIT_AUTHOR_NAME="$AUTHOR_NAME" \
  GIT_AUTHOR_EMAIL="$AUTHOR_EMAIL" \
  GIT_AUTHOR_DATE="$DATE" \
  GIT_COMMITTER_NAME="$AUTHOR_NAME" \
  GIT_COMMITTER_EMAIL="$AUTHOR_EMAIL" \
  GIT_COMMITTER_DATE="$DATE" \
  git commit -m "$MSG"
}

# ═══════════════════════════════════════════════════════════════════
#  BRANCH 1 — feature/project-setup   (Feb 28, Sat)
# ═══════════════════════════════════════════════════════════════════
git checkout -b feature/project-setup

gc "2026-02-28 10:14:33 +0100" \
   "chore: init angular project with base config and dependencies" \
   angular.json package.json package-lock.json

gc "2026-02-28 11:02:47 +0100" \
   "style: add global styles and app shell scss" \
   src/styles.scss src/app/app.scss src/index.html

gc "2026-02-28 11:48:05 +0100" \
   "chore: configure app routes and server-side rendering routes" \
   src/app/app.routes.ts src/app/app.routes.server.ts src/app/app.config.ts

gc "2026-02-28 12:20:19 +0100" \
   "feat: add root app html template" \
   src/app/app.html

git checkout master
git merge --no-ff feature/project-setup -m "Merge branch 'feature/project-setup' into master"
git branch -d feature/project-setup


# ═══════════════════════════════════════════════════════════════════
#  BRANCH 2 — feature/core-layer   (Mar 1 Sun + Mar 2 Mon)
# ═══════════════════════════════════════════════════════════════════
git checkout -b feature/core-layer

gc "2026-03-01 09:33:21 +0100" \
   "feat(core): define domain models and shared interfaces" \
   src/app/core/models/models.ts

gc "2026-03-01 10:17:44 +0100" \
   "feat(core): implement auth service with login register and token logic" \
   src/app/core/services/AuthService.ts

gc "2026-03-01 11:05:58 +0100" \
   "feat(core): add jwt interceptor to attach bearer token on requests" \
   src/app/core/interceptors/authInterceptor.ts

gc "2026-03-01 14:38:02 +0100" \
   "feat(core): add auth guard to protect private routes" \
   src/app/core/guards/authGuard.ts

gc "2026-03-01 15:22:17 +0100" \
   "feat(core): add reactive user store with signals" \
   src/app/core/services/UserStore.ts

gc "2026-03-02 09:08:36 +0100" \
   "feat(core): add user service for profile and balance endpoints" \
   src/app/core/services/UserService.ts

gc "2026-03-02 10:44:09 +0100" \
   "feat(core): add case service with submit list and detail methods" \
   src/app/core/services/CaseService.ts

gc "2026-03-02 11:31:55 +0100" \
   "feat(core): add chat service for AI assistant messaging" \
   src/app/core/services/ChatService.ts

git checkout master
git merge --no-ff feature/core-layer -m "Merge branch 'feature/core-layer' into master"
git branch -d feature/core-layer


# ═══════════════════════════════════════════════════════════════════
#  BRANCH 3 — feature/auth-flow   (Mar 3 Tue + Mar 4 Wed)
# ═══════════════════════════════════════════════════════════════════
git checkout -b feature/auth-flow

gc "2026-03-03 08:55:14 +0100" \
   "feat(auth): scaffold auth feature routes with lazy loading" \
   src/app/features/auth/auth.routes.ts

gc "2026-03-03 09:42:30 +0100" \
   "feat(auth): add login component with phone and password form" \
   src/app/features/auth/login/login.ts \
   src/app/features/auth/login/login.html

gc "2026-03-03 10:28:53 +0100" \
   "style(auth): style login page layout and form fields" \
   src/app/features/auth/login/login.scss

gc "2026-03-03 11:10:07 +0100" \
   "test(auth): add login component unit tests" \
   src/app/features/auth/login/login.spec.ts

gc "2026-03-03 14:05:41 +0100" \
   "feat(auth): add register component with role selection" \
   src/app/features/auth/register-component/register-component.ts \
   src/app/features/auth/register-component/register-component.html

gc "2026-03-03 15:00:28 +0100" \
   "style(auth): style registration form and role toggle" \
   src/app/features/auth/register-component/register-component.scss

gc "2026-03-03 15:47:16 +0100" \
   "test(auth): add register component tests" \
   src/app/features/auth/register-component/register-component.spec.ts

gc "2026-03-04 09:18:44 +0100" \
   "feat(auth): add OTP verification screen after registration" \
   src/app/features/auth/verify-otp-component/verify-otp-component.ts \
   src/app/features/auth/verify-otp-component/verify-otp-component.html

gc "2026-03-04 10:03:22 +0100" \
   "style(auth): style otp input fields and resend button" \
   src/app/features/auth/verify-otp-component/verify-otp-component.scss

gc "2026-03-04 10:50:39 +0100" \
   "test(auth): add otp verification component tests" \
   src/app/features/auth/verify-otp-component/verify-otp-component.spec.ts

git checkout master
git merge --no-ff feature/auth-flow -m "Merge branch 'feature/auth-flow' into master"
git branch -d feature/auth-flow


# ═══════════════════════════════════════════════════════════════════
#  BRANCH 4 — feature/shared-layout   (Mar 5 Thu)
# ═══════════════════════════════════════════════════════════════════
git checkout -b feature/shared-layout

gc "2026-03-05 09:04:11 +0100" \
   "feat(layout): add shared sidebar with navigation links" \
   src/app/sidebar/sidebar.ts \
   src/app/sidebar/sidebar.html

gc "2026-03-05 09:55:38 +0100" \
   "style(layout): style sidebar items and active link highlight" \
   src/app/sidebar/sidebar.scss

gc "2026-03-05 10:30:02 +0100" \
   "test(layout): add sidebar spec" \
   src/app/sidebar/sidebar.spec.ts

gc "2026-03-05 11:14:27 +0100" \
   "feat(layout): add main template layout with router outlet" \
   src/app/template/template.ts \
   src/app/template/template.html

gc "2026-03-05 11:58:49 +0100" \
   "style(layout): style main content area padding and breakpoints" \
   src/app/template/template.scss

gc "2026-03-05 12:33:15 +0100" \
   "test(layout): add template component spec" \
   src/app/template/template.spec.ts

gc "2026-03-05 14:07:03 +0100" \
   "assets: add default user avatar placeholder image" \
   src/assets/default-avatar.png

git checkout master
git merge --no-ff feature/shared-layout -m "Merge branch 'feature/shared-layout' into master"
git branch -d feature/shared-layout


# ═══════════════════════════════════════════════════════════════════
#  BRANCH 5 — feature/fellah-portal   (Mar 7 Sat + Mar 8 Sun + Mar 9 Mon)
# ═══════════════════════════════════════════════════════════════════
git checkout -b feature/fellah-portal

gc "2026-03-07 09:22:08 +0100" \
   "feat(fellah): add fellah feature routes" \
   src/app/features/fellah/fellah.routes.ts

gc "2026-03-07 10:11:34 +0100" \
   "feat(fellah): add dashboard with balance overview and recent cases" \
   src/app/features/fellah/fellah-dashboard-component/fellah-dashboard-component.ts \
   src/app/features/fellah/fellah-dashboard-component/fellah-dashboard-component.html

gc "2026-03-07 11:04:52 +0100" \
   "style(fellah): style dashboard stat cards and quick actions" \
   src/app/features/fellah/fellah-dashboard-component/fellah-dashboard-component.scss

gc "2026-03-07 11:47:29 +0100" \
   "test(fellah): add dashboard component tests" \
   src/app/features/fellah/fellah-dashboard-component/fellah-dashboard-component.spec.ts

gc "2026-03-07 14:20:55 +0100" \
   "feat(fellah): add case list with status filter tabs" \
   src/app/features/fellah/case-list-component/case-list-component.ts \
   src/app/features/fellah/case-list-component/case-list-component.html

gc "2026-03-07 15:08:17 +0100" \
   "style(fellah): style case list rows and status badges" \
   src/app/features/fellah/case-list-component/case-list-component.scss

gc "2026-03-07 15:53:40 +0100" \
   "test(fellah): add case list component spec" \
   src/app/features/fellah/case-list-component/case-list-component.spec.ts

gc "2026-03-08 10:05:22 +0100" \
   "feat(fellah): add case submit form with urgency selector and file upload" \
   src/app/features/fellah/case-submit-component/case-submit-component.ts \
   src/app/features/fellah/case-submit-component/case-submit-component.html

gc "2026-03-08 10:58:14 +0100" \
   "style(fellah): style case submission form and drag drop area" \
   src/app/features/fellah/case-submit-component/case-submit-component.scss

gc "2026-03-08 11:42:07 +0100" \
   "test(fellah): add case submit spec" \
   src/app/features/fellah/case-submit-component/case-submit-component.spec.ts

gc "2026-03-08 14:30:48 +0100" \
   "feat(fellah): add case detail view with attached files and status" \
   src/app/features/fellah/case-detail-component/case-detail-component.ts \
   src/app/features/fellah/case-detail-component/case-detail-component.html

gc "2026-03-08 15:19:33 +0100" \
   "style(fellah): style case detail page and file list" \
   src/app/features/fellah/case-detail-component/case-detail-component.scss

gc "2026-03-08 16:04:11 +0100" \
   "test(fellah): add case detail component spec" \
   src/app/features/fellah/case-detail-component/case-detail-component.spec.ts

gc "2026-03-09 09:15:37 +0100" \
   "feat(fellah): add AI chat component with message history" \
   src/app/features/fellah/chat-component/chat-component.ts \
   src/app/features/fellah/chat-component/chat-component.html

gc "2026-03-09 10:07:02 +0100" \
   "style(fellah): style chat bubbles input bar and scroll behavior" \
   src/app/features/fellah/chat-component/chat-component.scss

gc "2026-03-09 10:52:44 +0100" \
   "test(fellah): add chat component tests" \
   src/app/features/fellah/chat-component/chat-component.spec.ts

git checkout master
git merge --no-ff feature/fellah-portal -m "Merge branch 'feature/fellah-portal' into master"
git branch -d feature/fellah-portal


# ═══════════════════════════════════════════════════════════════════
#  BRANCH 6 — feature/lawyer-portal   (Mar 11 Wed + Mar 12 Thu)
# ═══════════════════════════════════════════════════════════════════
git checkout -b feature/lawyer-portal

gc "2026-03-11 08:48:19 +0100" \
   "feat(lawyer): add lawyer feature routes" \
   src/app/features/lawyer/lawyer.routes.ts

gc "2026-03-11 09:35:04 +0100" \
   "feat(lawyer): add lawyer layout with router outlet" \
   src/app/features/lawyer/lawyer-layout/lawyer-layout.ts \
   src/app/features/lawyer/lawyer-layout/lawyer-layout.html

gc "2026-03-11 10:18:52 +0100" \
   "style(lawyer): style lawyer portal shell and content wrapper" \
   src/app/features/lawyer/lawyer-layout/lawyer-layout.scss

gc "2026-03-11 11:00:36 +0100" \
   "feat(lawyer): add lawyer sidebar with profile info and nav links" \
   src/app/features/lawyer/lawyer-sidebar/lawyer-sidebar.ts \
   src/app/features/lawyer/lawyer-sidebar/lawyer-sidebar.html

gc "2026-03-11 11:45:13 +0100" \
   "style(lawyer): style lawyer sidebar and active link indicators" \
   src/app/features/lawyer/lawyer-sidebar/lawyer-sidebar.scss

gc "2026-03-11 14:12:50 +0100" \
   "test(lawyer): add lawyer sidebar spec" \
   src/app/features/lawyer/lawyer-sidebar/lawyer-sidebar.spec.ts

gc "2026-03-12 09:10:27 +0100" \
   "feat(lawyer): add my cases view with accept and reject actions" \
   src/app/features/lawyer/my-lawyer-cases-component/my-lawyer-cases-component.ts \
   src/app/features/lawyer/my-lawyer-cases-component/my-lawyer-cases-component.html

gc "2026-03-12 10:00:44 +0100" \
   "style(lawyer): style lawyer case cards and action buttons" \
   src/app/features/lawyer/my-lawyer-cases-component/my-lawyer-cases-component.scss

gc "2026-03-12 10:48:22 +0100" \
   "test(lawyer): add my cases component spec" \
   src/app/features/lawyer/my-lawyer-cases-component/my-lawyer-cases-component.spec.ts

gc "2026-03-12 13:55:09 +0100" \
   "feat(lawyer): add pending cases view for browsing available cases" \
   src/app/features/lawyer/pending-cases-component/pending-cases-component.ts \
   src/app/features/lawyer/pending-cases-component/pending-cases-component.html

gc "2026-03-12 14:44:37 +0100" \
   "style(lawyer): style pending case cards and urgency color coding" \
   src/app/features/lawyer/pending-cases-component/pending-cases-component.scss

gc "2026-03-12 15:30:58 +0100" \
   "test(lawyer): add pending cases component spec" \
   src/app/features/lawyer/pending-cases-component/pending-cases-component.spec.ts

git checkout master
git merge --no-ff feature/lawyer-portal -m "Merge branch 'feature/lawyer-portal' into master"
git branch -d feature/lawyer-portal

echo ""
echo "✅  Done! Verify with:"
echo "    git log --oneline --graph --all"