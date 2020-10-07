import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../../../store';
import {Branch} from '../../../../features/branches/models';
import {
  listBranches,
  branchSetDefault,
  deleteBranch,
  SetBranchDefaultData,
} from '../../../../features/branches/actions';
import ListingBranches from '../../components/ListingBranches';

export interface ListingBranchesContainerProps {
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

const ListingBranchesContainer: FunctionComponent<
  ListingBranchesContainerProps
> = ({
  isFetching,
  data,
  total,
  page,
  limit,
  onSetDefault,
  onGetBranches,
  searchQuery,
  lastUpdated,
  onDeleteBranch,
}: ListingBranchesContainerProps) => {
  return (
    <ListingBranches
      lastUpdated={lastUpdated}
      searchQuery={searchQuery}
      isFetching={isFetching}
      data={data}
      total={total}
      page={page}
      limit={limit}
      onSetDefault={onSetDefault}
      onGetBranches={onGetBranches}
      onDeleteBranch={onDeleteBranch}
    />
  );
};

const mapStateToProps = ({branches}: RootState) => {
  const data: Branch[] | [] = branches.default.data.reduce(
    (re, cur) => {
      if (branches.entities[cur] && branches.entities[cur].data) {
        // @ts-ignore
        re.push(branches.entities[cur].data);
      }
      return re;
    },
    [] as Branch[],
  );

  return {
    searchQuery: branches.default.keyword,
    data,
    total: branches.default.total,
    page: branches.default.page,
    limit: branches.default.limit,
    isFetching: branches.default.isFetching,
    lastUpdated: branches.default.lastUpdated,
  };
};

const mapDispatchToProps = {
  onSetDefault: branchSetDefault,
  onGetBranches: listBranches,
  onDeleteBranch: deleteBranch,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListingBranchesContainer);
