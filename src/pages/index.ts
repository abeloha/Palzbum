/**
 * Abel log - 
 * work started feb 17, 2019';
 * connecting to db and updating data started feb 20, 2019';
 */

export const AppVersion = '0.0.1.1';
export const RootUrl = 'http://www.palzbum.com'; //'http://192.168.43.29'
//export const RootUrl = 'http://192.168.43.251'; //'http://192.168.43.29'
export const ApiUrl = RootUrl + '/api';

// The page the user lands on after opening the app and without a session
export const FirstRunPage = 'TutorialPage';

// The main page the user will see as they use the app over a long period of time.
// Change this if not using tabs
export const MainPage = 'ListGridPage';
export const WelcomePage = 'WelcomePage';
// The initial root pages for our tabs (remove if not using tabs)
export const Tab1Root = 'ListMasterPage';
export const Tab2Root = 'SearchPage';
export const Tab3Root = 'SettingsPage';

/**
 *Storage variables:
 not_first_run - true after first run.
 user_id - current id of the user of the app.
 user_password - current password of the user of the app.
 user_email - current email of the user of the app.
 view_list - if list is the  last the user sees.
 current_group_id - current group a user is viewing
 current_group_member_id -
 */
