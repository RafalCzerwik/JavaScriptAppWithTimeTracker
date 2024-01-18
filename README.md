# JavaScriptAppWithTimeTracker
 App with TimeTracker

# To-Do List API Integration

## API Key and Host

Before using the code, replace the placeholder values with your actual API key and API host:

```javascript
const apikey = 'YOUR_API_KEY';
const apihost = 'https://todo-api.coderslab.pl';

Functions
1. apiListTasks()
Lists all tasks.
2. apiListOperationsForTask(taskId)
Lists all operations for a specific task.
3. apiCreateTask(title, description)
Creates a new task.
4. apiDeleteTask(taskId)
Deletes a task.
5. apiCreateOperationForTask(taskId, description)
Creates a new operation for a specific task.
6. apiUpdateOperation(operationId, description, timeSpent)
Updates an operation.
7. apiDeleteOperation(operationId)
Deletes an operation.
8. apiUpdateTask(taskId, title, description, status)
Updates a task.
9. renderTask(taskId, title, description, status)
Renders HTML representation of a task.
10. renderOperation(operationList, status, operationId, operationDescription, timeSpent)
Renders HTML representation of an operation.
11. formatTime(timeSpent)
Formats time in minutes to hours and minutes.


Usage
1. Replace the placeholder values in the code with your API key and API host.
2. Ensure your HTML file includes a main container for rendering tasks:

<body>
    <main></main>
    <!-- Other HTML content -->
</body>

3. Add the necessary buttons and forms in your HTML to trigger the API functions.
4. Initialize the tasks on page load:

document.addEventListener('DOMContentLoaded', function() {
    apiListTasks().then(
        function(response) {
            response.data.forEach(
                function(task) {
                    renderTask(task.id, task.title, task.description, task.status); 
                }
            );
        }
    );
});


Important Note
Always handle errors appropriately by checking the response status and displaying error messages to the user.
Feel free to modify the code based on your specific requirements and UI design.