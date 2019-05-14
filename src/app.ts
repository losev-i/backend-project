import koa from 'koa';
import routes from './routes';
import mount from 'koa-mount';

import mongoose, { Schema } from 'mongoose';

const app = new koa();


mongoose.connect('mongodb://localhost/backend-project', {
    useNewUrlParser: true
});
mongoose.set('useCreateIndex', true);

app.listen(3000);
console.log('server running on port 3000');
