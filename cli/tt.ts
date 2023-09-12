import { Command } from "cliffy/command/mod.ts";
import { Select } from "cliffy/prompt/select.ts";
import { Input } from "cliffy/prompt/mod.ts";
import { TaskDao } from "~/repositories/task.ts";

const CLI_VERSION = "0.1.0";

const userId = "local";
const kv = await Deno.openKv("tasks");

const tasks = new TaskDao(kv, userId);

function main() {
  const tasks_cmd = new Command()
    .description("Manage users tasks")
    .action(() => {
      tasks_cmd.showHelp();
    })
    .command("list, l", "List your tasks")
    .action(async () => {
      const taskList = await tasks.list();

      if (taskList.length === 0) {
        return console.log("No tasks found");
      }

      taskList.forEach((task) => {
        console.log(`  • ${task.title}`);
      });
    })
    .command("create, c", "create your tasks")
    .action(async () => {
      const title = await Input.prompt(`Title`);
      const description = await Input.prompt(`Description`);

      await tasks.add({
        title,
        description,
      });
    })
    .command("remove, r", "remove a given id")
    .action(async () => {
      const tasksList = await tasks.list();
      const options = tasksList.map((t) => ({ name: t.title, value: t.id }));

      if (options.length === 0) {
        return console.log("No task to delete");
      }

      const removeId = await Select.prompt({
        message: "Pick a task to remove",
        options,
      });

      tasks.delete(removeId.toString());
    });

  const main_cmd = new Command()
    .name("tt")
    .description("TremTec.labs CLI utility")
    .version(CLI_VERSION)
    .action(() => {
      main_cmd.showHelp();
    })
    .command("tasks, t", tasks_cmd);

  return main_cmd.parse(Deno.args);
}

if (import.meta.main) {
  await main();
}
