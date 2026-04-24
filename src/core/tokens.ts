export const EVENT_PUBLISHER = Symbol('EVENT_PUBLISHER');

export type EventPublisher = {
  publish: (event: string, payload: any) => void;
};