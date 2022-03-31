# Dema planner

## Description
Dema planner is a meal planning app that utilizes locally available foods to create balanced diets. There are a lot of meal planning and food tracking apps that exists today. After intensive research, we realized that they all have one drawback in common; they do not consider the food's availability in the user's region. Thus this formed the motivation behind the development of this application.

Since to implement the system required the basic functionalities like meal planning to work, we decided to build the system from the ground up. However, our goal is not to re-invent another system but to show how the option of food availability can be added to the planning system. In addition to this, also add more functionalities to help the users plan their meals with ease.

## The United Nations Sustainable Development Goals (SGDs)
The 17 UN SGDs are goals to be solved to ensure that ... Dema planner, or simply Dema, is a project trying to provide a solution to 2 of the 17 goals; ```zero hunger``` & ```good health and well being```.

### 1. Zero hunger
As clearly stated, the goal is to end hunger, achieve food security and improved nutrition and promote sustainable agriculture. Project Dema primarily focusses on promoting improved nutrition by generating balanced diets to users using locally available foods.

### 2. Good health and well being
The goal here is to ensure healthy lives and promote well-being for all at all ages. The Dema project aims at creating awareness among users on the health benefits of their local foods and take advantage of the fact to lead healthy lives.

## The problem
It is a well known fact that malnutrition is still a problem in many countries and societies. Malnutrition leads to individuals with poor health and emergence of diet-related diseases. In a research we carried out last year (2021), we realized that majority of the people facing problems resulting from malnutrition have access to affordable nutritious food. After the discovery, one of our members decided to do further research on the topic using university students as the primary subjects. The research yielded good results. We realized that the leading factors to why most people lead unhealthy lives is due to the following three reasons:

1. Lack of time to decide/plan their meals.
2. Lack of awareness on healthy diets and healthy living.
3. Unaffordable foods.

Taking an example of university students, they get less time to plan their meals due to studies and other activities. With no deeper knowledge of the kinds of foods available locally and some of the foods being unaffordable, they resolve in consuming cheaper and less nutritious meals everyday which most of them cannot be considered as healthy diets, according to the National Guidelines for Healthy Diets and Physical Activity in Kenya. As computer science students, we realized we could leverage technology and at least try to solve the problem facing the people in our region.

## The solution
For now, the Dema planner app provides two main things to the users (dubbed as consumers):

1. Creating balanced diets containing the three main nutrients; proteins, carbohydrates and vitamins, from locally available foods. This is aimed at simplifying the process of planning meals.
2. Provide the user with a list of locally available foods in his/her region. This is aimed at creating awareness of foods available locally.
3. Provide eatery suggestions where the user can view the cost of each food in the meal generated in a particular eatery/restaurant. This is aimed at helping users plan the costs of the meals ahead of time.

There are two types of users, consumer and eatery. Consumers are typical users who want to use the app to create meal plans and view local foods. Eaterys are simply restaurant owners looking to advertise their business in the app. The main reason however of adding these users is to access their menus and calculate the cost of meals for the consumers. The consumers have an option of booking seats ahead of time if they prefer to have their meal in the suggested eatery.

## Features and functionalities
The major features and functionalities of the app include:

1. Meal planning system.
2. View of foods available in the user's region.
3. View of nearby eateries and booking of seats.
4. Registering of eateries and uploading their menus to share with consumers.

## Technology
As a team we decided to build a web application first with the frontend which was made with ```vuejs```:

1. ```vuetify``` for the UI and UX.
2. ```vuex``` for state management.

The backend of the app is purely made of firebase products:

1. ```authentication``` to authenticate users.
2. ```firestore``` for storing app data.
3. ```storage``` for storing app media.
4. ``hosting`` for hosting the app.

The end result is a Progressive Web Application (PWA) which is installable in desktop and mobile devices using Google Chrome.

## Project setup for local development
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Testing
Within the three months that we have been developing this prototype, we have managed to amerse over 10 active users who were constantly using the app and suggesting areas of improvement. Feedback was mainly collected by individuals in our team through whatsapp since we did not have an official email to submit responses. Suggestions ranging fromthe UI of the app to functionalities to add to the app were considered and added.

## Deployment
The deployed site is available here at [Dema planner](demaplanner.app). For installation, follow the following steps:

### Desktop
1. Open the above link in Chrome
2. On the right side of the search bar you will see an installation icon
3. Click the icon then click ```install```

### Phone

## Drawbacks
Due to the wide natire of the project, we encountered some drawbacks along the way some of which we did not get enough time to solve.

1. It was hard to find a public database containing all of the local foods data and an API to fetch the data. We created a small database containing upto 15 local foods available in ```Kilifi, Kenya```. Some fields are filled with random values. The purpose was to help us in the testing process while we build a permanent database with realistic values.
2. The data is set to work with people around Kilifi, Kenya. Ensure to set the ```Town``` field to ```Kilifi``` and ```Country``` field to ``Kenya`` (case sensitive) during profile creation in order to view the available foods and nearest eateries in the region. The purpose of this was to ensure that data was filtered based on the user's location.


## Next steps
We know that this is not enough for it to have a real impact to the society. As earlier mentioned, the project is not to create another food tracking app or meal planning system but to add functinalities that solve the needs of the users in our region. For instance, the algorithm used to plan the meals randomly picks these foods in order to create a meal, but with one main goal; to ensure that each meal has a protein, carbohydrate and vitamin food source. Our aim is to improve the algorithm further by considering user's favorite foods, tastes and even consider minor food nutrients such as minerals and fats. One of the solutions for this we have been considering is machine learning. What if we could use machine learning to create the meals? Even more, what if we could use machine learning to suggest foods that a consumer might like to try out based on the previous eating habits? This and more steps are in consideration in order to ensure that the app not only just plans meals but improve a user's health in a more advanced level.

## Authors
1. Silas Jimmy
2. Blain Muema
