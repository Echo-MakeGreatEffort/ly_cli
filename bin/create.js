const path = require("path");
const fs = require("fs-extra");
const inquirer = require("inquirer");

async function verifyBeforeCreate(projectName, options) {
  const cwd = process.cwd();
  const targetDir = path.join(cwd, projectName);
  if (fs.existsSync(targetDir)) {
    if (options.force) {
      // 删除重名目录
      await fs.remove(targetDir);
    } else {
      const { action } = await inquirer.prompt([
        {
          name: "action",
          type: "list",
          message: "Target directory already exists. Pick an action:",
          choices: [
            { name: "Overwrite", value: "overwrite" },
            { name: "Cancel", value: false },
          ],
        },
      ]);
      if (!action) {
        return;
      } else if (action === "overwrite") {
        console.log(`\nRemoving ${targetDir}...`);
        await fs.remove(targetDir);
      }
    }
  }
  return true;
}

module.exports = {
  verifyBeforeCreate,
};
