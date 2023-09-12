class CommandManager {
    constructor(dirPath) {
        this.dirPath = dirPath;
    }
}

function f() {}

module.exports = { CommandManager: (dirPath) => new CommandManager(dirPath), f };