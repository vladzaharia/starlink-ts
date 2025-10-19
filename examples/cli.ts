import { createStarlinkClient, StarlinkError } from '../src';

/**
 * Starlink CLI - Command-line interface for the Starlink SDK
 *
 * Usage:
 *   npx ts-node examples/cli.ts <command> [options]
 *
 * Commands:
 *   device-info      Get device information
 *   device-status    Get device status
 *   dish-status      Get dish status
 *   wifi-status      Get WiFi status
 *   wifi-clients     List connected WiFi clients
 *   location         Get device location
 *   help             Show this help message
 *
 * Options:
 *   --address        Starlink device address (default: 192.168.100.1:9200)
 *   --debug          Enable debug logging
 */

interface CliOptions {
  address?: string;
  debug?: boolean;
}

function parseArgs(): { command: string; options: CliOptions } {
  const args = process.argv.slice(2);
  const command = args[0] || 'help';
  const options: CliOptions = {};

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--address' && args[i + 1]) {
      options.address = args[++i];
    } else if (args[i] === '--debug') {
      options.debug = true;
    }
  }

  return { command, options };
}

function printHelp() {
  console.log(`
Starlink CLI - TypeScript SDK Command-line Interface

Usage:
  npx ts-node examples/cli.ts <command> [options]

Commands:
  device-info      Get device information
  device-status    Get device status
  dish-status      Get dish status
  wifi-status      Get WiFi status
  wifi-clients     List connected WiFi clients
  location         Get device location
  help             Show this help message

Options:
  --address        Starlink device address (default: 192.168.100.1:9200)
  --debug          Enable debug logging

Examples:
  npx ts-node examples/cli.ts device-info
  npx ts-node examples/cli.ts device-status --debug
  npx ts-node examples/cli.ts wifi-clients --address 192.168.1.100:9200
  `);
}

async function getDeviceInfo(client: any) {
  console.log('\n📱 Device Information\n');
  const info = await client.device.getInfo({});
  console.log(info);
}

async function getDeviceStatus(client: any) {
  console.log('\n📊 Device Status\n');
  const status = await client.device.getStatus({});
  console.log(status);
}

async function getDishStatus(client: any) {
  console.log('\n🛰️  Dish Status\n');
  const status = await client.dish.getStatus({});
  console.log(status);
}

async function getWifiStatus(client: any) {
  console.log('\n📶 WiFi Status\n');
  const status = await client.wifi.getStatus({});
  console.log(status);
}

async function getWifiClients(client: any) {
  console.log('\n📱 Connected WiFi Clients\n');
  const clients = await client.wifi.getClients({});
  console.log(clients);
}

async function getLocation(client: any) {
  console.log('\n📍 Device Location\n');
  const location = await client.device.getLocation({});
  console.log(location);
}

async function main() {
  const { command, options } = parseArgs();

  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  const client = createStarlinkClient({
    address: options.address,
    debug: options.debug,
  });

  try {
    await client.waitForReady();

    switch (command) {
      case 'device-info':
        await getDeviceInfo(client);
        break;
      case 'device-status':
        await getDeviceStatus(client);
        break;
      case 'dish-status':
        await getDishStatus(client);
        break;
      case 'wifi-status':
        await getWifiStatus(client);
        break;
      case 'wifi-clients':
        await getWifiClients(client);
        break;
      case 'location':
        await getLocation(client);
        break;
      default:
        console.error(`Unknown command: ${command}`);
        console.log('Run with --help for usage information');
        process.exit(1);
    }

    console.log();
  } catch (error) {
    if (error instanceof StarlinkError) {
      console.error(`\n❌ Starlink Error (${error.code}): ${error.message}`);
    } else if (error instanceof Error) {
      console.error(`\n❌ Error: ${error.message}`);
    } else {
      console.error(`\n❌ Unknown error: ${String(error)}`);
    }
    process.exit(1);
  } finally {
    await client.close();
  }
}

main();
