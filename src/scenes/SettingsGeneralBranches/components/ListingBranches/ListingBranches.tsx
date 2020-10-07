import React, {
  Fragment,
  FunctionComponent,
  KeyboardEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useTranslation} from 'react-i18next';

import config from '../../../../config';

import {getCommonLocaleKey} from '../../../../locales/common.locale';
import {getLocaleKey} from '../../SettingsGeneralBranches.locale';

import {Branch} from '../../../../features/branches/models';

import Card from '../../../../components/Card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '../../../../components/Table';
import Button, {ButtonVariants} from '../../../../components/Button';
import {Add, Delete, Edit, Search} from '../../../../components/Icons';
import TextField, {TextFieldAlignment} from '../../../../components/TextField';
import EmptyScene from '../../../../components/EmptyScene';
import SceneHeading from '../../../../components/SceneHeading';
import Loading from '../../../../components/Loading';

import useRedirectRoute from '../../../../hooks/useRedirectRoute';

import styles from './ListingBranches.module.css';
import Modal from '../../../../components/Modal';
import Typo from '../../../../components/Typo';
import {AppContext} from '../../../../contexts/AppContext';
import {SnackbarVariant} from '../../../../components/Snackbar';
import {SetBranchDefaultData} from '../../../../features/branches/actions';

export interface ListingBranchesProps {
  lastUpdated: number;
  searchQuery: string;
  isFetching: boolean;
  data: Branch[];
  total: number;
  page: number;
  limit: number;
  onSetDefault: (data: SetBranchDefaultData) => void;
  onGetBranches: (p: number, limit: number, name: string) => void;
  onDeleteBranch: (id: number, done?: (success: boolean) => void) => void;
}

const ListingBranches: FunctionComponent<ListingBranchesProps> = ({
  data,
  total,
  page,
  limit,
  onSetDefault,
  onGetBranches,
  isFetching,
  lastUpdated,
  searchQuery,
  onDeleteBranch,
}: ListingBranchesProps) => {
  const {t} = useTranslation();
  const [ShouldRedirect, , setRedirectHandler] = useRedirectRoute();
  const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [selectedBranch, setSelectedBranch] = useState<number>();

  const appContext = useContext(AppContext);

  useEffect(() => {
    onGetBranches(page, limit, searchQuery);
  }, [page, limit, searchQuery]);

  function handleChangePage(value: number) {
    onSetDefault({
      page: value,
    });
  }

  function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
    if (13 === e.keyCode) {
      onSetDefault({
        page: 1,
        keyword: (e.target as HTMLInputElement).value,
      });
    }
  }

  function handleChangeRowsPerPage(value: number) {
    onSetDefault({
      page: 1,
      limit: value,
    });
  }

  function handleDelete(id: number) {
    return () => {
      setSelectedBranch(id);
      setIsOpenDelete(true);
    };
  }

  function handleCloseConfirm() {
    setIsOpenDelete(false);
  }

  function handleConfirmDelete() {
    if (selectedBranch && appContext) {
      setIsDeleting(true);
      onDeleteBranch(selectedBranch, (success) => {
        setIsDeleting(false);
        if (success) {
          onGetBranches(page, limit, searchQuery);
          setIsOpenDelete(false);
          appContext.snackAdd(
            t(getLocaleKey('deleteBranchSuccess')),
            SnackbarVariant.Success,
          );
        } else {
          appContext.snackAdd(
            t(getLocaleKey('deleteBranchFailed')),
            SnackbarVariant.Error,
          );
        }
      });
    }
  }

  const selectedBranchFind = data.find((b) => b.branchId === selectedBranch);

  return (
    <div>
      {ShouldRedirect}
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
              onClick={setRedirectHandler(
                config.paths.settingsGeneralBranchesCreate,
              )}
              variant={ButtonVariants.Primary}
              className={styles.searchButton}
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
          <Button>{t(getLocaleKey('createABranch'))}</Button>
        </EmptyScene>
      )}
      {!isFetching && lastUpdated !== 0 && data.length > 0 && (
        <Fragment>
          <Card className={styles.wrapper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{t(getLocaleKey('formBranchName'))}</TableCell>
                  <TableCell>{t(getLocaleKey('address'))}</TableCell>
                  <TableCell>&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((b) => (
                  <TableRow key={b.branchId}>
                    <TableCell>{b.branchName}</TableCell>
                    <TableCell>
                      {b.address1}
                      {b.address2 || b.postalCode ? ',' : ''} {b.address2}{' '}
                      {b.postalCode}
                    </TableCell>
                    <TableCell>
                      <div className={styles.buttons}>
                        <Button
                          variant={ButtonVariants.Icon}
                          onClick={setRedirectHandler(
                            config.paths.settingsGeneralBranchesEdit(
                              b.branchId.toString(),
                            ),
                          )}
                        >
                          <Edit />
                        </Button>
                        <Button
                          variant={ButtonVariants.Icon}
                          onClick={handleDelete(b.branchId)}
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

      {isOpenDelete && selectedBranchFind && (
        <Modal
          open={isOpenDelete}
          renderTitle={t(getLocaleKey('confirmDeleteBranchTitle'))}
          renderActions={
            <Fragment>
              <Button
                variant={ButtonVariants.Secondary}
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                {t(getCommonLocaleKey('yes'))}
              </Button>
              <Button
                disabled={isDeleting}
                onClick={handleCloseConfirm}
                variant={ButtonVariants.Primary}
                className={styles.modalButton}
              >
                {t(getCommonLocaleKey('no'))}
              </Button>
            </Fragment>
          }
        >
          <Fragment>
            <Typo tag="p">
              <b>{t(getLocaleKey('formBranchName'))}: </b>
              {selectedBranchFind.branchName}
            </Typo>
          </Fragment>
        </Modal>
      )}
    </div>
  );
};

export default ListingBranches;
