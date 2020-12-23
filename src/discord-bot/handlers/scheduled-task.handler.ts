import { injectable } from "inversify";

@injectable()
export class ScheduledTaskHandler {

    tasks: Record<string, NodeJS.Timeout> = {};
    
    constructor() {}

    registerTask(taskName: string, interval: number, callback: () => void) {
        if (this.tasks[taskName] != null) {
            console.log(`Task NOT registered: ${taskName}`);
            return;
        }

        const task: NodeJS.Timeout = setInterval(callback, interval)
        this.tasks[taskName] = task;
        console.log(`Task registered: ${taskName}`);
    }

    removeTask(taskName: string) {
        if (this.tasks[taskName] === null) {
            return;
        }
        global.clearInterval(this.tasks[taskName]);
        delete this.tasks[taskName];
    }
}