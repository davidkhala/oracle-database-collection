import {ContainerManager} from '@davidkhala/docker/docker.js'
import {docker} from "./recipe.js";
import ConnectionManager from "../connection.js";

describe('docker:localhost', function () {
    this.timeout(0)
    const containerManager = new ContainerManager()
    const password = 'password'
    const username = 'sys'
    const domain = 'localhost'
    let stop
    before(async () => {
        stop = await docker(containerManager, {password})
    })
    after(async () => {
        await stop()
    })
    it('', async () => {
        const db = new ConnectionManager({domain, username, password})
        await db.connect()
        await db.disconnect()


    })
})