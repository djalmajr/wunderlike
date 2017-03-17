import React from 'react';
import appStyle from './app.scss';
import style from './todoweb.scss';
import Todos from './containers/todo-list';

const App = () => <Todos todosStyle={{ style, appStyle }} />;

export default App;
