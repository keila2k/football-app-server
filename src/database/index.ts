const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE } = process.env;

export const dbConnection = {
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
