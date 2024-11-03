export class Category {
  id:string;
  name:string;
  description:boolean;

  constructor(obj:any){
    this.id = obj.id ?? null;
    this.name = obj.name ?? '';
    this.description = obj.description ?? '';

  }
}
