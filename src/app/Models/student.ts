

export class Batch {
  id: string;
  name: string;
  isCurrent: boolean;

  constructor(obj: any) {
    this.id = obj.id ?? '' ;
    this.name = obj.name ?? '';
    this.name = obj.name ?? '';
    this.isCurrent = obj.isCurrent ?? false;
  }
}

export class Student {
  id:string;
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
  address:Address | null;
  fullAddress:string;

  constructor(obj: any) {
   // console.log(obj);
    this.id = obj.id ?? '';
    this.batchId = obj.batchId ?? '';
    this.admissionNo = obj.admissionNo ?? '';
    this.firstName = obj.firstName ?? '';
    this.lastName = obj.lastname ?? '';
    this.password = obj.password ?? '';
    this.eMail = obj.eMail ?? '';
    this.phoneNo = obj.phoneNo ?? '';
    this.joinedDate =formatDate(obj.joinedDate) ?? '';
    this.imagUrl = obj.imagUrl ?? 'none';
    this.gender = obj.gender ?? 0;
    this.civilStatus = obj.civilStatus ?? 0;
    this.address = obj.address !== null ? new Address(obj.address) : null;
    this.fullAddress = obj.address !== null ? obj.address.line1 + obj.address.line2 + obj.address.city : 'No Address';
  }
}




export class Address {
  line1:string;
  line2:string;
  city:string;
  province:string;
  country:string;

  constructor(obj: any) {
     this.line1 = obj.line1 ?? '';
     this.line2 = obj.line2 ?? '';
     this.city = obj.city ?? '';
     this.province = obj.province ?? '';
     this.country = obj.country ?? '';
  }
}
export function formatDate(dateString: string): string {
  // const [month, day, year] = dateString.split('-');
  // return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  const a = dateString.split('T');
  return a[0];
}



