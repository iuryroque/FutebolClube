import * as express from 'express';
import LoginController from './controllers/LoginController';
import LoginRoutes from './routes/LoginRoutes';
import TeamsRoutes from './routes/TeamsRoutes';
import MatchesRoutes from './routes/MatchesRoutes';
import LeaderBoardRoutes from './routes/LeaderBoardRoutes';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();

    this.app.use('/login', LoginRoutes);
    this.app.use('/teams', TeamsRoutes);
    this.app.use('/matches', MatchesRoutes);
    this.app.use('/leaderboard', LeaderBoardRoutes);

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: 'nada' }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
