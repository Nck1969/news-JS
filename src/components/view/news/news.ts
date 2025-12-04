import './news.css';

type TNews = {
  source: {
    id: string;
    name: string;
  };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
};

class News {
  public draw(data: TNews[]) {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

    news.forEach((item, idx) => {
      const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

      const newsItem = newsClone.querySelector('.news__item') as HTMLElement;

      const newsItemPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
      const newsItemAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
      const newsItemDate = newsClone.querySelector('.news__meta-date') as HTMLElement;

      const newsItemDescription = newsClone.querySelector('.news__description-title') as HTMLElement;
      const newsItemDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
      const newsItemDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;

      const readMoreLink = newsClone.querySelector('.news__read-more a') as HTMLElement;

      if (idx % 2) newsItem.classList.add('alt');

      newsItemPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
      newsItemAuthor.textContent = item.author || item.source.name;
      newsItemDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

      newsItemDescription.textContent = item.title;
      newsItemDescriptionSource.textContent = item.source.name;
      newsItemDescriptionContent.textContent = item.description;

      readMoreLink.setAttribute('href', item.url);

      fragment.append(newsClone);
    });

    const newsContainer = document.querySelector('.news');

    if (newsContainer === null) {
      throw new Error('News container not found');
    }

    newsContainer.innerHTML = '';
    newsContainer.appendChild(fragment);
  }
}

export default News;

export type { TNews };
