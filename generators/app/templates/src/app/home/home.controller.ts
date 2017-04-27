import { DataService } from '../core/data.service';

export class HomeController {
  static $inject: string[] = ['DataService'];
  content: string;

  /**
   * Constructor
   */
  constructor (private ds: DataService) { }

  /**
   * Init Hook
   */
  $onInit () {
    this.content = this.ds.getString();
  }
}
