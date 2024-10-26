export class Question{
  id:string;
  question:string;
  category:string;
  answerOptions:Options[];

  constructor(obj:any){
    this.id = obj.id ?? null;
    this.question = obj.question ?? '';
    this.category = obj.category ?? '';
    this.answerOptions = obj.answerOptions.map((options:any) => new Options(options)) ?? [];
  }

}

export class Options {
  id:string;
  answer:string;
  isChecked:boolean;

  constructor(obj:any){
    this.id = obj.id ?? null;
    this.answer = obj.answer ?? '';
    this.isChecked = false;

  }
}
