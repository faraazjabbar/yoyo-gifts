// import { TestBed } from '@angular/core/testing';
// import { TranslationService } from 'src/app/core/services/translation.service';
// import { TranslatePipe } from './translate.pipe';
// describe('TranslatePipe', () => {
//   let pipe: TranslatePipe;
//   beforeEach(() => {
//     const translationServiceStub = {
//       getGlobalTranslationValue: value1 => ({})
//     };
//     TestBed.configureTestingModule({
//       providers: [
//         TranslatePipe,
//         { provide: TranslationService, useValue: translationServiceStub }
//       ]
//     });
//     pipe = TestBed.get(TranslatePipe);
//   });
//   it('can load instance', () => {
//     expect(pipe).toBeTruthy();
//   });
//   it('transforms X to Y', () => {
//     const value: any = 'X';
//     const args: string[] = [];
//     expect(pipe.transform(value, args)).toEqual('Y');
//   });
// });
