import { Inject, Injectable } from '@nestjs/common';
import { EVENT_PUBLISHER } from '../core/tokens';
import type { EventPublisher } from '../core/tokens';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(EVENT_PUBLISHER)
    private readonly publisher: EventPublisher,
  ) {}

  notify(event: string, payload: any) {
    console.log(`[NOTIFY] ${event}`, payload);
    this.publisher.publish(event, payload);
    return { ok: true };
  }
}
