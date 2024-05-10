#! /usr/bin/env node
const { program } = require("commander");
const download = require("download-git-repo");
const chalk = require("chalk");
const { chooseTemplate } = require("./inquirer");
const { templateMap } = require("./templateMap.cjs");
const { verifyBeforeCreate } = require("./create");

program.version(`@liying2024/ly_cli ${require("../package.json").version}`);

program.name("@liying2024/ly_cli").usage(`<command> [option]`);
// 注册create命令，name作为参数 指项目名
program
  .command("create <project-name>") // 增加创建指令
  .description("create a new project") // 添加描述信息
  .option("-f, --force", "overwrite target directory if it exists") // 强制覆盖
  .action(async (projectName, options) => {
    // require("../lib/create")(projectName, cmd);
    let project = projectName || "untitled";
    let template = await chooseTemplate();
    const verify = await verifyBeforeCreate(project, options);
    if (verify) {
      // const spinner = ora({
      //   text: "正在下载模板...",
      //   color: "yellow",
      //   spinner: {
      //     interval: 80,
      //     frames: ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"],
      //   },
      // });
      // spinner.start();
      const downloadUrl = templateMap.get(template);
      download(downloadUrl, project, { clone: true }, (err) => {
        if (err) {
          console.log(chalk.red(`创建项目失败：${project}`));
          console.log(chalk.red(`失败原因：${err}`));
        } else {
          console.log(chalk.green(`成功创建项目: ${project}`));
        }
      });
    }
  });

program
  .command("config [value]")
  .description("inspect and modify the config")
  .option("-g, --get <key>", "get value from option")
  .option("-s, --set <key> <value>", "set value to option")
  .option("-d, --delete <key>", "delete key from option")
  .action((value, keys) => {
    console.log(value, keys);
  });

program.on("--help", () => {
  console.log();
  console.log(
    `Run ${chalk.green(
      `@liying2024/ly_cli <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv);
