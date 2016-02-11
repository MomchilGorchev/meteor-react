/**
 * Created by momchillgorchev on 10/02/16.
 */

Meteor.startup(() => {
    return Meteor.methods({

        /**
         * Save new task
         */
        saveTask(text){

            // If no user logged in throw error
            if(!Meteor.userId()){

                throw new Meteor.Error(401, 'Not authorised');
            }

            // If input
            if(text){

                // Create record
                Tasks.insert({
                    text,
                    createdAt: Date.now(),
                    owner: Meteor.userId(),
                    username: Meteor.user().username
                });
                return true;

            } else {
                // Bad request
                throw new Meteor.Error(400, 'No task content');
            }
        },

        /**
         * Delete task by _id
         */
        deleteTask(id){

            // If input
            if(id){
                Tasks.remove(id);
                return true;

            } else {
                // Bad request
                throw new Meteor.Error(400, 'No id provided');
            }

        },

        /**
         * Toggle checked/completed property
         */
        toggleChecked(id, isChecked){

            // If input
            if(id){
                
                // Set the checked property to the opposite of its current value
                Tasks.update(id, {
                    $set: {checked: isChecked}
                });
                return true;

            } else {
                // Bad request
                throw new Meteor.Error(400, 'No id provided');
            }
        },

        getAllTasks(){


        }

    });
});