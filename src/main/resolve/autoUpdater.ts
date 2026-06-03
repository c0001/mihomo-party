import { copyFile, rm, writeFile } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'
import os from 'os'
import { exec, execSync, spawn } from 'child_process'
import { promisify } from 'util'
import { createHash } from 'crypto'
import { app, shell } from 'electron'
import i18next from 'i18next'
import { mainWindow } from '../window'
import { appLogger } from '../utils/logger'
import { dataDir, exeDir, exePath, isPortable, resourcesFilesDir } from '../utils/dirs'
import { getAppConfig, getControledMihomoConfig } from '../config'
import { checkAdminPrivileges } from '../core/manager'
import { parse } from '../utils/yaml'
import * as chromeRequest from '../utils/chromeRequest'

const GITHUB_PROXIES = ['https://gh-proxy.org', 'https://ghfast.top', 'https://down.clashparty.org']

function buildDownloadUrls(githubUrl: string, proxyPref = ''): string[] {
  if (proxyPref === 'direct') return [githubUrl]
  if (proxyPref && proxyPref !== 'auto') return [`${proxyPref}/${githubUrl}`]
  // auto: try each proxy then fall back to direct
  return [...GITHUB_PROXIES.map((p) => `${p}/${githubUrl}`), githubUrl]
}

async function tryDownload(
  urls: string[],
  options: Parameters<typeof chromeRequest.get>[1]
): Promise<Awaited<ReturnType<typeof chromeRequest.get>>> {
  return undefined
}

export async function checkUpdate(): Promise<IAppVersion | undefined> {
  return undefined
}

// 1:新 -1:旧 0:相同
function compareVersions(a: string, b: string): number {
  const parsePart = (part: string) => {
    const numPart = part.split('-')[0]
    const num = parseInt(numPart, 10)
    return isNaN(num) ? 0 : num
  }
  const v1 = a.replace(/^v/, '').split('.').map(parsePart)
  const v2 = b.replace(/^v/, '').split('.').map(parsePart)
  for (let i = 0; i < Math.max(v1.length, v2.length); i++) {
    const num1 = v1[i] || 0
    const num2 = v2[i] || 0
    if (num1 > num2) return 1
    if (num1 < num2) return -1
  }
  return 0
}

export async function downloadAndInstallUpdate(version: string): Promise<void> {
  return undefined
}
