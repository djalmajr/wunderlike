import React from 'react';
import classNames from 'classnames';
import appStyle from './app.scss';
import style from './todoweb.scss';

import Todos from './containers/todos';

const App = () => (<Todos todosStyle={{style, appStyle}} />);

export default App;
