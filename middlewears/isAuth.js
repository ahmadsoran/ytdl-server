import jwt from 'jsonwebtoken'
const isAuth = async (req, res, next) => {

  const getToken = req.headers.authorization
  try {
    const user = jwt.verify(getToken, process.env.PRV_KEY);
    req.user = user;
    console.log('auted');
    return next();
  } catch (err) {
    console.log(err.message);
    return res.status(401).json(err.message);
  }
};

export default isAuth;
