import { combineReducers } from 'redux';
import currentUserReducer from './slices/currentUserSlice';
import appConfigReducer from './slices/configurationSlice';
import gatsbyInstallReducer from './slices/gatsbyInstallSlice';
import publicationsReducer from './slices/publicationsSlice';
import nodeCheckReducer from './slices/nodeCheckSlice';
import currentViewReducer from './slices/currentViewSlice';
import projectsReducer from './slices/projectsSlice';

const rootReducer = combineReducers({
  currentUser: currentUserReducer,
  appConfig: appConfigReducer,
  nodeCheck: nodeCheckReducer,
  gatsbyInstall: gatsbyInstallReducer,
  publications: publicationsReducer,
  currentView: currentViewReducer,
  projects: projectsReducer,
});

// export state to use with selectors
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
