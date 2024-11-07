export class Category {
  id:string;
  name:string;
  description:string;
  isChecked:boolean;

  constructor(obj:any){

    this.id = obj.id ?? null;
    this.name = obj.name ?? '';
    this.description = obj.description ?? '';
    this.isChecked = false;

  }
}
