import { z } from 'zod';

export const HealthResponseSchema = z.object({
  ok: z.boolean(),
  service: z.literal('coldtrace-api'),
  ts: z.string().datetime(),
});
export type HealthResponse = z.infer<typeof HealthResponseSchema>;

export const OrderStatus = z.enum([
  'DRAFT',
  'QUOTED',
  'CONFIRMED',
  'DISPATCHED',
  'IN_TRANSIT',
  'DELIVERED',
  'SETTLED',
  'CANCELLED',
]);
export type OrderStatus = z.infer<typeof OrderStatus>;

export const ORDER_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ['QUOTED', 'CANCELLED'],
  QUOTED: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['DISPATCHED', 'CANCELLED'],
  DISPATCHED: ['IN_TRANSIT', 'CANCELLED'],
  IN_TRANSIT: ['DELIVERED'],
  DELIVERED: ['SETTLED'],
  SETTLED: [],
  CANCELLED: [],
};

export function canTransitionOrder(from: OrderStatus, to: OrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[from].includes(to);
}

export const WaybillStatus = z.enum([
  'ASSIGNED',
  'PICKED_UP',
  'IN_TRANSIT',
  'DELIVERED',
  'SETTLED',
  'CANCELLED',
]);
export type WaybillStatus = z.infer<typeof WaybillStatus>;

export const WAYBILL_STATUS_TRANSITIONS: Record<WaybillStatus, WaybillStatus[]> = {
  ASSIGNED: ['PICKED_UP', 'CANCELLED'],
  PICKED_UP: ['IN_TRANSIT', 'CANCELLED'],
  IN_TRANSIT: ['DELIVERED', 'CANCELLED'],
  DELIVERED: ['SETTLED'],
  SETTLED: [],
  CANCELLED: [],
};

export function canTransitionWaybill(from: WaybillStatus, to: WaybillStatus): boolean {
  return WAYBILL_STATUS_TRANSITIONS[from].includes(to);
}

export const TemperatureZone = z.enum(['FROZEN', 'CHILLED', 'AMBIENT']);
export type TemperatureZone = z.infer<typeof TemperatureZone>;

export const RoleCode = z.enum(['ADMIN', 'DISPATCHER', 'FINANCE', 'DRIVER']);
export type RoleCode = z.infer<typeof RoleCode>;