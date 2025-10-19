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
export * as Dish from '../../generated/spacex_api/device/dish_pb';
export * as WiFi from '../../generated/spacex_api/device/wifi_pb';
export * as Transceiver from '../../generated/spacex_api/device/transceiver_pb';
export * as Device from '../../generated/spacex_api/device/device_pb';
export * as Common from '../../generated/spacex_api/device/common_pb';
export * as Status from '../../generated/spacex_api/common/status/status_pb';
