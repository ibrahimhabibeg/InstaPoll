# Design Decisions

The purpose of this document is to discuss certain decisions on both the requirements and the design of the system. This is a live document and will be updated as the project progresses. This document will include a list of questions on weather a certain feature should be implemented or not, and the reasoning behind the decision. Moreover, it will include a list of implementation questions. The reasoning behind the answer for all questions will be documented here.

## About the App

InstaPoll is a simple polling app that allows users to create and vote on polls. Users can create a poll by entering a question and a list of options. Once a poll is created, users can share the poll with others and vote on it. The poll results are displayed in real-time, allowing users to see the current results of the poll. The app's main theme is simplicity and speed, allowing users to create and vote on polls quickly and easily without the need to create an account or log in. It is designed to be a fun and engaging way for instructors and presenters to gather feedback from their audience in real-time and add an interactive element to their presentations.

## Main Requirements

- The app must be able to handle user votes without the users logging in or creating an account.
- The app must be able to display the poll results in real-time.
- The app must be able to display the poll results in a visually appealing way.
- The app must be able to handle multiple polls at the same time.
- Audience members can join a poll by entering a unique code or scanning a QR code.

## Requirements Questions

### Should the app allow people other than the poll creator to edit the poll options and view the results? How tight should the security be?

This application is intended to be used in real-time presenations. These presentations will include hundereds of listeners implying that its impossible for the presenter to know and trust all of them. If some guy in the audience happens to hate the presenter, he may try to destroy the show by changing the question to an inappropriate one, or he can flip the answers to make the results look ridiculous.

We can't allow this to happen. Only the presenter shall be allowed to edit the poll options.

One might think that we ban the poll options to be edited after the poll is created. But this is not a good idea. The presenter may make a typo and we would like to help him cover it up. So we should allow the presenter to edit the poll options.

This presents a small implementation challenge. The presenter must be the only one allowed to edit the poll options and at the same time he doesn't need to create an account. We will cover this in the implementation questions.

Now, let's talk about the results. It will be easy for us to allow only the presenter to view the results. This is because we will be implementing a method to identify the presenter anyways, but should we do so?

Well, what is the advantage of keeping it secret? I don't know the presentation will be shown the audience live anyways. If it is to ban people outside the audience from viewing the results, then that won't make much sense. Audience member can record it and share it with the world, and we're not building an app to be used internally in a company. So, we should allow anyone to view the results.

#### Answer

- The app should allow only the poll creator to edit the poll options.
- The app should allow anyone to view the poll results.

### When should the presenter write the question? After creating the poll or before?

If the presenter writes the question after creating the poll, then the audience will see a blank question until the presenter writes it. This is not a good user experience. The presenter should write the question before creating the poll.

#### Answer

- The presenter should write the question before creating the poll.

### Overall App Design and Data Flow

The app will have three main components: a static frontend, a backend server, and an in-memory database.

The frontend will have to be made using vanilla HTML, CSS, and JavaScript. This is a requirement from the clients. We can't use any frontend frameworks like React or Angular.

The backend server will be made using Node.js. We are free here to use any technology we want. We will go with Node.js because the developers are familiar with it.

The in-memory database will be used to store the poll data. We will use Redis for this. Redis is a good choice because it is fast and can handle multiple polls at the same time and we can easily host it for free.

Now let's discuss the user flow. First the user will open the home page. He will have two options: create a poll or join a poll. If he chooses to create a poll, he will be taken to a page where he can write the question and the options. After that, he will be taken to a page where he can see the poll results in real-time. He will also be given a unique code that he can share with the audience. There will be another page that show both the unique code and a QR code that the audience can scan to join the poll.

If the user chooses to join a poll, he will be taken to a page where he can enter the unique code. After that, he will be taken to a page where he can see the poll question and the options. He can vote on the options. Then he will be taken to a page where he can see the poll results in real-time.

Only the presenter will see a button to edit the poll options in the poll results page. When he clicks on it he will be taken to a page where he can edit the poll options.

We will identify the presenter by storing a JWT token in the presenter's local storage. This will define the presenter as the person using the presenter's browser for the time of the vote. We will set a limit of 1 hour for the token to expire, after which the results of the vote will be deleted and the token will be invalidated.

The backend will have to handle the following requests:

- **Create Poll**: Recieves a question and a list of options. Create a unique code and JWT token for the presenter. Store the poll data in the in-memory database. Return the unique code and the JWT token.
- **Join Poll**: Recieves a unique code. Return the poll question and the options.
- **Vote**: Recieves a unique code and the index of the option. Store the vote in the in-memory database and alerts all clients who are viewing the poll results.
- **Update Poll**: Recieves the unique code, JWT token, and the new list of options. Update the poll data in the in-memory database. Alerts all clients who are viewing the poll results.
