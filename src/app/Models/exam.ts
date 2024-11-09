export class Exam {
  id:string;
  name:string;
  isActive:boolean;
  questionType:number;
  date:string;
  duration:number;
  imageUrl:string;


  constructor(obj:any){
    console.log(obj);
    this.id = obj.id ?? null;
    this.name = obj.name ?? '';
    this.isActive = obj.isActive ?? '';
    this.questionType = obj.questionType ?? 0;
    this.date = obj.date ? formatDate(obj.date) : '';
    this.duration = obj.duration ?? 0;
    this.imageUrl = obj.imageUrl ?? '';


  }
}

export class AssignCategory {
  //id: string;
  id: string;
  name: string;
  questionCount: number;
  questions:Questions[];
  selectedCount:number;

  constructor(obj: any) {
  //  this.id = obj.id ?? '';
    this.id = obj.categoryId ?? '';
    this.name = obj.categoryName ?? '';
    this.questionCount = obj.questionCount ?? 0;
    this.questions = obj.questions.length > 0 ? obj.questions.map((q:any) => new Questions(q) ) : [];
    this.selectedCount = 0;
  }
}


export class Questions {
  id: string;
  name: string;
  isAlreadyAdded:boolean;

  constructor(obj:any){
    this.id = obj.id ?? '';
    this.name = obj.name ?? '';
    this.isAlreadyAdded = obj.isAlreadyAdded ?? false;
  }
}





export function formatDate(dateString: string): string {
  // const [month, day, year] = dateString.split('-');
  // return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  const a = dateString.split('T');
  return a[0];
}
