const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/hello', (req, res) => {
  res.send('hello world');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});