import {OCI} from '@davidkhala/container/oci.js';
import {OCIContainerOptsBuilder} from '@davidkhala/container/options.js';

/**
 * provision time 128 seconds
 * @param {OCI} manager
 * @param HostPort
 * @param password POSTGRES_PASSWORD (env)
 * @param {Object} postgres_envs
 */
export async function docker(manager, {HostPort=1521, password}) {
	const Image = 'container-registry.oracle.com/database/free';
	const name = 'oracle';

	const opts = new OCIContainerOptsBuilder(Image);

	opts.setPortBind(`${HostPort}:1521`);
	opts.name = name;
	opts.env = [`ORACLE_PWD=${password}`];
	await manager.containerStart(opts.opts, true);
	await manager.containerWaitForHealthy(name);
	return async () => manager.containerDelete(name);
}