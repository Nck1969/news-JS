import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    if (!process.env.API_URL || !process.env.API_KEY) {
      throw Error('API_URL or API_KEY is not defined');
    }

    super(process.env.API_URL, {
      apiKey: process.env.API_KEY,
    });
  }
}

export default AppLoader;
