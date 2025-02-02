"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTextBotCommand = void 0;
/**
 * We're writing a command line program that users can use to send text messages
 * to different groups of people. The program will take in a string, and parse it
 * to determine which group of people to send the message to, and what the message
 * should be.
 *
 * For example, if the user says "txt GROUP1 Hello, world!", the program
 * should send the message "Hello, world!" to everyone in GROUP1.
 *
 * If there is a group named "sart group", and the user says "txt sart group Hello, world!",
 * then we'll send a text message to everyone in the "sart group" group.
 *
 * Your goal here is to implement the `parseTextBotCommand` function, which will
 * determine the group to send the message to, and the message to send.
 *
 * Details:
 * - When parsing the group name, please ignore any leading or
 * trailing space, case, and any spaces between words (if the group name
 * contains multiple words).
 *
 * - Once you've parsed the group name please return the
 * message with leading and trailing spaces removed and no
 * other changes. Empty values as "messageToSend" are allowed.
 *
 * If you cannot determine a group and message, return null.
 *
 * @param rawInput
 */
const parseTextBotCommand = (rawInput, groups) => {
    if (!rawInput.toLowerCase().startsWith("txt ")) {
        return null; // Ensure the command starts with "txt "
    }
    const commandBody = rawInput.slice(4).trim(); // Remove "txt " and trim spaces
    if (!commandBody)
        return null; // No group or message provided
    // Normalize group names
    const normalizedGroups = groups.map(group => ({
        ...group,
        name: group.name.toLowerCase().replace(/\s+/g, '')
    }));
    // Extract group name and message
    const commandParts = commandBody.split(' ');
    let groupName = '';
    let messageToSend = '';
    let foundGroup;
    // checking if a valid group is found
    for (let i = 0; i < commandParts.length; i++) {
        const potentialGroupName = commandParts.slice(0, i + 1).join(' ').toLowerCase().replace(/\s+/g, '');
        foundGroup = normalizedGroups.find(group => group.name === potentialGroupName);
        if (foundGroup) {
            groupName = commandParts.slice(0, i + 1).join(' ');
            messageToSend = commandParts.slice(i + 1).join(' ').trim();
            break;
        }
    }
    if (!foundGroup || !messageToSend)
        return null; // No valid group or message provided
    return {
        groupId: foundGroup.id,
        messageToSend
    };
};
exports.parseTextBotCommand = parseTextBotCommand;
