type THTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD';

type TEndpoint = 'sources' | 'everything';

type TLoaderOptions = {
  apiKey: string;
};

type TUrlOptions = {
  [key: string]: string | undefined;
};

class Loader {
  private readonly baseLink: string;
  private readonly options: TLoaderOptions;

  constructor(baseLink: string, options: TLoaderOptions) {
    this.baseLink = baseLink;
    this.options = options;
  }

  public getResp<T>(
    { endpoint, options = {} }: { endpoint: TEndpoint; options?: TUrlOptions },
    callback: (data: T) => void = () => {
      console.error('No callback for GET response');
    }
  ) {
    this.load('GET', endpoint, callback, options);
  }

  private errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  private makeUrl(options: TUrlOptions, endpoint: TEndpoint) {
    const urlOptions: TLoaderOptions & TUrlOptions = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      const value = urlOptions[key];

      if (value !== undefined) {
        url += `${key}=${value}&`;
      }
    });

    return url.slice(0, -1);
  }

  private load<T>(method: THTTPMethod, endpoint: TEndpoint, callback: (data: T) => void, options: TUrlOptions = {}) {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data) => callback(data))
      .catch((err) => console.error(err));
  }
}

export default Loader;
