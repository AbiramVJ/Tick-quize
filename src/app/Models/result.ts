export class QuestionResultModel {
  questionId: string;
  question: string;
  answerOption: string;
  isCorrect: boolean;

  constructor(obj: any) {
    this.questionId = obj.questionId ?? null;
    this.question = obj.question ?? '';
    this.answerOption = obj.answerOption ?? '';
    this.isCorrect = obj.isCorrect ?? false;
  }
}

export class ExamResultsResponseModel {
  studentId: string;
  firstName: string;
  lastName: string;
  examId: string;
  examName: string;
  questionResult: QuestionResultModel[];
  totalQuestions: number;
  correctAnswers: number;
  examDate: string;

  constructor(obj: any) {
    this.studentId = obj.studentId ?? null;
    this.firstName = obj.firstName ?? '';
    this.lastName = obj.lastName ?? '';
    this.examId = obj.examId ?? null;
    this.examName = obj.examName ?? '';
    this.questionResult = (obj.questionResult ?? []).map((q: any) => new QuestionResultModel(q));
    this.totalQuestions = obj.totalQuestions ?? 0;
    this.correctAnswers = obj.correctAnswers ?? 0;
    this.examDate = obj.examDate ? formatDate(obj.examDate) : '';
  }
}
export function formatDate(dateString: string): string {
  // const [month, day, year] = dateString.split('-');
  // return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  const a = dateString.split('T');
  return a[0];
}
