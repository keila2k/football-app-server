import 'dotenv/config';
import App from './app';
import AuthRoute from './routes/auth.route';
import IndexRoute from './routes/index.route';
import UsersRoute from './routes/users.route';
import validateEnv from './utils/validateEnv';
import PredictionsRoute from './routes/predictons.route';
import StandingsRoute from './routes/standingsRoute';
import ScoresRoute from './routes/scores.route';
import GeneralRoute from './routes/general.route';
import MatchesRoute from './routes/matches.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new PredictionsRoute(),
  new StandingsRoute(),
  new ScoresRoute(),
  new GeneralRoute(),
  new MatchesRoute()
]);

app.listen();
