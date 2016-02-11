// Task component - represents a single todo item
Task = React.createClass({
    propTypes: {
        // This component gets the task to display through a React prop.
        // We can use propTypes to indicate it is required
        task: React.PropTypes.object.isRequired
    },

    toggleChecked() {
        // Set the checked property to the opposite of its current value
        Meteor.call('toggleChecked', this.props.task._id, (err, res) =>{

            if(err){
                console.log(err);
            }

        });
    },

    deleteThisTask() {
        Meteor.call('deleteTask', this.props.task._id, (err, res) => {
            if(err){
                console.log(err);
            }
        });
    },

    render() {
        // Give tasks a different className when they are checked off,
        // so that we can style them nicely in CSS
        const taskClassName = this.props.task.checked ? "checked" : "";

        return (
            <li className={taskClassName}>
                <button className="delete" onClick={this.deleteThisTask}>
                    &times;
                </button>

                <input
                    type="checkbox"
                    readOnly={true}
                    checked={this.props.task.checked}
                    onClick={this.toggleChecked} />

                <span className="text">
                  <strong>{this.props.task.username}</strong>: {this.props.task.text}
                </span>

            </li>
        );
    }
});