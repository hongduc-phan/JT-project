import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../../../store';
import {Department} from '../../../../features/departments/models';

import {
  listDepartments,
  departmentSetDefault,
  createDepartment,
  editDepartment,
  deleteDepartment,
  SetDepartmentDefaultData,
} from '../../../../features/departments/actions';
import ListingDepartments from '../../components/ListingDepartments';
import {FetchCreateDepartmentBody} from '../../../../features/departments/apis';

export interface ListingDepartmentsContainerProps {
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

const ListingDepartmentsContainer: FunctionComponent<
  ListingDepartmentsContainerProps
> = ({
  isFetching,
  data,
  total,
  page,
  limit,
  searchQuery,
  lastUpdated,
  onSetDefault,
  onGetDepartments,
  onCreateDepartment,
  onEditDepartment,
  onDeleteDepartment,
}: ListingDepartmentsContainerProps) => {
  return (
    <ListingDepartments
      lastUpdated={lastUpdated}
      searchQuery={searchQuery}
      isFetching={isFetching}
      data={data}
      total={total}
      page={page}
      limit={limit}
      onSetDefault={onSetDefault}
      onGetDepartments={onGetDepartments}
      onCreateDepartment={onCreateDepartment}
      onEditDepartment={onEditDepartment}
      onDeleteDepartment={onDeleteDepartment}
    />
  );
};

const mapStateToProps = ({departments}: RootState) => {
  const data: Department[] | [] = departments.default.data.reduce(
    (re, cur) => {
      if (departments.entities[cur] && departments.entities[cur].data) {
        // @ts-ignore
        re.push(departments.entities[cur].data);
      }
      return re;
    },
    [] as Department[],
  );

  return {
    searchQuery: departments.default.keyword,
    data,
    total: departments.default.total,
    page: departments.default.page,
    limit: departments.default.limit,
    isFetching: departments.default.isFetching,
    lastUpdated: departments.default.lastUpdated,
  };
};

const mapDispatchToProps = {
  onSetDefault: departmentSetDefault,
  onGetDepartments: listDepartments,
  onCreateDepartment: createDepartment,
  onEditDepartment: editDepartment,
  onDeleteDepartment: deleteDepartment,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingDepartmentsContainer);
