# Separation of concerns

### Spaghetti Code
Writing an application where there is no separation between DOM elements, and in particular the views, and the data behind, the model can lead to a lot of headache when it comes to adding functionality or changing current behaviors.

When the views talks directly to the model, without distinguishing who is doing what, we are in front of a spaghetti code.

### How to fix it
To fix "Spaghetti Code" there are two routes we could take:
- Refactor current code
- Burn it down and write new organized code

The first solution requires refactoring and readjusting piece by piece the current code, separating the concerns between views and model.

With the second method we basically rewrite the functionality from scratch.


### Who is doing what?
When we separate concerns we basically have three pieces in our application:
1. The model
2. The view/s
3. The octopus

#### The model
The model is where the data consumed by the application is stored. Can be an object, a list, a database, local storage, anything meant to store data.


#### The views
The views will be responsible of rendering and initiating DOM elements. Anything that will manipulate the front-end, like updating the rendered values, will reside in the `views`.
Views don't have direct link with the model as the views should be responsible only of talking with the DOM.


#### The octopus
The octopus is the link between model and view. It is responsible of gathering the data from the model and passing to the view and vice versa, get new values from the views and update the model.
