import { Module, forwardRef } from '@nestjs/common';
import { CoreModule } from '../core/core.module';
import { NotificationsService } from './notifications.service';
import { ReceiptsModule } from '../receipts/receipts.module';

@Module({
  imports: [CoreModule, forwardRef(() => ReceiptsModule)],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
