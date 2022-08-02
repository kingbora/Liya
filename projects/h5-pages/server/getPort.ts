import net, { AddressInfo } from "net";
import os from "os";

const minPort = 1024;
const maxPort = 65_535;

const getLocalHosts = () => {
  const interfaces = os.networkInterfaces();

  // Add undefined value for createServer function to use default host,
  // and default IPv4 host in case createServer defaults to IPv6.
  const results = new Set([undefined, "0.0.0.0"]);

  for (const _interface of Object.values(interfaces)) {
    if (_interface) {
      for (const config of _interface) {
        results.add(config.address);
      }
    }
  }

  return results;
}

const checkAvailablePort = (basePort: number, host?: string) => {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on("error", reject);

    server.listen(basePort, host, () => {
      const { port } = server.address() as AddressInfo;
      server.close(() => {
        resolve(port);
      });
    });
  });
};

const getAvailablePort = async (port: number, hosts: Set<string | undefined>) => {
  const nonExistentInterfaceErrors = new Set(["EADDRNOTAVAIL", "EINVAL"]);
  /* Check if the post is available on every local host name */
  for (const host of hosts) {
    try {
      await checkAvailablePort(port, host);
    } catch (error) {
      /* We throw an error only if the interface exists */
      if (
        !nonExistentInterfaceErrors.has((error as NodeJS.ErrnoException).code || "")
      ) {
        throw error;
      }
    }
  }

  return port;
}

async function getPort(basePort: number, host?: string) {
  if (basePort < minPort || basePort > maxPort) {
    throw new Error(`Port number must lie between ${minPort} and ${maxPort}`);
  }

  let port = basePort;
  const localhosts = getLocalHosts();
  let hosts: Set<string | undefined>;
  if (host && !localhosts.has(host)) {
    hosts = new Set([host]);
  } else {
    /* If the host is equivalent to localhost
       we need to check every equivalent host
       else the port might falsely appear as available
       on some operating systems  */
    hosts = localhosts;
  }
  const portUnavailableErrors = new Set(["EADDRINUSE", "EACCES"]);
  while (port <= maxPort) {
    try {
      const availablePort = await getAvailablePort(port, hosts);
      return availablePort;
    } catch (error) {
      /* Try next port if port is busy; throw for any other error */
      if (
        !portUnavailableErrors.has((error as NodeJS.ErrnoException).code || "")
      ) {
        throw error;
      }
      port += 1;
    }
  }

  throw new Error("No available ports found");
}

export default getPort;