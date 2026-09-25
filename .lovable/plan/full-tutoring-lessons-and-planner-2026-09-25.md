# Full tutoring lessons and planner

## Goal
Turn tutoring into a structured learning area for Spanish, Italian, French, German, Korean, Math, and English, with real lessons, exercises, saved progress, and personalized plans from Nagatha.

## What I’ll build
- Add a **Lessons** home page showing all seven subjects, overall progress, and the next lesson in each subject.
- Give every subject a dedicated course page with a practical sequence of lessons, clear teaching material, examples, and exercises.
- Add lesson pages with multiple-choice and written exercises, immediate feedback, retry support, and a completion action.
- Save each learner’s lesson status, score, attempts, and completion time so progress follows them across devices.
- Add a **Lesson planner** page where the learner chooses a subject, describes a goal, and selects available study time.
- Have Nagatha generate a structured plan in chat, save it as a conversation, and take the learner directly to it.
- Add Lessons and Planner to the compact chat navigation without bringing back the permanent history sidebar.

## Technical details
- Keep the course curriculum in typed app content so lessons are consistent, fast, and editable.
- Add one owner-scoped progress table through a database migration with authenticated grants and row-level security.
- Use authenticated server functions for reading and updating progress.
- Reuse the existing chat creation flow for personalized plans instead of creating a second AI system.
- Keep written pronunciation coaching available; the unreliable microphone and transcription feature stays removed.

## Verification
- Check subject browsing, exercise scoring, retries, completion, and saved progress.
- Check planner creation and the generated chat handoff.
- Verify the chat’s single-Nagatha layout and History drawer on desktop and mobile.
