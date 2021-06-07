import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
  return jwt.sign({
    _id: user._id,
    username:user.username,
    name:user.name,
    surname:user.surname,
    email:user.email,
    password:user.password,
    profilePic:user.profilePic,
  }, process.env.JWT_SCRET || 'somethingsecret', {
    expiresIn:'30d',
  });
};