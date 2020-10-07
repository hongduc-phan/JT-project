import parseQueryString from './helpers/parseQueryString';

const config = {
  paths: {
    signIn: '/sign-in',
    moduleSelection: '/app',
    eTime: '/app/eTime',
    ePayroll: '/app/ePayroll',
    settings: '/app/settings',
    settingsGeneral: '/app/settings/general',
    settingsGeneralCompany: '/app/settings/general/company',
    settingsGeneralCompanyEdit: '/app/settings/general/company/edit',
    settingsGeneralDepartments: '/app/settings/general/departments',
    settingsGeneralBranches: '/app/settings/general/branches',
    settingsGeneralBranchesCreate: '/app/settings/general/branches/create',
    settingsGeneralBranchesEdit: (id = ':id') => {
      return `/app/settings/general/branches/edit/${id}`;
    },
    settingsGeneralGradings: '/app/settings/general/gradings',
    settingsUsers: '/app/settings/users',
    settingsETime: '/app/settings/etime',
    settingsETimeTimesheets: '/app/settings/etime/timesheets',
    settingsETimeShifts: '/app/settings/etime/shifts',
    settingsETimeReports: '/app/settings/etime/reports',
    settingsEPayroll: '/app/settings/epayroll',
    settingsEPayrollMyPayroll: '/app/settings/epayroll/my-payroll',
    settingsEPayrollManagePayroll: '/app/settings/epayroll/manage-payroll',
    settingsEPayrollReports: '/app/settings/epayroll/reports',
  },
  localStoreKeys: {
    user: 'user',
  },
  googleMapApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY || '',
  apiHost: process.env.REACT_APP_API_HOST || '',
  apiEndPoints: {
    usersSession: '/eCore/v1.0/users/sessions',
    getCountries: '/eCore/v1.0/countries',
    getBanks: (stateId?: number | string) => {
      const queryString = parseQueryString({
        stateId,
      });
      return `/eCore/v1.0/bank${queryString}`;
    },
    deleteCompanyBank: (companyId: string, bankId: number) => {
      return `/eCore/v1.0/companies/${companyId}/banks/${bankId}`;
    },
    createCompanyBank: (companyId: string) => {
      return `/eCore/v1.0/companies/${companyId}/banks/`;
    },
    getCountryStates: (countryId?: number | string) => {
      const queryString = parseQueryString({
        countryId,
      });
      return `/eCore/v1.0/states${queryString}`;
    },
    companyDetail: (id: string) => {
      return `/eCore/v1.0/companies/${id}`;
    },
    editCompany: (id: string) => {
      return `/eCore/v1.0/companies/${id}`;
    },
    getDepartments: (page: number, limit: number, name: string) => {
      let condition = {
        page,
        limit,
      };

      if (name) {
        condition = Object.assign(condition, {name});
      }

      const queryString = parseQueryString(condition);
      return `/eCore/v1.0/department${queryString}`;
    },
    createDepartment: '/eCore/v1.0/department',
    editDepartment: (departmentId: number) => {
      return `/eCore/v1.0/department/${departmentId}`;
    },
    deleteDepartment: (departmentId: number) => {
      return `/eCore/v1.0/department/${departmentId}`;
    },

    getGradings: (page: number, limit: number, name: string) => {
      let condition = {
        page,
        limit,
      };

      if (name) {
        condition = Object.assign(condition, {name});
      }

      const queryString = parseQueryString(condition);
      return `/eCore/v1.0/grading${queryString}`;
    },
    createGrading: '/eCore/v1.0/grading',
    editGrading: (gradingId: number) => {
      return `/eCore/v1.0/grading/${gradingId}`;
    },
    deleteGrading: (gradingId: number) => {
      return `/eCore/v1.0/grading/${gradingId}`;
    },

    // Branches
    getBranches: (page: number, limit: number, name: string) => {
      let condition = {
        page,
        limit,
      };

      if (name) {
        condition = Object.assign(condition, {name});
      }

      const queryString = parseQueryString(condition);
      return `/eCore/v1.0/branch${queryString}`;
    },
    createBranch: '/eCore/v1.0/branch',
    deleteBranch: (id: number) => {
      return `/eCore/v1.0/branch/${id}`;
    },
    editBranch: (id: number) => {
      return `/eCore/v1.0/branch/${id}`;
    },
    detailBranch: (id: number) => {
      return `/eCore/v1.0/branch/${id}`;
    },
    refreshToken: '/eCore/v1.0/users/sessions/refresh',
  },
  env: process.env.NODE_ENV || 'production',
};

export default config;
