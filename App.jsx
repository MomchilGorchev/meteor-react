// App component - represents the whole app
App = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData(){

        let query = {};

        if(this.state.hideCompleted){
            query = {checked: {$ne: true}};
        }

        return {
            tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
            incompleteCount: Tasks.find({checked: {$ne: true}}).count()
        };
    },

    getTasks() {
        return [
            { _id: 1, text: "This is task 1" },
            { _id: 2, text: "This is task 2" },
            { _id: 3, text: "This is task 3" }
        ];
    },

    renderTasks() {
        return this.data.tasks.map((task) => {
            return <Task key={task._id} task={task} />;
        });
    },

    handleSubmit(event){
        event.preventDefault();

        let el = React.findDOMNode(this.refs.textInput);
        let text = el.value.trim();

        Tasks.insert({
            text,
            createdAt: Date.now()
        });

        el.value = '';
    },

    getInitialState() {
        return {
            hideCompleted: false
        }
    },

    toggleHideCompleted(){
        this.setState({
            hideCompleted: ! this.state.hideCompleted
        })
    },

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.data.incompleteCount})</h1>
                </header>

                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly={true}
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted} />
                    Hide Completed Tasks
                </label>

                <form className="new-task" onSubmit={this.handleSubmit} >
                    <input
                        type="text"
                        ref="textInput"
                        placeholder="Type to add new tasks" />
                </form>
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});