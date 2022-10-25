# ReductV3
New version of Reduct, a Revolt.chat client held together by duct tape and bad code.
Adds websockets, more features, more code, still no libraries, tries to minimise amount of requests sent to the API.
As this is a personal project to learn through doing, I don't intend to accept pull requests - send issues instead, or if it's something I don't see fitting or over my capabilities, feel free to fork this.

Current features as for now:
  - Websocket stuff you would expect from a chat app (provides server list, channel list, saved notes, DM and group chats, new messages, shows when someone is typing)
  - API stuff you would expect from a chat app (Getting messages older than the new ones, sending messages, deleting messages, editing messages)
  - Author name and profile picture displaying (global, not server ones. masquerades display properly, system messages do display)
  - Displaying time the messages were sent
  - Multireplies (showing and sending), attachments sending (multiple)
  - Attachment embeds + ogg/wav embed support due to a workaround
  - Regular embeds work in progress, right now you can see just the title
  - New and hardcoded emotes rendering
  - Reactions rendering (+showing names of people who reacted on hover) and posting support
  - Being able to send and read messages in a voice channel
  - Keyboard shortcuts (Enter to send message, ESC to scroll to the bottom of the message list)
