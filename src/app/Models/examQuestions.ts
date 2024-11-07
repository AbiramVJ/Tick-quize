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


export class QuestionList {
  id: string;
  name: string;
  type: number;
  answerOptions: Options[];

  constructor(obj: any) {
    this.id = obj.id ?? null;
    this.name = obj.name ?? '';
    this.type = obj.type ?? 1;
    this.answerOptions = obj.answerOptions.map((option: any) => new Options(option)) ?? [];
  }
}

export class OptionsList {
  id: string;
  name: string;
  isCorrect: boolean;


  constructor(obj: any) {
    this.id = obj.id ?? null;
    this.name = obj.name ?? '';
    this.isCorrect = obj.isCorrect ?? false;

  }
}
