import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface User {
  id: number;
  image: string;
  userName: string;
  name: string;
  surname: string;
  emailAddress: string;
  isActive: boolean;
  roleName: string;
  password: string;
  companyName: string;
  mobileNo: string;
  passwordResetDuration: Number;
  isPasswordResetAllowed: boolean;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  postalCode: string;
  city: string;
  country: string;
  state: string;
}

export interface Panel {
  id: number;
  name: string;
  // tests: Test[];
  sterotype: string;
}

export interface testAdd {
  id: number;
  testName: string;
  testType: string;
  OutputFormat: string;
}

export interface Test {
  id: number;
  name: string;
  type: string;
  outputFormat: string;
}

export class PanelTest {
  id: number;
  panelId: number;
  mTestId: number;
  highWarningAlarm: number;
  highAlarm: number;
  highControl: number;
  lowControl: number;
  lowAlarm: number;
  lowWarningAlarm: number;
  label: number;
}

@Injectable({
  providedIn: 'root'
})
export class MockService {
  idCounterPanelTest: number = 0;
  constructor() {}

  rowData: Array<any> = [
    { testName: 'Toyota', testType: 'Basic', OutputFormat: '0' },
    { testName: 'Ford', testType: 'Calculated', OutputFormat: '0.0' },
    { testName: 'Porsche', testType: 'Fixed', OutputFormat: '0.00' },
    { testName: 'Porsche', testType: 'Boxter', OutputFormat: '0.000%' }
  ];

  tests: Array<Test> = [
    { id: 1, name: 'TDS', type: 'Basic', outputFormat: '0' },
    { id: 2, name: 'Conductivity', type: 'Calculated', outputFormat: '0.0' },
    { id: 3, name: 'pH', type: 'Fixed', outputFormat: '0.00' },
    { id: 4, name: 'Hardness', type: 'Boxter', outputFormat: '0.000%' }
  ];

  panelsData: Array<Panel> = [
    { id: 1, name: 'Mock Panel One', sterotype: 'Boiler' },
    { id: 2, name: 'Mock Panel Two', sterotype: 'Tower' },
    { id: 3, name: 'Mock Panel Three', sterotype: 'Boiler' },
    { id: 4, name: 'Mock Panel Four', sterotype: 'Boiler' }
  ];

  panelIdCounter: number = 5;

  panelTests: Array<PanelTest> = [];
  users: Array<User> = [
    {
      id: 1,
      image: './assets/mtr-logo.png',
      userName: 'Jack123',
      name: 'Jack ',
      surname: 'Jack surname',
      emailAddress: 'jack@gmail.com',
      isActive: true,
      roleName: 'employee',
      password: 'jack123',
      companyName: 'Nasa',
      mobileNo: '1112223333',
      passwordResetDuration: 30,
      isPasswordResetAllowed: true,
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      postalCode: '4444',
      city: 'Lahore',
      country: 'Pakistan',
      state: 'Punjab'
    },
    {
      id: 2,
      image: './assets/mtr-logo.png',
      userName: 'rubeel123',
      name: 'rubeel ',
      surname: 'Mayo',
      emailAddress: 'rubeel@gmail.com',
      isActive: false,
      roleName: 'employee',
      password: 'rubeel123',
      companyName: 'Nasa',
      mobileNo: '1112223333',
      passwordResetDuration: 20,
      isPasswordResetAllowed: false,
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      postalCode: '4444',
      city: 'Lahore',
      country: 'Pakistan',
      state: 'Punjab'
    },
    {
      id: 3,
      image: './assets/mtr-logo.png',
      userName: 'imran123',
      name: 'imran ',
      surname: 'khan',
      emailAddress: 'khan@gmail.com',
      isActive: true,
      roleName: 'employee',
      password: 'khan123',
      companyName: 'Nasa',
      mobileNo: '1112223333',
      passwordResetDuration: 30,
      isPasswordResetAllowed: true,
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      postalCode: '4444',
      city: null,
      country: 'Pakistan',
      state: 'Punjab'
    },
    {
      id: 4,
      image: './assets/mtr-logo.png',
      userName: 'Maaz123',
      name: 'Maaz ',
      surname: 'Malik',
      emailAddress: 'maaz@gmail.com',
      isActive: false,
      roleName: 'operator',
      password: 'rubeel123',
      companyName: 'Nasa',
      mobileNo: '1112223333',
      passwordResetDuration: 20,
      isPasswordResetAllowed: false,
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      postalCode: '4444',
      city: 'Lahore',
      country: 'Pakistan',
      state: 'Punjab'
    },
    {
      id: 5,
      image: './assets/mtr-logo.png',
      userName: 'Atif',
      name: 'Atif ',
      surname: 'Malik',
      emailAddress: 'atif@gmail.com',
      isActive: true,
      roleName: 'client',
      password: 'khan123',
      companyName: 'Nasa',
      mobileNo: '1112223333',
      passwordResetDuration: 30,
      isPasswordResetAllowed: true,
      address1: '',
      address2: '',
      address3: '',
      address4: '',
      postalCode: '4444',
      city: null,
      country: 'Pakistan',
      state: 'Punjab'
    }
  ];

  fetchData(): Observable<any> {
    return of(this.rowData);
  }

  getUsers(): Observable<any> {
    return of(this.users);
  }

  createUser(user: User): Observable<User> {
    this.users.push(user);
    return of(user);
  }

  updateUser(user: User): Observable<any> {
    var tempUser = this.users.filter(x => x.id == user.id)[0];
    if (tempUser != null) {
      this.users[tempUser.id - 1] = user;
      console.log(this.users[tempUser.id]);
      return of(true);
    }
    return of(false);
  }
  getPanelsData(): Observable<any> {
    return of(this.panelsData);
  }

  addTest(test: any) {
    this.rowData.push(test);
  }

  getMockTests(): Observable<any> {
    return of(this.tests);
  }

  addPanel(panel: Panel): Observable<any> {
    panel.id = this.panelIdCounter;
    this.panelIdCounter = this.panelIdCounter + 1;
    this.panelsData.push(panel);
    return of(panel.id);
  }

  updatePanel(panel: Panel): Observable<any> {
    var tempPanel = this.panelsData.filter(x => x.id == panel.id)[0];
    if (tempPanel != null) {
      this.panelsData[tempPanel.id - 1] = panel;
      return of(true);
    }
    return of(false);
  }

  deletePanel(id: number): Observable<any> {
    var i = 0;

    for (var panel of this.panelsData) {
      if (id == panel.id) {
        this.panelsData.splice(i, 1);
      }
      i = i + 1;
    }
    return of(true);
  }

  createPanelTest(panelTest: PanelTest): Observable<any> {
    this.panelTests.push(panelTest);
    this.idCounterPanelTest = this.idCounterPanelTest + 1;
    return of(true);
  }

  updatePanelTest(panelTest: PanelTest): Observable<any> {
    var tempTest = this.panelTests.filter(x => x.id == panelTest.id)[0];
    if (tempTest != null) {
      this.panelTests[tempTest.id - 1] = panelTest;
      return of(true);
    }
    return of(false);
  }

  getPanelTests(panelId: number): Observable<PanelTest[]> {
    return of(this.panelTests);
  }
}
