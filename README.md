# Refurbish Goods Marketplace

[Live Demo](https://refurbished-goods-marketplace-app.onrender.com)

## Description

This is a MERN Stack Website which allows users to buy or sell their refurbished stuff by placing bids. Many modern technologies are used in this project including React, Node JS, Express JS, Mongoose, jsonwebtoken JWT, Tailwind CSS, Ant Design, Multer, Stripe, Cloudinary,...

## Getting started

### Installing

- We need to install all dependencies for both client and server side before running the website. After downloading the code, from your terminal, run the code `npm run build` to install all dependencies in both server and client side.
- Next, we have to config enviroment using your own Cloudinary account including `cloud_name, api_key, api_secret` and `mongoDB url` to connect database as well.

### Run Program

To run the website, you need to run server firstly by running this command `npm run start`. After the server has started, you jump into client folder by running command `cd client` and then run `npm run start` to start the website.

## Technologies

- HTML, CSS, Tailwind CSS, Ant Design
- React JS, Node JS, Express
- RESTful API, Mongoose, Multer
- Cloudinary, JsonWebtoken JWT

## Features

- Fully Responsive Website.
- Upload and access files to/from Cloudinary.
- Manage all products, users, bids with CRUD.
- Secure payment with Stripe.
- Send notificaton for each change of status on products, users, bids.
- Secure user signing up and logging in with jsonwebtoken(JWT).

## Usage

- There are two type of users: `admin` and `user`
- Admin account: `email: admin@gmail.com; password: 123`
- User account: `email: user@gmail.com; password: 123`
- Admin role: can manages all products, users and makes new bid as well.
- User role: can add their own products for selling(but need aproval from admin) and make bids for buying.
- Notification will be delivered to admin and user whenever a new product added by users and approved/blocked by admin. Whenever a bid was made or accepted, the notification will also be sent to seller/buyer.
