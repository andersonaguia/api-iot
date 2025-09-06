import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RelayScheduleService  implements OnModuleInit{
  private readonly logger = new Logger(RelayScheduleService.name);
  private relayStatus: boolean = false;

  onModuleInit() {
    this.setInitialRelayStatus();
  }

  private setInitialRelayStatus() {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();

    // Exemplo: ativo entre 17:30 e 05:30
    const after1730 = hour > 17 || (hour === 17 && minute >= 30);
    const before0530 = hour < 5 || (hour === 5 && minute < 30);

    this.relayStatus = after1730 || before0530;

    this.logger.debug(
      `Starting relayStatus=${this.relayStatus} at ${now.toLocaleString(
        'pt-BR',
      )}`,
    );
  }

  // todos os dias às 17:30
  @Cron('45 17 * * *') 
  setRelayTrue() {
    this.relayStatus = true;
    this.logger.debug('Relay status set to TRUE at 17:45pm');
  }

  // todos os dias às 05:30
  @Cron('30 05 * * *') 
  setRelayFalse() {
    this.relayStatus = false;
    this.logger.debug('Relay status set to FALSE at 05:30am');
  }

  getRelayStatus(): boolean {
    console.log("status: ", this.relayStatus);
    return this.relayStatus;
  }
}


