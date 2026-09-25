# Voice pronunciation coaching

## What I’ll build
- Add a microphone control beside the chat input on both new and existing chats.
- Let learners record, review, replay, discard, or send one voice memo without leaving the conversation.
- Transcribe the complete recording securely, then send the transcript and pronunciation-review context to Nagatha.
- Show the voice memo in chat history with an audio player and preserve it when the chat reloads.
- Have Nagatha assess pronunciation for Spanish, Italian, French, German, Korean, and English with specific, encouraging corrections and a short retry exercise.
- Handle microphone permission, empty recordings, upload limits, transcription failures, and mobile recording states clearly.

## Technical details
- Record complete WAV audio in the browser for reliable mobile and desktop decoding.
- Add an authenticated streaming transcription endpoint using Lovable AI’s dedicated transcription model; keep credentials server-side and preserve safe provider error messages.
- Store voice files privately with the existing chat attachment ownership rules, extending accepted attachment types safely.
- Pass the transcript to the existing Nagatha chat while keeping the audio available in saved history and shared transcripts.
- Verify recording, playback, send, reload, and error states on desktop and mobile, then confirm the preview remains error-free.
