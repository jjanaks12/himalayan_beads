export default class Jobs {
    list: Function[] = []

    add(jobs: Function | Function[]) {
        if (Array.isArray(jobs))
            this.list = jobs
        else
            this.list.push(jobs)
    }

    run() {
        return new Promise(async (resolve) => {
            try {
                while (this.list.length > 0) {
                    const job = this.list[0]
                    await job()
                    this.list.shift()
                }
                resolve(true)
            } catch (error) {
                console.error(error);
            }
        })
    }

    getJobs() {
        return this.list
    }
}