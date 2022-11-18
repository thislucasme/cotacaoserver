import { exec } from 'child_process'
import { join } from 'path'
import { promisify } from 'util'

export const decriptLinuxExe = join(__dirname, 'descriptografia.linux')
export const criptLinuxExe = join(__dirname, 'criptografia.linux')

export const asyncExec = promisify(exec)
