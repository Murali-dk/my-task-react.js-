import {Component} from 'react'
import {v4 as uuid} from 'uuid'

import Tags from '../Tags'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class Home extends Component {
  state = {
    taskList: [],
    createTask: '',
    selectOption: tagsList[0].optionId,
    activeTag: 'INITIAL',
  }

  renderTasks = filterList => {
    const {taskList} = this.state
    console.log(taskList)

    if (filterList.length > 0) {
      return (
        <ul>
          {filterList.map(eachItem => (
            <li>
              <p>{eachItem.name}</p>
              <p>{eachItem.opt}</p>
            </li>
          ))}
        </ul>
      )
    }
    return <p>No Tasks Added Yet</p>
  }

  sumbitedForm = event => {
    event.preventDefault()
    const {createTask, selectOption} = this.state
    const details = {
      id: uuid(),
      name: createTask,
      opt: selectOption,
    }
    this.setState(prevState => ({
      taskList: [...prevState.taskList, details],
      createTask: '',
      selectOption: tagsList[0].optionId,
    }))
  }

  userInput = event => {
    this.setState({createTask: event.target.value})
  }

  selectChange = event => {
    this.setState({selectOption: event.target.value})
  }

  btnClick = id => {
    this.setState({activeTag: id})
  }

  render() {
    const {createTask, selectOption, activeTag, taskList} = this.state

    const filterList =
      activeTag === 'INITIAL'
        ? taskList
        : taskList.filter(eachItem => eachItem.opt === activeTag)

    return (
      <div className="bg-cont">
        <div className="card1">
          <h1 className="h1">Create a task</h1>
          <form onSubmit={this.sumbitedForm}>
            <div>
              <label className="label" htmlFor="TASK">
                Task
              </label>
              <input
                id="TASK"
                value={createTask}
                placeholder="Enter the task here"
                onChange={this.userInput}
              />
            </div>
            <div>
              <label htmlFor="TAGS">Tags</label>
              <select
                onChange={this.selectChange}
                id="TAGS"
                value={selectOption}
              >
                {tagsList.map(eachItem => (
                  <option key={eachItem.optionId} value={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="task-button">
              Add Task
            </button>
          </form>
        </div>
        <div className="card2">
          <h1>Tags</h1>
          <ul className="tags-list">
            {tagsList.map(eachItem => (
              <Tags
                key={eachItem.optionId}
                btnClick={this.btnClick}
                eachItem={eachItem}
              />
            ))}
          </ul>
          <h1>Tasks</h1>
          <p>Tag</p>
          {this.renderTasks(filterList)}
        </div>
      </div>
    )
  }
}

export default Home
