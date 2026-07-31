# July 29, 2026

## Goal
Finish Add Candidate modal.

## Completed
- Added validation
- Fixed hooks order
- Reset form on close

## Learned
- Hooks must always be in the same order.
- Reusable reset functions make forms easier to maintain.

## Next
Responsive dashboard.

# July 30, 2026

## Goal
Complete the Add Candidate modal.

## Completed
- Added validation.
- Fixed React Hooks order.
- Reset form on close.
- Reset form after successful submission.
- Pushed project to GitHub.
- Successfully deployed the project.
- Created project documentation folder.

## Challenges
- GitHub deployment took longer than expected.
- Fixed deployment issues and got the project running.

## Learned
- Hooks must always be called in the same order.
- A reusable reset function keeps forms clean.
- Deployment problems are normal and part of development.
- Testing each feature before moving on saves time.

## Next
- Make the dashboard responsive.
- Improve search UX.

# July 30, 2026

## Challenges
- Next.js routing returned unexpected 404s during development.

## Learned
- `basePath` and `output: "export"` are deployment settings.
- Development and deployment configs may need to differ.
- Read terminal logs carefully before assuming React is broken.

## Next
- Fix Recharts container sizing.
- Begin responsive dashboard work.

# July 30, 2026

## Challenges
- GitHub deployment took longer than expected.
- Next.js returned unexpected 404 errors.
- Routing appeared broken even though the pages existed.

## Investigation
- Verified folder structure.
- Checked App Router pages.
- Verified layouts.
- Checked Sidebar and Navbar.
- Cleared `.next` cache.
- Narrowed the issue to `next.config.ts`.

## Solution
Removed:

- `basePath`
- `output: "export"`

during development.

The application immediately compiled correctly and routing worked again.

These settings will only be enabled when deploying to GitHub Pages.

## Learned

- Deployment configuration and development configuration are not always the same.
- Never assume React is the problem.
- Read terminal logs carefully.
- Eliminate one possibility at a time.
- Good debugging is a process, not guessing.

## Next
- Fix chart sizing warning.
- Make dashboard responsive.


# July 31, 2026

## Goal
Fix routing and investigate chart rendering.

## Completed
- Solved unexpected 404 routing issue.
- Learned how Next.js App Router resolves pages.
- Confirmed project structure after moving routes.
- Investigated Recharts container sizing issue.

## Learned

- A 404 doesn't always mean a missing page.
- Sometimes deleting `.next` and restarting fixes stale routing.
- Recharts requires a parent with a measurable width and height.
- When debugging, isolate one component instead of changing many files at once.
- Most bugs are caused by assumptions rather than complexity.

## Next

- Fix PerformanceChart sizing.
- Begin responsive layout improvements.

# July 31, 2026

## Debugging

Resolved a persistent Recharts warning:

"The width(-1) and height(-1) of chart should be greater than 0."

## Investigation

- Eliminated dashboard layout as the cause.
- Eliminated NigeriaMap.
- Eliminated other dashboard cards.
- Isolated the warning to PerformanceChart.
- Confirmed the warning originated from Recharts v3.

## Resolution

Downgraded Recharts to v2.15.3 using:

npm install recharts@2.15.3 --legacy-peer-deps

The warning disappeared.

## Lessons

- Third-party libraries can introduce bugs independent of application code.
- Isolate components before modifying layouts.
- Stable dependencies are often preferable to the newest version.