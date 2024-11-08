

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
  name: string;
  password: string;
  eMail: string;
  phoneNo: string;
  joinedDate: string;
  imagUrl: string;
  gender: number;
  civilStatus: number;
  address:string;
  fullAddress:string;

  constructor(obj: any) {
   // console.log(obj);
    this.batchId = obj.batchId ?? '';
    this.admissionNo = obj.admissionNo ?? '';
    this.name = obj.name ?? '';
    this.password = obj.password ?? '';
    this.eMail = obj.eMail ?? '';
    this.phoneNo = obj.phoneNo ?? '';
    this.joinedDate = obj.joinedDate ?? '';
    this.imagUrl = obj.imagUrl ?? 'none';
    this.gender = obj.gender ?? 0;
    this.civilStatus = obj.civilStatus ?? 0;
    this.address = obj.address ?? '';
    this.fullAddress = obj.address !== null ? obj.address.line1 + obj.address.line2 + obj.address.city : 'No Address';
  }
}
