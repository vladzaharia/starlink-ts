/**
 * Type definitions and exports for the Starlink SDK
 *
 * This module provides normalized type names by removing redundant service prefixes.
 * For example:
 * - DishGetContextResponse → GetContextResponse
 * - WifiGetClientsResponse → GetClientsResponse
 * - TransceiverGetStatusResponse → GetStatusResponse
 *
 * The proto-generated types are kept unchanged in the generated/ directory,
 * but we provide clean aliases here for the public API.
 */

export type { StarlinkClientConfig, NormalizedClientConfig } from './ClientConfig';

// Proto-generated types (namespaced to avoid conflicts)
export * as Dish from '../../lib/ts/device/dish_pb';
export * as WiFi from '../../lib/ts/device/wifi_pb';
export * as Transceiver from '../../lib/ts/device/transceiver_pb';
export * as Device from '../../lib/ts/device/device_pb';
export * as Common from '../../lib/ts/device/common_pb';
export * as Status from '../../lib/ts/common/status/status_pb';
