import './sources.css';

type TSource = {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
};

class Sources {
  public draw(data: TSource[]) {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

    if (sourceItemTemp === null) {
      throw new Error('Source item template not found');
    }

    data.forEach((item) => {
      const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

      const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
      const sourceItemName = sourceItem.querySelector('.source__item-name') as HTMLElement;

      sourceItem.setAttribute('data-source-id', item.id);
      sourceItemName.textContent = item.name;

      fragment.append(sourceClone);
    });

    const sourcesContainer = document.querySelector('.sources');

    if (sourcesContainer === null) {
      throw new Error('Sources container not found');
    }

    sourcesContainer.append(fragment);
  }
}

export default Sources;

export type { TSource };
