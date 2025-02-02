import { describe } from 'mocha';
import { expect } from 'chai';
import { parseTextBotCommand } from '../src';
import { TEXTING_BOT_GROUPS } from './data';

describe('Sample test cases', () => {
  it('finds the correct message and group', () => {
    expect(parseTextBotCommand('txt hotline foo', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '1',
      messageToSend: 'foo',
    });
  });
  it('can parse multi-word messages', () => {
    expect(parseTextBotCommand('txt Hotline foo bar', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '1',
      messageToSend: 'foo bar',
    });
  });
  it('can parse parse multi word groups', () => {
    expect(parseTextBotCommand('txt a very long name foo bar', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '2',
      messageToSend: 'foo bar',
    });
  });
  it('ignores case in the group name', () => {
    expect(parseTextBotCommand('txt Sart foo bar', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: 'a',
      messageToSend: 'foo bar',
    });
  });
  it('ignores leading and trailing spaces in the message', () => {
    expect(parseTextBotCommand('txt  a very long  name foo bar ', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '2',
      messageToSend: 'foo bar',
    });
  });
  it('ignores case of the text command', () => {
    expect(parseTextBotCommand('TXT  a very long  name foo bar', TEXTING_BOT_GROUPS)).to.deep.equals({
      groupId: '2',
      messageToSend: 'foo bar',
    });
  });



  it('returns null for an empty command', () => {
    expect(parseTextBotCommand('', TEXTING_BOT_GROUPS)).to.be.null;
  });

  it('returns null for a command without "txt "', () => {
    expect(parseTextBotCommand('hotline foo', TEXTING_BOT_GROUPS)).to.be.null;
  });

  it('returns null for a command with only "txt "', () => {
    expect(parseTextBotCommand('txt ', TEXTING_BOT_GROUPS)).to.be.null;
  });

  it('returns null for a non-existent group', () => {
    expect(parseTextBotCommand('txt nonExistentGroup foo', TEXTING_BOT_GROUPS)).to.be.null;
  });

  it('returns null for a command with only group name', () => {
    expect(parseTextBotCommand('txt hotline', TEXTING_BOT_GROUPS)).to.be.null;
  });


});