# Add photo references to Nagatha chat

## What will change
- Add a photo button beside the message box, with mobile camera/gallery support, previews, removal, and clear size/type limits.
- Save each photo privately with its chat so it remains visible when the conversation is reopened.
- Send the photo with the user's message so Nagatha can inspect it and tailor her advice.
- Show attached photos inside the conversation and include a photo note when sharing the transcript.

## Safety and behavior
- Accept common image formats only, up to 10 MB each and up to 3 photos per message.
- Keep photos private to the signed-in owner of the conversation.
- Allow a photo with or without typed text; use a short default request when only a photo is sent.
- Preserve the existing Nagatha personality, tutoring, sharing, and delete behavior.

## Validation
- Verify photo selection, preview/removal, sending, Nagatha's image-aware response, saved-history reload, and mobile layout.
- Confirm the app still builds without errors.

## Technical details
- Use private Lovable Cloud storage and owner-scoped access rules.
- Add attachment metadata to saved messages while sending image data through the existing image-capable Responses API model.
- Generate short-lived display URLs when loading saved chats; deleting a chat also removes its stored photos.
