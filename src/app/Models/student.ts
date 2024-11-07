

export class Batch {
  id: string;
  name: string;
  isCurrent: boolean;

  constructor(obj: any) {
    this.id = obj.id ?? '' ;
    this.name = obj.name ?? '';
    this.isCurrent = obj.isCurrent ?? false;
  }
}

export class Student {
  batchId: string;
  admissionNo: string;
  firstName: string;
  lastName: string;
  password: string;
  eMail: string;
  phoneNo: string;
  joinedDate: string;
  imagUrl: string;
  gender: number;
  civilStatus: number;

  constructor(obj: any) {
    this.batchId = obj.batchId ?? '';
    this.admissionNo = obj.admissionNo ?? '';
    this.firstName = obj.firstName ?? '';
    this.lastName = obj.lastName ?? '';
    this.password = obj.password ?? '';
    this.eMail = obj.eMail ?? '';
    this.phoneNo = obj.phoneNo ?? '';
    this.joinedDate = obj.joinedDate ?? ''; // You could format the date here if needed
    this.imagUrl = obj.imagUrl ?? 'none';
    this.gender = obj.gender ?? 0;
    this.civilStatus = obj.civilStatus ?? 0;
  }
}
