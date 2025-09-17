import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { JwtService } from 'src/core/services/jwt/jwt.service';
import { GetAnalysisByIdUseCase } from 'src/application/use-cases/analysis/get-analysis-by-id';

@WebSocketGateway({
    namespace: 'analysis',
    cors: {
        origin: process.env.VISTA_AI_ORIGIN_APP_URL || 'http://localhost:3004',
    }
})
export class AnalysisGateway implements OnModuleInit {
    @WebSocketServer()
    private server: Server;
    
    constructor(
        private readonly jwtService: JwtService,
        private readonly getAnalysisById: GetAnalysisByIdUseCase
    ) { }

    onModuleInit() {
        this.server.on('connection', async (socket) => {
            const accessToken = socket.handshake.query.accessToken as string;
            const analysisId = socket.handshake.query.analysisId as string;

            if (!accessToken) {
                socket.disconnect();
                return;
            }

            const decoded = this.jwtService.verifyToken(accessToken);

            if (!decoded) {
                socket.disconnect();
            }

            try {
                await this.getAnalysisById.execute(analysisId, decoded.sub);

                socket.join(analysisId);

                socket.on('disconnect', () => {
                    socket.leave(analysisId);
                })
            } catch (error) {
                socket.disconnect();
            }

            socket.on('disconnect', () => {
                socket.leave(analysisId);
            })
        })
    }
}