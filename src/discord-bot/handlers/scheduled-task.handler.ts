import { injectable } from "inversify";

@injectable()
export class ScheduledTaskHandler {

    private tasks: Record<string, number> = {};
    
    constructor() {}

    registerTask(taskName: string, interval: number, callback: () => void) {
        if (this.tasks[taskName] !== null) {
            return;
        }

        const task: number = window.setInterval(callback, interval)
        this.tasks[taskName] = task;
    }

    removeTask(taskName: string) {
        if (this.tasks[taskName] === null) {
            return;
        }

        delete this.tasks[taskName];
    }
}