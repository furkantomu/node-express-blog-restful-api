# node-express-blog-restful-api

### API END-POINT
#
###### POSTS
- POST LIST (GET): https://blog-app-node-restfulapi.herokuapp.com/api/posts
- CREATE POST (POST): https://blog-app-node-restfulapi.herokuapp.com/api/posts
- UPDATE POST (PUT): https://blog-app-node-restfulapi.herokuapp.com/api/posts/{_id}
- DELETE POST (DELETE): https://blog-app-node-restfulapi.herokuapp.com/api/posts/{_id}
#
#
##### AUTH
- AUTH REGISTER (POST): https://blog-app-node-restfulapi.herokuapp.com/api/auth/register
- AUTH LOGIN (POST): https://blog-app-node-restfulapi.herokuapp.com/api/auth/login
#
#
##### USER
- GET USER (GET): https://blog-app-node-restfulapi.herokuapp.com/api/users/{_id}
- USER UPDATE (PUT): https://blog-app-node-restfulapi.herokuapp.com/api/users/{_id}
- USER DELETE (DELETE): https://blog-app-node-restfulapi.herokuapp.com/api/users/{_id}
#
#
##### CATEGORY
- ADD CATEGORY (POST): https://blog-app-node-restfulapi.herokuapp.com/api/category
- GET CATEGORY (GET): https://blog-app-node-restfulapi.herokuapp.com/api/category
#

### API SCHEMA
#
MONGODB POST SCHEMA:
```javascript

import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    image: { type: String, required: false },
    username: { type: String, required: true },
    categories: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Posts", postSchema);

export default Post;
```
#
MONGODB USER SCHEMA:
```javascript

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: "" },
},{
  timestamps:true
});

const User = mongoose.model('Users',userSchema);

export default User;
```
#
MONGODB CATEGORY SCHEMA:
```javascript

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
```

