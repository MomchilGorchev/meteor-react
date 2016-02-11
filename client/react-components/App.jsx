// App component - represents the whole app
App = React.createClass({

    // Make use of meteor reactive data source
    mixins: [ReactMeteorData],

    // Geter method for the collection data
    getMeteorData(){

        // Create buffer variable
        let query = {};

        // Show only non-completed if the checkbox is checked
        if(this.state.hideCompleted){
            query = {checked: {$ne: true}};
        }

        // Return necessary data
        return {
            tasks: Tasks.find(query, {sort: {createdAt: -1}}).fetch(),
            incompleteCount: Tasks.find({checked: {$ne: true}}).count(),
            currentUser: Meteor.userId()
        };
    },

    // Render individual tasks
    renderTasks() {
        return this.data.tasks.map((task) => {
            // Pass props to the child class
            return <Task key={task._id} task={task} />;
        });
    },

    // Event handler for when new taks is created
    handleSubmit(event){
        event.preventDefault();

        // Cache element
        let el = React.findDOMNode(this.refs.textInput);
        // Get input value
        let text = el.value.trim();

        Meteor.call('saveTask', text, (err, res) => {

            err ? console.log(err) : res ? el.value = '' : console.log(res);
        });
    },

    // Default switch state
    getInitialState() {
        return {
            hideCompleted: false
        };
    },

    // Element state setter
    toggleHideCompleted(){
        this.setState({
            hideCompleted: ! this.state.hideCompleted
        });
    },

    // Render the component
    render() {
        return (
            <div className="container">
                <header>
                    <h1>Todo List ({this.data.incompleteCount})</h1>

                    <AccountsUIWrapper />

                </header>

                <label className="hide-completed">
                    <input
                        type="checkbox"
                        readOnly={true}
                        checked={this.state.hideCompleted}
                        onClick={this.toggleHideCompleted} />
                    Hide Completed Tasks
                </label>
                {this.data.currentUser ?


                    <form className="new-task" onSubmit={this.handleSubmit}>
                        <input
                            type="text"
                            ref="textInput"
                            placeholder="Type to add new tasks"/>
                    </form> : ''
                }
                <ul>
                    {this.renderTasks()}
                </ul>
            </div>
        );
    }
});
