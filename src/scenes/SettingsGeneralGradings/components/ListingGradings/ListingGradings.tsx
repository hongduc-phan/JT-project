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
import {getLocaleKey} from '../../SettingsGeneralGradings.locale';

import {Grading} from '../../../../features/gradings/models';

import {SetGradingDefaultData} from '../../../../features/gradings/actions';

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

import CreateModal from '../CreateModal';
import EditModal from '../EditModal';
import DeleteModal from '../DeleteModal';

import styles from '../../SettingsGeneralGradings.module.css';
import {FetchCreateGradingBody} from '../../../../features/gradings/apis';

export interface ListingGradingsProps {
  lastUpdated: number;
  searchQuery: string;
  isFetching: boolean;
  data: Grading[];
  total: number;
  page: number;
  limit: number;
  onSetDefault: (data: SetGradingDefaultData) => void;
  onGetGradings: (p: number, limit: number, name: string) => void;
  onCreateGrading: (
    data: FetchCreateGradingBody,
    done?: ((success: boolean) => void) | undefined,
  ) => void;
  onEditGrading: (
    id: number,
    data: Partial<FetchCreateGradingBody>,
    done?: ((success: boolean) => void) | undefined,
  ) => void;
  onDeleteGrading: (id: number, done?: (success?: boolean) => void) => void;
}

const ListingGradings: FunctionComponent<ListingGradingsProps> = ({
  data,
  total,
  page,
  limit,
  onSetDefault,
  onGetGradings,
  onCreateGrading,
  onEditGrading,
  onDeleteGrading,
  isFetching,
  lastUpdated,
  searchQuery,
}: ListingGradingsProps) => {
  const {t} = useTranslation();
  const appContext = useContext(AppContext);
  const [grading, setGrading] = useState<Grading>();
  const [isOpenCreateModal, setIsOpenCreateModal] = useState<boolean>(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    onGetGradings(page, limit, searchQuery);
  }, [page, limit, searchQuery]);

  const resetListing = () => {
    if (page === 1) {
      onGetGradings(page, limit, searchQuery);
    } else {
      onSetDefault({
        page: 1,
      });
    }
  };

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

  const onOpenCreateModal = () => {
    setIsOpenCreateModal(true);
  };

  const onCloseCreateModal = () => {
    setIsOpenCreateModal(false);
  };

  const onOpenEditModal = (g: Grading) => {
    setIsOpenEditModal(true);
    setGrading(g);
  };

  const onCloseEditModal = () => {
    setIsOpenDeleteModal(false);
    setGrading(undefined);
  };

  const onOpenDeleteModal = (g: Grading) => {
    setIsOpenDeleteModal(true);
    setGrading(g);
  };

  const onCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setGrading(undefined);
  };

  const onSubmitCreateModal = (
    inputs: {
      [k: string]: InputStates;
    },
    done: (reset?: boolean) => void,
  ) => {
    onCreateGrading(
      {
        gradingName: inputs.gradingName.value,
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
    onEditGrading(
      Number(inputs.id.value),
      {
        gradingName: inputs.name.value,
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
    onDeleteGrading(id, (success) => {
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
              onKeyDown={handleSearch}
              icon={<Search />}
              alignIcon={TextFieldAlignment.left}
              placeholder={t(getCommonLocaleKey('search'))}
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
          <Button>{t(getLocaleKey('createGrading'))}</Button>
        </EmptyScene>
      )}

      {!isFetching && lastUpdated !== 0 && data.length > 0 && (
        <Fragment>
          <Card className={styles.wrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t(getLocaleKey('name'))}</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((g: Grading) => (
                  <TableRow key={g.gradingId}>
                    <TableCell>{g.gradingName}</TableCell>
                    <TableCell>
                      <div className={styles.buttons}>
                        <Button
                          variant={ButtonVariants.Icon}
                          onClick={onOpenEditModal.bind(null, g)}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant={ButtonVariants.Icon}
                          onClick={onOpenDeleteModal.bind(null, g)}
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

      {isOpenEditModal && grading && (
        <EditModal
          data={grading}
          open={isOpenEditModal}
          onRequestClose={onCloseEditModal}
          rules={defaultRules}
          submitCallback={onSubmitEditModal}
        />
      )}

      {isOpenDeleteModal && grading && (
        <DeleteModal
          data={grading}
          open={isOpenDeleteModal}
          onRequestClose={onCloseDeleteModal}
          onSubmit={onSubmitDeleteModal}
        />
      )}
    </div>
  );
};

export default ListingGradings;
