import AppLoader from './appLoader';
import type { TNews } from '../view/news/news';
import type { TSource } from '../view/sources/sources';

type TSourcesResponseData = {
  status: string;
  sources: TSource[];
};

type TNewsResponseData = {
  status: string;
  totalResults: number;
  articles: TNews[];
};

class AppController extends AppLoader {
  public getSources(callback: (data: TSourcesResponseData) => void) {
    super.getResp<TSourcesResponseData>(
      {
        endpoint: 'sources',
      },
      callback
    );
  }

  public getNews(event: Event, callback: (data: TNewsResponseData) => void) {
    let target = event.target as HTMLElement;
    const newsContainer = event.currentTarget as HTMLElement;

    if (target === null || newsContainer === null) {
      throw new Error('Target or currentTarget is null');
    }

    while (target !== newsContainer) {
      if (target.classList.contains('source__item')) {
        const sourceId = target.getAttribute('data-source-id');

        if (sourceId === null) {
          throw new Error('Source id is null');
        }

        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp<TNewsResponseData>(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback
          );
        }
        return;
      }

      const parentNode = target.parentNode;

      if (parentNode === null) {
        throw new Error('Parent node is null');
      }

      target = target.parentNode as HTMLElement;
    }
  }
}

export default AppController;

export type { TNewsResponseData, TSourcesResponseData };
