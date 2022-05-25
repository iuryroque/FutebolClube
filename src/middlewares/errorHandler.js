module.exports = (error, _req, res, _next) => {
  console.log('message:nada', error);
  res.status(500).json({ message: 'something went wrong' });
};
