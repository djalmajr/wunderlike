import React, { Component } from 'react';
import Menu from '../menu';

class TodosContainer extends Component {
  static propTypes = {
    completedIds: React.PropTypes.array.isRequired,
    uncompletedIds: React.PropTypes.array.isRequired,
    todosStyle: React.PropTypes.object,
  };

  static defaultProps = {
    todosStyle: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      completedIds: props.completedIds || [],
      uncompletedIds: props.uncompletedIds || [],
    };
  }

  render() {
    const { appStyle, style } = this.props.todosStyle;

    return (
      <div className={`${appStyle.flex} ${appStyle.flex1} ${appStyle.flexRow}`}>
        <Menu MenuStyle={Object.assign({}, appStyle, style)} />
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
  }
}


// const mapDispatchToProps = dispatch => ({
//   onRemove: todo => dispatch(actionCreators.removeTodo(todo)),
// });

// export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);
export default TodosContainer;
