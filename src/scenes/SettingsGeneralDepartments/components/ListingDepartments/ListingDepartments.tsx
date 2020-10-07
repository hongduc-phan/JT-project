import React, {
  FunctionComponent,
  useEffect,
  Fragment,
  KeyboardEvent,
  useState,
  useContext,
} from 'react';
import {useTranslation} from 'react-i18next';
import {defaultRules, InputStates} from 'react-hoc-form-validatable';

import {AppContext} from '../../../../contexts/AppContext';

import {getCommonLocaleKey} from '../../../../locales/common.locale';
import {getLocaleKey} from '../../SettingsGeneralDepartments.locale';

import {Department} from '../../../../features/departments/models';
import {SetDepartmentDefaultData} from '../../../../features/departments/actions';
import {FetchCreateDepartmentBody} from '../../../../features/departments/apis';

import Card from '../../../../components/Card';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from '../../../../components/Table';
import Button, {ButtonVariants} from '../../../../components/Button';
import {Edit, Delete, Search, Add} from '../../../../components/Icons';
import TextField, {TextFieldAlignment} from '../../../../components/TextField';
import EmptyScene from '../../../../components/EmptyScene';
import SceneHeading from '../../../../components/SceneHeading';
import Loading from '../../../../components/Loading';
import {SnackbarVariant} from '../../../../components/Snackbar';

import CreateModal from '../CreateModal/';
import EditModal from '../EditModal/';
import DeleteModal from '../DeleteModal';

import styles from '../../SettingsGeneralDepartments.module.css';

export interface ListingDepartmentsProps {
  lastUpdated: number;
  searchQuery: string;
  isFetching: boolean;
  data: Department[];
  total: number;
  page: number;
  limit: number;
  onSetDefault: (data: SetDepartmentDefaultData) => void;
  onGetDepartments: (p: number, limit: number, name: string) => void;
  onCreateDepartment: (
    data: FetchCreateDepartmentBody,
    done?: ((success: boolean) => void) | undefined,
  ) => void;
  onEditDepartment: (
    id: number,
    data: Partial<FetchCreateDepartmentBody>,
    done?: ((success: boolean) => void) | undefined,
  ) => void;
  onDeleteDepartment: (id: number, done?: (success?: boolean) => void) => void;
}

