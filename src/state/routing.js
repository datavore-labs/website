import createRouter from 'router5';
import { router5Middleware, actions } from 'redux-router5';
import historyPlugin from 'router5/plugins/browser';
import listenersPlugin from 'router5/plugins/listeners';

/**
 * The domain state for the router from router5middleware
 * @typedef {Object} RouterState
 */
const routes = [
	{
		name: 'home',
		path: '/',
	}
];

const routerOptions = {
	defaultRoute: 'home',
};

export const router = createRouter(routes, routerOptions)
	.usePlugin(historyPlugin({
		forceDeactivate: true,
		useHash: false,
	}))
	.usePlugin(listenersPlugin());

export const routerMiddleware = router5Middleware(router);

export default {
	router,
	routerMiddleware,
};

export function goToHome() {
	return actions.navigateTo('home');
}
