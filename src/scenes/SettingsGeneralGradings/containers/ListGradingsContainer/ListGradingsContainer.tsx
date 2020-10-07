import React, {FunctionComponent} from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../../../store';
import {Grading} from '../../../../features/gradings/models';
import {
  listGradings,
  gradingSetDefault,
  createGrading,
  editGrading,
  deleteGrading,
  SetGradingDefaultData,
} from '../../../../features/gradings/actions';
import {FetchCreateGradingBody} from '../../../../features/gradings/apis';

import ListingGradings from '../../components/ListingGradings';

export interface ListGradingsContainerProps {
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

const ListGradingsContainer: FunctionComponent<ListGradingsContainerProps> = ({
  isFetching,
  data,
  total,
  page,
  limit,
  searchQuery,
  lastUpdated,
  onSetDefault,
  onGetGradings,
  onCreateGrading,
  onEditGrading,
  onDeleteGrading,
}: ListGradingsContainerProps) => {
  return (
    <ListingGradings
      lastUpdated={lastUpdated}
      searchQuery={searchQuery}
      isFetching={isFetching}
      data={data}
      total={total}
      page={page}
      limit={limit}
      onSetDefault={onSetDefault}
      onGetGradings={onGetGradings}
      onCreateGrading={onCreateGrading}
      onEditGrading={onEditGrading}
      onDeleteGrading={onDeleteGrading}
    />
  );
};

const mapStateToProps = ({gradings}: RootState) => {
  const data: Grading[] | [] = gradings.default.data.reduce(
    (re, cur) => {
      if (gradings.entities[cur] && gradings.entities[cur].data) {
        // @ts-ignore
        re.push(gradings.entities[cur].data);
      }
      return re;
    },
    [] as Grading[],
  );

  return {
    searchQuery: gradings.default.keyword,
    data,
    total: gradings.default.total,
    page: gradings.default.page,
    limit: gradings.default.limit,
    isFetching: gradings.default.isFetching,
    lastUpdated: gradings.default.lastUpdated,
  };
};

const mapDispatchToProps = {
  onSetDefault: gradingSetDefault,
  onGetGradings: listGradings,
  onCreateGrading: createGrading,
  onEditGrading: editGrading,
  onDeleteGrading: deleteGrading,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListGradingsContainer);
