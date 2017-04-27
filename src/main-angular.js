// JS dependencies
import 'angular';
import ngSanitize from 'angular-sanitize';
import ngAria from 'angular-aria';
import ngRedux from 'ng-redux';
import ReduxThunk from 'redux-thunk';

// State
import reducer from './state/reducer';

// Routing
import {
	router,
	routerMiddleware,
} from './state/routing';

const app = angular.module('website', [
				ngSanitize, ngAria, ngRedux,
			])
			.config(['$ngReduxProvider',
				($ngReduxProvider) => {
					$ngReduxProvider.createStoreWith(
						reducer,
						[
							ReduxThunk,
							routerMiddleware,
						],
						[]
					);
				}
			])
			.run(() => {
				setTimeout(() => {
					router.start();
				}, 1);
			});

// Main Component
import { MainComponent } from './mainComponent/MainComponent';
import mainTpl from './mainComponent/main.tpl.jade';
app.component('dvMain', {
	template: mainTpl,
	controller: ['$ngRedux', MainComponent],
});

angular.element(document).ready(() => {
	angular.bootstrap(document, ['website']);
});


