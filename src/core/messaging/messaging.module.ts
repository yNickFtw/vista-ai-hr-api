import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AddAnalysisToQueue } from "./producers/add-analysis-to-queue";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'ANALYSIS_SERVICE',
                transport: Transport.RMQ,
                options: {
                    urls: [`amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`],
                    queue: 'analysis_queue',
                    queueOptions: {
                        durable: true,
                    },
                }
            }
        ])
    ],
    providers: [
        AddAnalysisToQueue
    ],
    exports: [
        AddAnalysisToQueue
    ]
})
export class MessagingModule {}