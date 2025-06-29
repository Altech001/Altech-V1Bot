# Luco Bot Commands

## Owner Commands
- Block Management
  - [block](./commands/block.js): Block a contact
  - [unblock](./commands/unblock.js): Unblock a contact
  - [unblockall](./commands/unblockall.js): Unblock all contacts
  - [listblocked](./commands/listblocked.js): List blocked contacts

- Chat Management
  - [delete](./commands/delete.js): Delete a message
  - [deljunk](./commands/deljunk.js): Delete junk messages
  - [readreceipts](./commands/readreceipts.js): Toggle read receipts
  - [react](./commands/react.js): React to messages

- Group Management
  - [gcaddprivacy](./commands/gcaddprivacy.js): Add group privacy
  - [groupid](./commands/groupid.js): Get group ID
  - [join](./commands/join.js): Join a group
  - [leave](./commands/leave.js): Leave a group

- System Management
  - [disk](./commands/disk.js): Check disk usage
  - [hostip](./commands/hostip.js): Get host IP
  - [lastseen](./commands/lastseen.js): Check last seen
  - [modestatus](./commands/modestatus.js): Check mode status
  - [online](./commands/online.js): Toggle online status
  - [owner](./commands/owner.js): Show owner info
  - [restart](./commands/restart.js): Restart the bot
  - [setbio](./commands/setbio.js): Set bio
  - [setprofilepic](./commands/setprofilepic.js): Set profile picture

- Privacy Settings
  - [ppprivacy](./commands/ppprivacy.js): Set privacy settings
  - [autoreact](./commands/autoreact.js): Toggle auto-reactions
  - [autoread](./commands/autoread.js): Toggle auto-read
  - [autorecord](./commands/autorecord.js): Toggle auto-record
  - [autorecordtyping](./commands/autorecordtyping.js): Toggle auto-record typing
  - [autotype](./commands/autotype.js): Toggle auto-typing
  - [autoviewstatus](./commands/autoviewstatus.js): Toggle auto-view status
  - [autoreactstatus](./commands/autoreactstatus.js): Toggle auto-react to status

- Status Management
  - [toviewonce](./commands/toviewonce.js): View status once
  - [tostatus](./commands/tostatus.js): Send to status
  - [autoviewstatus](./commands/autoviewstatus.js): Toggle auto-view status

- Lists and Information
  - [listbadword](./commands/listbadword.js): List bad words
  - [listignorelist](./commands/listignorelist.js): List ignored contacts
  - [listsudo](./commands/listsudo.js): List sudo users
  - [getsettings](./commands/getsettings.js): Get all settings

- Warning System
  - [warn](./commands/warn.js): Warn a user
  - [resetwarn](./commands/resetwarn.js): Reset warnings
  - [listwarn](./commands/listwarn.js): List warnings
  - [setwarn](./commands/setwarn.js): Set warning level

- Sticker Management
  - [setstickercmd](./commands/setstickercmd.js): Set sticker command
  - [delstickercmd](./commands/delstickercmd.js): Delete sticker command

## Settings Commands
- Basic Settings
  - [mode](./commands/mode.js): Set bot mode
  - [setmenu](./commands/setmenu.js): Set menu
  - [setprefix](./commands/setprefix.js): Set prefix
  - [setstatusemoji](./commands/setstatusemoji.js): Set status emoji
  - [setbotname](./commands/setbotname.js): Set bot name
  - [setownername](./commands/setownername.js): Set owner name
  - [setownernumber](./commands/setownernumber.js): Set owner number
  - [setwatermark](./commands/setwatermark.js): Set watermark
  - [setstickerauthor](./commands/setstickerauthor.js): Set sticker author
  - [setstickerpackname](./commands/setstickerpackname.js): Set sticker pack name
  - [settimezone](./commands/settimezone.js): Set timezone
  - [setcontextlink](./commands/setcontextlink.js): Set context link
  - [setmenuimage](./commands/setmenuimage.js): Set menu image
  - [setanticallmsg](./commands/setanticallmsg.js): Set anti-call message
  - [showanticallmsg](./commands/showanticallmsg.js): Show anti-call message
  - [delanticallmsg](./commands/delanticallmsg.js): Delete anti-call message
  - [testanticallmsg](./commands/testanticallmsg.js): Test anti-call message
  - [resetsetting](./commands/resetsetting.js): Reset settings

## Anti-Features
- Anti-Management
  - [addbadword](./commands/addbadword.js): Add bad word
  - [deletebadword](./commands/deletebadword.js): Delete bad word
  - [addignorelist](./commands/addignorelist.js): Add to ignore list
  - [delignorelist](./commands/delignorelist.js): Delete from ignore list
  - [addcountrycode](./commands/addcountrycode.js): Add country code
  - [delcountrycode](./commands/delcountrycode.js): Delete country code
  - [listcountrycode](./commands/listcountrycode.js): List country codes
  - [antibug](./commands/antibug.js): Toggle anti-bug
  - [anticall](./commands/anticall.js): Toggle anti-call
  - [antidelete](./commands/antidelete.js): Toggle anti-delete
  - [antideletestatus](./commands/antideletestatus.js): Toggle anti-delete status
  - [antiedit](./commands/antiedit.js): Toggle anti-edit
  - [autoblock](./commands/autoblock.js): Toggle auto-block
  - [addsudo](./commands/addsudo.js): Add sudo user
  - [delsudo](./commands/delsudo.js): Delete sudo user
  - [chatbot](./commands/chatbot.js): Toggle chatbot
  - [alwaysonline](./commands/alwaysonline.js): Toggle always online

## Special Features
- Voice Message
  - [dlvo](./commands/dlvo.js): Download voice message

- Status Management
  - [autoreactstatus](./commands/autoreactstatus.js): Toggle auto-react status
  - [autoviewstatus](./commands/autoviewstatus.js): Toggle auto-view status
  - [toviewonce](./commands/toviewonce.js): View status once
  - [tostatus](./commands/tostatus.js): Send to status

## Command Menu
- [menu](./commands/menu.js): Show command menu
- [ping](./commands/ping.js): Check bot response time

Each command file contains:
- `name`: Command name
- `description`: Command description
- `execute`: Function that runs when command is called
- Error handling
- Usage examples where applicable
