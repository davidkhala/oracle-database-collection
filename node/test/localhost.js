import {ContainerManager} from '@davidkhala/docker/docker.js'
import {docker} from "./recipe.js";
import Oracle from "../connection.js";

describe('docker:localhost', function () {
    this.timeout(0)
    const containerManager = new ContainerManager()
    const password = 'password'
    const domain = 'localhost'
    let stop
    // before(async () => {
    //     stop = await docker(containerManager, {password})
    // })
    // after(async () => {
    //     await stop()
    // })
    it('CDB connect', async () => {
        const username = 'sys'
        const name = 'FREE'
        const db = new Oracle({domain, username, password, name})
        await db.connect()
        await db.disconnect()

    })
    it('PDB connect', async () => {
        const username = 'PDBADMIN'
        const name = 'FREEPDB1'
        const db = new Oracle({domain, username, password, name})
        await db.connect()
        await db.disconnect()

    })
})