import express, { type Express } from 'express';
import routes from './routes';

const app: Express = express();

app.use(express.json());
app.use(routes);

app.all('*', (req, res) => {
	res.status(404).json({
		message: 'Not found',
	});
});

export default app;
