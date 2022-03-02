# Food-app

This project was created in React. Inspiration was the task during the course on udemy. I did it on my own without instructor code. Adapted for mobile devices using media queries.

## There is no database used in this project.

## Homepage

![image](https://user-images.githubusercontent.com/33083829/156432768-fc583c1d-6671-4bdc-a506-326f19bda60a.png)


## Cart

Cart without any items added.
![image](https://user-images.githubusercontent.com/33083829/156433069-d9daac51-0d07-4ced-aa39-5176038a8446.png)

Cart with some items.
![image](https://user-images.githubusercontent.com/33083829/156433202-954460a8-c3c9-4295-8fe2-9fcedc84f529.png)


## How Cart works?

When adding something to cart it dynamically change the number of items and calculating total amount. If there's nothing added button 'Order' is not displayed. This component is rendered via Portal in separate div with id='modal-cart'.

Before adding something into the cart we can define amount of meals.

## Simple validation.

Validation is quite simple just to practise. It triggers everytime when user try to add something into the cart. If the amount is < 0 and > 5 error occurs.

![image](https://user-images.githubusercontent.com/33083829/156434527-847c9196-5d23-406d-9ab2-cf2471790bbc.png)


## This web app is mobile friendly. This is how it looks on Iphone XR.

![image](https://user-images.githubusercontent.com/33083829/156435195-841e404c-1ca9-4b5c-b52b-2379390581c7.png)
![image](https://user-images.githubusercontent.com/33083829/156435705-13449ff8-8988-4c9a-aa86-cdb67cb5405f.png)
![image](https://user-images.githubusercontent.com/33083829/156435437-fcf77869-cf75-40be-833a-9834c72c730b.png)
![image](https://user-images.githubusercontent.com/33083829/156435523-6aaa4483-d463-4dbc-8cfb-3a8afd9dbe51.png)

