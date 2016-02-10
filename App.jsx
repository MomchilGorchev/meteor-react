// App component - represents the whole app
App = React.createClass({

    mixins: [ReactMeteorData],

    getMeteorData(){
        return {
            tasks: Tasks.find({}, {sort: {createdAt: -1}}).fetch()
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

    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List</h1>
                </header>
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