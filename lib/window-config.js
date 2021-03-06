/**
 * This file is part of Mondo.
 * 
 * Mondo is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Mondo is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Mondo.  If not, see <https://www.gnu.org/licenses/>.
 */

const electron = require('electron')
const path = require('path')
const fs = require('fs')

class WindowConfig {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData')
    this.path = path.join(userDataPath, opts.configName + '.json')
    this.data = _parseDataFile(this.path, opts.defaults)
  }

  setWindowBounds(width, height) {
    this.setWidth(width)
    this.setHeight(height)
  }

  setWidth(width) {
    this.data.windowBounds.width = width
    this._writeToFile()
  }

  getWidth() {
    return this.data.windowBounds.width
  }

  setHeight(height) {
    this.data.windowBounds.height = height
    this._writeToFile()
  }

  getHeight() {
    return this.data.windowBounds.height
  }

  setMaximize(maximize) {
    this.data.maximize = maximize
    this._writeToFile()
  }

  getMaximize() {
    return this.data.maximize
  }

  _writeToFile() {
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }
}

function _parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath))
  } catch (error) {
    return defaults
  }
}

module.exports = WindowConfig