const ListingDepartments: FunctionComponent<ListingDepartmentsProps> = ({
  data,
  total,
  page,
  limit,
  isFetching,
  lastUpdated,
  searchQuery,
  onSetDefault,
  onGetDepartments,
  onCreateDepartment,
  onEditDepartment,
  onDeleteDepartment,
}: ListingDepartmentsProps) => {
  const {t} = useTranslation();
  const appContext = useContext(AppContext);
  const [department, setDepartment] = useState<Department>();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    onGetDepartments(page, limit, searchQuery);
  }, [page, limit, searchQuery]);

  const handleChangePage = (value: number) => {
    onSetDefault({
      page: value,
    });
  };

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (13 === e.keyCode) {
      onSetDefault({
        page: 1,
        keyword: (e.target as HTMLInputElement).value,
      });
    }
  };

  const handleChangeRowsPerPage = (value: number) => {
    onSetDefault({
      page: 1,
      limit: value,
    });
  };

  const resetListing = () => {
    if (page === 1) {
      onGetDepartments(page, limit, searchQuery);
    } else {
      onSetDefault({
        page: 1,
      });
    }
  };

  const onOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const onCloseCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const onOpenEditModal = (d: Department) => {
    setIsOpenEditModal(true);
    setDepartment(d);
  };

  const onCloseEditModal = () => {
    setIsOpenDeleteModal(false);
    setDepartment(undefined);
  };

  const onOpenDeleteModal = (d: Department) => {
    setIsOpenDeleteModal(true);
    setDepartment(d);
  };

  const onCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setDepartment(undefined);
  };

  const onSubmitCreateModal = (
    inputs: {
      [k: string]: InputStates;
    },
    done: (reset?: boolean) => void,
  ) => {
    onCreateDepartment(
      {
        departmentName: inputs.departmentName.value,
      },
      (success) => {
        done(success);
        onCloseCreateModal();

        if (success) {
          resetListing();
          if (appContext) {
            appContext.snackAdd(
              t(getLocaleKey('createSuccessfully')),
              SnackbarVariant.Success,
            );
          }
        } else {
          if (appContext) {
            appContext.snackAdd(
              t(getLocaleKey('createFailed')),
              SnackbarVariant.Error,
            );
          }
        }
      },
    );
  };

  const onSubmitEditModal = (
    inputs: {
      [k: string]: InputStates;
    },
    done: (reset?: boolean) => void,
  ) => {
    onEditDepartment(
      Number(inputs.id.value),
      {
        departmentName: inputs.name.value,
      },
      (success) => {
        done(success);
        onCloseEditModal();

        if (success) {
          resetListing();
          if (appContext) {
            appContext.snackAdd(
              t(getLocaleKey('editSuccessfully')),
              SnackbarVariant.Success,
            );
          }
        } else {
          if (appContext) {
            appContext.snackAdd(
              t(getLocaleKey('editFailed')),
              SnackbarVariant.Error,
            );
          }
        }
      },
    );
  };

  const onSubmitDeleteModal = (id: number) => {
    onDeleteDepartment(id, (success) => {
      onCloseDeleteModal();

      if (success) {
        resetListing();
        if (appContext) {
          appContext.snackAdd(
            t(getLocaleKey('deleteSuccessfully')),
            SnackbarVariant.Success,
          );
        }
      } else {
        if (appContext) {
          appContext.snackAdd(
            t(getLocaleKey('deleteFailed')),
            SnackbarVariant.Error,
          );
        }
      }
    });
  };

  return (
    <div>
      <SceneHeading
        title={t(getLocaleKey('title'))}
        subTitle={t(getLocaleKey('subTitle'))}
        renderActions={
          <div className={styles.search}>
            <TextField
              defaultValue={searchQuery}
              icon={<Search />}
              alignIcon={TextFieldAlignment.left}
              placeholder={t(getCommonLocaleKey('search'))}
              onKeyDown={handleSearch}
            />
            <Button
              variant={ButtonVariants.Primary}
              className={styles.searchButton}
              onClick={onOpenCreateModal}
            >
              <Add className={styles.searchIcon} />
              {t(getCommonLocaleKey('create'))}
            </Button>
          </div>
        }
      />

      {isFetching && <Loading />}

      {!isFetching && lastUpdated !== 0 && data.length === 0 && (
        <EmptyScene text={t(getLocaleKey('empty'))}>
          <Button>{t(getLocaleKey('createDepartment'))}</Button>
        </EmptyScene>
      )}

      {!isFetching && lastUpdated !== 0 && data.length > 0 && (
        <Fragment>
          <Card className={styles.wrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t(getLocaleKey('title'))}</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((d: Department) => (
                  <TableRow key={d.departmentId}>
                    <TableCell>{d.departmentName}</TableCell>
                    <TableCell>
                      <div className={styles.buttons}>
                        <Button
                          variant={ButtonVariants.Icon}
                          onClick={onOpenEditModal.bind(null, d)}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant={ButtonVariants.Icon}
                          onClick={onOpenDeleteModal.bind(null, d)}
                        >
                          <Delete />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
          <TablePagination
            onChangeRowsPerPage={handleChangeRowsPerPage}
            onChangePage={handleChangePage}
            labelRowsPerPage={t(getCommonLocaleKey('itemsPerPage'))}
            rowsPerPageOptions={[5, 10, 25]}
            page={page}
            count={total}
            rowsPerPage={limit}
          />
        </Fragment>
      )}

      {isOpenCreateModal && (
        <CreateModal
          open={isOpenCreateModal}
          onRequestClose={onCloseCreateModal}
          rules={defaultRules}
          submitCallback={onSubmitCreateModal}
        />
      )}

      {isOpenEditModal && department && (
        <EditModal
          data={department}
          open={isOpenEditModal}
          onRequestClose={onCloseEditModal}
          rules={defaultRules}
          submitCallback={onSubmitEditModal}
        />
      )}

      {isOpenDeleteModal && department && (
        <DeleteModal
          data={department}
          open={isOpenDeleteModal}
          onRequestClose={onCloseDeleteModal}
          onSubmit={onSubmitDeleteModal}
        />
      )}
    </div>
  );
};

export default ListingDepartments;
