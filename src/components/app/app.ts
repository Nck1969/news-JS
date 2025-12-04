import AppController, { type TNewsResponseData, type TSourcesResponseData } from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller: AppController;
  private view: AppView;

  constructor() {
    this.controller = new AppController();
    this.view = new AppView();
  }

  public start() {
    const sourcesContainer = document.querySelector('.sources');

    if (sourcesContainer === null) {
      throw new Error('Sources container not found');
    }

    sourcesContainer.addEventListener('click', (event) =>
      this.controller.getNews(event, (data: TNewsResponseData) => this.view.drawNews(data))
    );

    this.controller.getSources((data: TSourcesResponseData) => this.view.drawSources(data));
  }
}

export default App;
