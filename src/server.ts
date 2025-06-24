import App from "./app";

import "dotenv/config";

import IndexRoute from "./routes/index.route";
import AuthRoutes from "@/routes/auth.route";
import UserRoutes from "@/routes/user.route";
import MovieRoutes from "./routes/movie.route";
import FavoriteRoutes from "./routes/favorite.route";
import ListRoutes from "./routes/list.route";

const application = new App([
	new IndexRoute(),
	new AuthRoutes(),
	new UserRoutes(),
	new MovieRoutes(),
	new FavoriteRoutes(),
	new ListRoutes(),
]);

application.startServer();

export default application.app;
