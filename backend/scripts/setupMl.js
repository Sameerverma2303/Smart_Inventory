const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const mlDir = path.join(rootDir, 'ml');
const isWin = process.platform === 'win32';
const venvPath = path.join(mlDir, '.venv');
const pipExe = isWin
  ? path.join(venvPath, 'Scripts', 'pip.exe')
  : path.join(venvPath, 'bin', 'pip');

const pythonCmd = isWin ? 'python' : 'python3';

console.log(`Setting up Python virtual environment in ${venvPath}...`);
if (!fs.existsSync(venvPath)) {
  execSync(`${pythonCmd} -m venv "${venvPath}"`, { stdio: 'inherit', cwd: mlDir });
}

console.log(`Installing ML requirements using ${pipExe}...`);
execSync(`"${pipExe}" install -r "${path.join(mlDir, 'requirements.txt')}"`, {
  stdio: 'inherit',
  cwd: mlDir,
});

console.log('Python ML environment setup successfully completed.');
