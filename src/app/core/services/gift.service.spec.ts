import { HttpClientModule, HttpClient, HttpRequest, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { GiftService } from './gift.service';
import { HelperService } from './helper.service';

const ENTITIES = 'gifts';
const API_URL = environment.apiUrl + ENTITIES;
const MOCK_URL = `${environment.mocksUrl}${ENTITIES}.json`;
const USE_MOCK = environment.useMocks;

describe('GiftService', () => {

    beforeEach(() => {
        // 0. set up the test environment
        TestBed.configureTestingModule({
            imports: [
                // no more boilerplate code w/ custom providers needed :-)
                HttpClientModule,
                HttpClientTestingModule
            ],
            providers: [
                GiftService,
                HelperService
            ]
        });
    });

    afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
        backend.verify();
    }));

    it(`getList should emit 'true' for 200 Ok`,
        async(inject([GiftService, HelperService, HttpTestingController],
            (service: GiftService, helper: HelperService,
                backend: HttpTestingController) => {
                const mockResponse = {
                    'total': 3,
                    'data': [
                        {
                            // giftId: string;
                            // giftName: string;
                            // brandId?: string;
                            // brandName: string;
                            // categoryId?: string;
                            // categoryName: string;
                            // imageLink: string;
                            // cost: number;
                            // discount?: number;
                            // count: number;
                            // description?: string;
                            // rating?: number;
                            // reviews?: Review[];

                            'giftId': 49,
                            'code': '1',
                            'description': 'EVENT MARKETING',
                            'vaultId': 2,
                            'isOutSideCompanyGifting': false,
                            'outsideCompanyName': null,
                            'isActive': true,
                            'primaryOwnerName': null,
                            'secondaryOwnerName': null,
                            'vault': {
                                'vaultId': 2,
                                'code': 'EVM',
                                'description': 'EVENT MARKETING',
                                'distributionCenterCode': 'EVM',
                                'isActive': false,
                                'primaryOwnerName': null,
                                'secondaryOwnerName': null,
                                'distributionCenter': null,
                                'giftingDesks': []
                            }
                        },
                        {
                            'giftId': 53,
                            'code': '2',
                            'description': 'SITE',
                            'vaultId': 3,
                            'isOutSideCompanyGifting': false,
                            'outsideCompanyName': null,
                            'isActive': true,
                            'primaryOwnerName': null,
                            'secondaryOwnerName': null,
                            'vault': {
                                'vaultId': 3,
                                'code': 'FSC',
                                'description': 'FLAMINGO SALES CENTER',
                                'distributionCenterCode': 'LAS',
                                'isActive': false,
                                'primaryOwnerName': null,
                                'secondaryOwnerName': null,
                                'distributionCenter': null,
                                'giftingDesks': []
                            }
                        },
                        {
                            'giftId': 58,
                            'code': '2',
                            'description': 'SITE',
                            'vaultId': 4,
                            'isOutSideCompanyGifting': false,
                            'outsideCompanyName': null,
                            'isActive': false,
                            'primaryOwnerName': null,
                            'secondaryOwnerName': null,
                            'vault': {
                                'vaultId': 4,
                                'code': 'FUK',
                                'description': 'FUKUOKA',
                                'distributionCenterCode': 'JPN',
                                'isActive': true,
                                'primaryOwnerName': null,
                                'secondaryOwnerName': null,
                                'distributionCenter': null,
                                'giftingDesks': []
                            }
                        }
                    ]
                };
                const url = USE_MOCK ?
                    MOCK_URL :
                    helper.buildUrl(API_URL, 1);
                service.getList(1).subscribe((next) => {
                    expect(next).toBeTruthy();
                    expect(next.total).toBe(3);
                    expect(next.data.length).toBeGreaterThan(0);
                    expect(next.data[0].code).toEqual('1');
                    expect(next.data[0].description).toEqual('EVENT MARKETING');
                    expect(next.data[1].code).toEqual('2');
                    expect(next.data[1].description).toEqual('SITE');
                    expect(next.data[2].code).toEqual('2');
                    expect(next.data[2].description).toEqual('SITE');
                });
                backend.expectOne({
                    url: url,
                    method: 'GET'
                }).flush(mockResponse);
            })));

    it(`getByID should emit 'true' for 200 Ok`,
        async(inject([GiftService, HttpTestingController],
            (service: GiftService,
                backend: HttpTestingController) => {
                const mockResponse = {
                    'giftId': 1,
                    'code': '2',
                    'description': 'SITE',
                    'vaultId': 40,
                    'isOutSideCompanyGifting': false,
                    'outsideCompanyName': null,
                    'isActive': false,
                    'primaryOwnerName': '',
                    'secondaryOwnerName': '',
                    'vault': {
                      'vaultId': 40,
                      'code': 'WDW',
                      'description': 'WALT DISNEY WORLD',
                      'distributionCenterCode': 'ORL',
                      'isActive': false,
                      'primaryOwnerName': null,
                      'secondaryOwnerName': null,
                      'distributionCenter': null,
                      'giftingDesks': [
                        0
                      ]
                    }
                };
                const url = USE_MOCK ? MOCK_URL : `${API_URL}/${1}`;
                service.getById(1).subscribe((next) => {
                    expect(next).toBeTruthy();
                    expect(next.giftId).toEqual(1);
                });
                backend.expectOne({
                    url: url,
                    method: 'GET'
                }).flush(mockResponse);
            })));

    it(`saveGiftingDesk should emit 'true' for 200 Ok`, async(inject([GiftService, HttpTestingController],
        (service: GiftService, backend: HttpTestingController) => {
            const mockResponse = {
                'giftId': null,
                'code': '1',
                'description': 'EVENT MARKETING',
                'vaultId': 2,
                'isOutSideCompanyGifting': false,
                'outsideCompanyName': null,
                'isActive': true,
                'primaryOwnerName': null,
                'secondaryOwnerName': null,
                'vault': {
                    'vaultId': 2,
                    'code': 'EVM',
                    'description': 'EVENT MARKETING',
                    'distributionCenterCode': 'EVM',
                    'isActive': false,
                    'primaryOwnerName': null,
                    'secondaryOwnerName': null,
                    'distributionCenter': null,
                    'giftingDesks': []
                }
            };
            service.save(mockResponse).subscribe((next) => {
                expect(next).toBeTruthy();
            });
            backend.expectOne(API_URL).flush(mockResponse, { status: 200, statusText: 'Ok' });
        })));

    it(`updateGiftingDesk should emit 'true' for 200 Ok`, async(inject([GiftService, HttpTestingController],
        (service: GiftService, backend: HttpTestingController) => {
            const mockResponse = {
                'giftId': 49,
                'code': '1',
                'description': 'EVENT MARKETING',
                'vaultId': 2,
                'isOutSideCompanyGifting': false,
                'outsideCompanyName': null,
                'isActive': true,
                'primaryOwnerName': '',
                'secondaryOwnerName': '',
                'vault': {
                    'vaultId': 2,
                    'code': 'EVM',
                    'description': 'EVENT MARKETING',
                    'distributionCenterCode': 'EVM',
                    'isActive': false,
                    'primaryOwnerName': null,
                    'secondaryOwnerName': null,
                    'distributionCenter': null,
                    'giftingDesks': [
                        0
                    ]
                }
            };
            service.save(mockResponse).subscribe((next) => {
                expect(next).toBeTruthy();
            });
            backend.expectOne(`${API_URL}/${mockResponse.giftId}`).flush(mockResponse, { status: 200, statusText: 'Ok' });
        })));

    it(`delete should emit 'true' for 200 Ok`,
        async(inject([GiftService, HttpTestingController],
            (service: GiftService, backend: HttpTestingController) => {
                const id = 1;
                service.delete(1).subscribe((next) => {
                    expect(next).toBeNull();
                });
                backend.expectOne(`${API_URL}/${id}`)
                    .flush(null, { status: 200, statusText: 'Ok' });
            })));
});

