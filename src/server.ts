import App from "./app";

import "dotenv/config";

import IndexRoute from "./routes/index.route";
import AuthRoute from "@/routes/auth.route";
import UserRoute from "@/routes/user.route";

const application = new App([
	new IndexRoute(),
	new AuthRoute(),
	new UserRoute(),
]);

application.startServer();

export default application.app;
