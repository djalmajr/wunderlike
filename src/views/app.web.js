import React from 'react';
import classNames from 'classnames';
import appStyle from './app.scss';
import style from './todoweb.scss';

const App = () => (
  <div className={`${appStyle.flex} ${appStyle.flex1} ${appStyle.flexRow}`}>
    <div className={`${style.side} ${appStyle.flex} ${appStyle.flexCol}`}>
      <header className={`${style.sideHeader}`}>
        <i className="content icon" style={{ color: 'white', fontSize: '1.3em' }} />
      </header>
      <section className={`${appStyle.flex1}`}>
        <ul>
          <li className={`${style.sidebarItem}`}>
            <a href="#/lists/listname" className={`${appStyle.flex} ${appStyle.flexJustifyBetween} ${appStyle.flexAlignItemsCenter}`}>
              <i className={`unordered list icon ${style.listIcon}`} />
              <span className={`${style.listTitle} ${appStyle.flex1}`}>Lista de Compras</span>
              <span className={`${style.listCounter}`}>4</span>
            </a>
          </li>
          <li className={`${style.sidebarItem}`}>
            <a href="#/lists/listname" className={`${appStyle.flex} ${appStyle.flexJustifyBetween} ${appStyle.flexAlignItemsCenter}`}>
              <i className={`unordered list icon ${style.listIcon}`} />
              <span className={`${style.listTitle} ${appStyle.flex1}`}>Lista de coisas a fazer</span>
              <span className={`${style.listCounter}`}>4</span>
            </a>
          </li>
        </ul>
      </section>
      <footer className={`sidebar-actions ${style.footerSidebarList} ${appStyle.flex} ${appStyle.flexJustifyBetween} ${appStyle.flexAlignItemsCenter}`}>
        <a href="#/create/list" className={`${appStyle.flex} ${appStyle.flexJustifyBetween} ${appStyle.flexAlignItemsCenter}`}>
          <i className={`plus icon ${style.sideActionIcon}`} />
          <span className={`${appStyle.flex1} ${style.sideActionTitle}`}>Criar lista</span>
        </a>
      </footer>
    </div>
    <div className={`taskslist ${appStyle.flex} ${appStyle.flexCol} ${appStyle.flex1}`}>
      <header className={`${style.taskslistHeader} ${appStyle.flex}`}>
        <h2>Lista de Compras</h2>
      </header>
      <section className={`${style.taskScroll}`}>
        <div className={`${style.addTask}`}>
          <a href="#/addTask">
            <i className="plus icon" />
          </a>
          <input type="text" placeholder="Adicionar uma tarefa" />
        </div>
        <div className="tasklist">
          <div className="tasksPending">
            <ul>
              <li className={`${style.tasksPendingItem} ${appStyle.flex} ${appStyle.flexJustifyBetween} ${appStyle.flexAlignItemsCenter}`}>
                <span className="taskCheckbox">
                  <a href="#/checktask/"><i className="square outline icon" /></a>
                </span>
                <span className={`taskTitle ${appStyle.flex1}`}>
                  Comprar coias pra escritório
                </span>
                <span className="taskFavoriteIcon">
                  <a href="#/favoriteTask/id">
                    <i className="empty star icon" />
                  </a>
                </span>
              </li>
              <li className={`${style.tasksPendingItem} ${appStyle.flex} ${appStyle.flexJustifyBetween} ${appStyle.flexAlignItemsCenter}`}>
                <span className="taskCheckbox">
                  <a href="#/checktask/"><i className="square outline icon" /></a>
                </span>
                <span className={`taskTitle ${appStyle.flex1}`}>
                  Comprar livros
                </span>
                <span className="taskFavoriteIcon">
                  <a href="#/favoriteTask/id">
                    <i className="empty star icon" />
                  </a>
                </span>
              </li>
            </ul>
          </div>
          <p className={`${style.comletedTaskHiddingContent}`}>
            <a href="#/tasklist/list/completed" className={`${style.comletedTaskHidding}`}>Exibir tarefas pendentes concluidas</a>
          </p>
          <div className={`${style.showTasksCompleted}`}>
            <ul>
              <li className={`${style.tasksCompleted} ${appStyle.flex} ${appStyle.flexJustifyBetween} ${appStyle.flexAlignItemsCenter}`}>
                <span className="taskCheckbox">
                  <a href="#/checktask/"><i className="checkmark box icon" /></a>
                </span>
                <span className={`${style.taskCompletedTitle} ${appStyle.flex1}`}>
                  Comprar coisas de natal
                </span>
                <span className="taskFavoriteIcon">
                  <a href="#/favoriteTask/id">
                    <i className="star icon" style={{ color: 'gold' }} />
                  </a>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
);

export default App;
