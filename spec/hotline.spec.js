"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = require("chai");
const src_1 = require("../src");
const data_1 = require("./data");
(0, mocha_1.describe)('Sample test cases', () => {
    it('finds the correct message and group', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt hotline foo', data_1.TEXTING_BOT_GROUPS)).to.deep.equals({
            groupId: '1',
            messageToSend: 'foo',
        });
    });
    it('can parse multi-word messages', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt Hotline foo bar', data_1.TEXTING_BOT_GROUPS)).to.deep.equals({
            groupId: '1',
            messageToSend: 'foo bar',
        });
    });
    it('can parse parse multi word groups', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt a very long name foo bar', data_1.TEXTING_BOT_GROUPS)).to.deep.equals({
            groupId: '2',
            messageToSend: 'foo bar',
        });
    });
    it('ignores case in the group name', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt Sart foo bar', data_1.TEXTING_BOT_GROUPS)).to.deep.equals({
            groupId: 'a',
            messageToSend: 'foo bar',
        });
    });
    it('ignores leading and trailing spaces in the message', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt  a very long  name foo bar ', data_1.TEXTING_BOT_GROUPS)).to.deep.equals({
            groupId: '2',
            messageToSend: 'foo bar',
        });
    });
    it('ignores case of the text command', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('TXT  a very long  name foo bar', data_1.TEXTING_BOT_GROUPS)).to.deep.equals({
            groupId: '2',
            messageToSend: 'foo bar',
        });
    });
    it('returns null for an empty command', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('', data_1.TEXTING_BOT_GROUPS)).to.be.null;
    });
    it('returns null for a command without "txt "', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('hotline foo', data_1.TEXTING_BOT_GROUPS)).to.be.null;
    });
    it('returns null for a command with only "txt "', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt ', data_1.TEXTING_BOT_GROUPS)).to.be.null;
    });
    it('returns null for a non-existent group', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt nonExistentGroup foo', data_1.TEXTING_BOT_GROUPS)).to.be.null;
    });
    it('returns null for a command with only group name', () => {
        (0, chai_1.expect)((0, src_1.parseTextBotCommand)('txt hotline', data_1.TEXTING_BOT_GROUPS)).to.be.null;
    });
});
