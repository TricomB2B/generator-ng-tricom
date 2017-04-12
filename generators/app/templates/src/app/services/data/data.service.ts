export class DataService {
  static $inject: string[] = ['$http'];
  // data store
  private data: any;

  /**
   * Constructor
   * @param {angular.IHttpService} private $http Injected service reference
   */
  constructor (private $http: angular.IHttpService) { }

  /**
   * Get some string based content
   */
  getString (): string {
    return this.data.content;
  }

  /**
   * Fetch the data from the json file and store it in the property
   * @return {any} The $http generated promise
   */
  loadData (): any {
    return this
      .$http
      .get('data.json')
      .then((response: any) => {
        this.data = response.data;
      });
  }
}
