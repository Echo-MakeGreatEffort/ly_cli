const inquirer = require("inquirer");

async function chooseTemplate() {
  const { template } = await inquirer.prompt([
    {
      type: "list",
      name: "template",
      message: "请选择模板",
      choices: ["vue3-webpack", "vue3-vite"],
    },
  ]);
  console.log(`你选择了${template}模板`);
  return template;
}

module.exports = {
  chooseTemplate,
};
