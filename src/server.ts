import App from "./app";

import "dotenv/config";

import IndexRoute from "./routes/index.route";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.route";
import MovieRoute from "./routes/movie.route";
import WatchlistRoute from "./routes/watchlist.route";

const application = new App([
	new IndexRoute(),
	new AuthRoute(),
	new UserRoute(),
	new MovieRoute(),
	new WatchlistRoute(),
]);

application.startServer();

export default application.app;
