import {testSaga} from 'redux-saga-test-plan';
import update from 'immutability-helper';
import {spy} from 'sinon';
import {
  getDefaultCompanySelector,
  handleEditCompany,
  handlerDeleteBank,
} from './sagas';
import {companiesActions, companiesApis} from './index';
import {Company} from './models';
import {fetchEditCompany} from './apis';
import {snackAdd} from '../notifications/actions';
import i18n from '../../i18n';
import {getErrorsLocaleKey} from '../../locales/errors.locale';
import {SnackbarVariant} from '../../components/Snackbar';

describe('Companies sagas', () => {
  describe('Handle edit company', () => {
    it('Should work with api success', () => {
      const done = spy();
      const apiData = {
        data: {
          data: {
            companyName: 'new',
          },
        },
      };
      testSaga(
        handleEditCompany,
        companiesActions.editCompany(
          '1',
          {
            companyName: 'new',
          },
          done,
        ),
      )
        .next()
        .call(fetchEditCompany, '1', {
          companyName: 'new',
        })
        .next(apiData)
        .put(
          companiesActions.companySetDefault({
            data: apiData.data.data as any,
          }),
        )
        .next()
        .finish()
        .isDone();

      expect(done.calledWith(true)).toBeTruthy();
    });

    it('Should work with api return error', () => {
      const apiErr = Object.create(Error);

      apiErr.response = {
        status: 500,
      };

      apiErr.request = 1;

      const done = spy();

      testSaga(
        handleEditCompany,
        companiesActions.editCompany(
          '1',
          {
            companyName: 'new',
          },
          done,
        ),
      )
        .next()
        .call(fetchEditCompany, '1', {
          companyName: 'new',
        })
        .throw(apiErr)
        .put(
          snackAdd(
            i18n.t(getErrorsLocaleKey('apiError')),
            SnackbarVariant.Error,
          ),
        )
        .next()
        .finish()
        .isDone();

      expect(done.calledWith(false)).toBeTruthy();
    });
  });

  describe('Handler delete bank account', () => {
    it('Should work with api success', () => {
      const done = spy();
      const company: Company = {
        companyId: '1',
        companyName: 'juztalent',
        businessRegNo: 'juztalent',
        companyLogoPath: null,
        countryId: 1,
        address1: 'address1',
        address2: 'address2',
        postalCode: null,
        weekStart: null,
        halfDayHour: null,
        deletedAt: 0,
        updatedAt: null,
        createdAt: '2019-03-12T02:16:15.000Z',
        companyUsername: 'juztalent',
        groupId: null,
        country: {
          countryId: 1,
          countryName: 'Singapore',
          countryCode: 'SG',
        },
        bankDetails: [
          {
            bankAccountId: 1,
            bankId: 6,
            companyId: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
            accountName: 'PTY Corporation IncheDong',
            branchCode: 'WSXW',
            accountNumber: '123456789',
            deletedAt: 0,
            updatedAt: null,
            createdAt: '2019-03-20T02:36:24.000Z',
          },
        ],
        restDays: [],
      };

      testSaga(handlerDeleteBank, {
        payload: {
          companyId: '1',
          bankAccountId: 1,
        },
        meta: {
          done: done as any,
        },
      } as ReturnType<typeof companiesActions.companyDeleteBank>)
        .next()
        .select(getDefaultCompanySelector)
        .next(company)
        .call(companiesApis.fetchCompanyDeleteBank, '1', 1)
        .next()
        .put(
          companiesActions.companySetDefault({
            data: update(company, {
              bankDetails: {
                $splice: [[0, 1]],
              },
            }),
          }),
        )
        .next()
        .finish()
        .isDone();

      expect(done.calledWith(true)).toBeTruthy();
    });

    it('Should return error when not found bank', () => {
      const done = spy();

      testSaga(
        handlerDeleteBank,
        companiesActions.companyDeleteBank('1', 1, done),
      )
        .next()
        .select(getDefaultCompanySelector)
        .next({
          bankDetails: [],
        })
        .finish()
        .isDone();
      expect(done.calledWith(false)).toBeTruthy();
    });
  });
});
