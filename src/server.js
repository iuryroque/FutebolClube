const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const LoginRoutes = require('./routes/LoginRoutes');
const CategoriesRoutes = require('./routes/CategoriesRoutes');
const PostsRoutes = require('./routes/PostsRoutes');
require('dotenv').config();

const PORT = process.env.API_PORT || 3000;

const app = express();
app.use(express.json());

app.use('/user', UserRoutes);
app.use('/login', LoginRoutes);
app.use('/categories', CategoriesRoutes);
app.use('/post', PostsRoutes);

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
