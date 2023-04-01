import { join } from 'path';
import { homedir } from 'os';

export const dirPath = join(homedir(), '.utool_clipboard');
